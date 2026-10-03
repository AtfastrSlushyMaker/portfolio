"use client";

import { useEffect, useRef } from "react";

const VERTEX = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

// Crossfades two photographs of the same field taken at different times of day. Pixels brighter than their
// surroundings in the night sky (the real stars in the photo) twinkle.
const FRAGMENT = `
precision mediump float;
uniform sampler2D u_from;
uniform sampler2D u_to;
uniform vec2 u_res;
uniform vec2 u_offset;
uniform vec2 u_size;
uniform vec2 u_texel;
uniform float u_mix;
uniform float u_time;
uniform float u_horizon;
uniform float u_night;

float luma(vec3 c) { return dot(c, vec3(0.299, 0.587, 0.114)); }
float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

vec3 twinkle(sampler2D tex, vec2 uv, vec3 color, float sky) {
  vec2 o = u_texel * 3.0;
  float around = (luma(texture2D(tex, uv + vec2(o.x, 0.0)).rgb) + luma(texture2D(tex, uv - vec2(o.x, 0.0)).rgb)
                + luma(texture2D(tex, uv + vec2(0.0, o.y)).rgb) + luma(texture2D(tex, uv - vec2(0.0, o.y)).rgb)) * 0.25;
  float star = smoothstep(0.04, 0.16, luma(color) - around) * sky;
  float seed = hash(floor(uv / (u_texel * 6.0)));
  float pulse = 0.5 + 0.5 * sin(u_time * (0.8 + seed * 2.6) + seed * 6.2831);
  pulse *= pulse;
  return mix(color, color * (0.25 + pulse * 1.9) + vec3(0.12, 0.13, 0.16) * pulse, star);
}

void main() {
  vec2 p = vec2(gl_FragCoord.x, u_res.y - gl_FragCoord.y);
  vec2 uv = clamp((p - u_offset) / u_size, 0.001, 0.999);
  vec3 a = texture2D(u_from, uv).rgb;
  vec3 b = texture2D(u_to, uv).rgb;
  if (u_night > 0.5) {
    float sky = 1.0 - smoothstep(-0.03, 0.0, uv.y - u_horizon);
    if (sky > 0.0) { a = twinkle(u_from, uv, a, sky); b = twinkle(u_to, uv, b, sky); }
  }
  gl_FragColor = vec4(mix(a, b, u_mix), 1.0);
}
`;

/** Seconds for one full there-and-back cycle, and the share of it spent holding on each end. */
const CYCLE = 40;
const HOLD = 0.32;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

type Texture = { texture: WebGLTexture; width: number; height: number };

function loadTexture(gl: WebGLRenderingContext, src: string) {
  return new Promise<Texture>((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      const texture = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
      resolve({ texture, width: image.naturalWidth, height: image.naturalHeight });
    };
    image.onerror = reject;
    image.src = src;
  });
}

/** Ping-pong 0 → 1 → 0 with a hold at each end and an eased crossfade in between. */
function cycleMix(seconds: number) {
  const phase = (seconds % CYCLE) / CYCLE;
  const tri = phase < 0.5 ? phase * 2 : 2 - phase * 2;
  const t = Math.min(1, Math.max(0, (tri - HOLD / 2) / (1 - HOLD)));
  return t * t * (3 - 2 * t);
}

/**
 * Timelapse over the hero photograph: light mode drifts between morning and golden hour, dark mode between
 * dusk and night, so text contrast never changes. Mirrors the static image's object-fit: cover / 50% 40%,
 * which stays underneath as the fallback for reduced motion or missing WebGL.
 */
export function HeroSky({ light, dark, horizon }: { light: [string, string]; dark: [string, string]; horizon: number }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [lightFrom, lightTo] = light;
  const [darkFrom, darkTo] = dark;

  useEffect(() => {
    const host = hostRef.current;
    if (!host || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // A fresh canvas per mount: a context lost in a previous cleanup can't be revived on the same element.
    const canvas = document.createElement("canvas");
    canvas.className = "hero-sky";
    host.appendChild(canvas);
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) { canvas.remove(); return; }

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { canvas.remove(); return; }
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(program, name);
    const uRes = u("u_res"), uOffset = u("u_offset"), uSize = u("u_size"), uTexel = u("u_texel");
    const uMix = u("u_mix"), uTime = u("u_time"), uNight = u("u_night");
    gl.uniform1f(u("u_horizon"), horizon);
    gl.uniform1i(u("u_from"), 0);
    gl.uniform1i(u("u_to"), 1);

    let pairs: { light?: [Texture, Texture]; dark?: [Texture, Texture] } = {};
    let frame = 0, visible = true, disposed = false;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const draw = (now: number) => {
      frame = 0;
      const night = document.documentElement.classList.contains("dark");
      const pair = night ? pairs.dark : pairs.light;
      if (disposed || !pair) return;
      const [from, to] = pair;
      const w = canvas.width, h = canvas.height;
      const scale = Math.max(w / from.width, h / from.height);
      const dw = from.width * scale, dh = from.height * scale;
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, from.texture);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, to.texture);
      gl.uniform2f(uRes, w, h);
      gl.uniform2f(uOffset, (w - dw) * 0.5, (h - dh) * 0.4);
      gl.uniform2f(uSize, dw, dh);
      gl.uniform2f(uTexel, 1 / from.width, 1 / from.height);
      const seconds = (now - start) / 1000;
      gl.uniform1f(uMix, cycleMix(seconds));
      gl.uniform1f(uTime, seconds);
      gl.uniform1f(uNight, night ? 1 : 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      canvas.dataset.ready = "true";
      if (visible && !document.hidden) frame = requestAnimationFrame(draw);
    };
    const play = () => { if (!frame && !disposed && visible && !document.hidden) frame = requestAnimationFrame(draw); };

    Promise.all([lightFrom, lightTo, darkFrom, darkTo].map(src => loadTexture(gl, src)))
      .then(([a, b, c, d]) => { if (disposed) return; pairs = { light: [a, b], dark: [c, d] }; resize(); play(); })
      .catch(() => { /* Static image remains. */ });

    const resizeObserver = new ResizeObserver(() => { resize(); play(); });
    resizeObserver.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; play(); });
    intersection.observe(canvas);
    const themeObserver = new MutationObserver(play);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    document.addEventListener("visibilitychange", play);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect(); intersection.disconnect(); themeObserver.disconnect();
      document.removeEventListener("visibilitychange", play);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    };
  }, [lightFrom, lightTo, darkFrom, darkTo, horizon]);

  return <div ref={hostRef} className="hero-sky-host" aria-hidden="true" />;
}
