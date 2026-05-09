"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const posRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const { x: mx, y: my } = mouseRef.current;
      const p = posRef.current;
      p.x += (mx - p.x) * 0.12;
      p.y += (my - p.y) * 0.12;

      const el = glowRef.current;
      if (el) {
        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div
        ref={glowRef}
        className="absolute top-0 left-0 will-change-transform rounded-full"
        style={{
          width: 640,
          height: 640,
          background: "radial-gradient(circle, rgba(232,93,58,0.09) 0%, rgba(232,93,58,0.03) 30%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}
