"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function SpotlightText({
  children,
  className,
  radius = 320,
}: {
  children: ReactNode;
  as?: string;
  className?: string;
  radius?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const smoothRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef(0);
  const layerClass = className ?? "";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mouse = { x: -999, y: -999 };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const animate = () => {
      const s = smoothRef.current;
      s.x += (mouse.x - s.x) * 0.12;
      s.y += (mouse.y - s.y) * 0.12;

      el.style.backgroundImage = `radial-gradient(circle ${radius}px at ${s.x}px ${s.y}px, var(--color-accent-slate) 0%, var(--color-accent-slate) 30%, var(--color-warm-ink) 90%)`;

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [radius]);

  return (
    <span
      ref={ref}
      className={`spotlight-text ${layerClass}`}
      style={{
        backgroundImage: `radial-gradient(circle ${radius}px at -999px -999px, var(--color-accent-slate) 0%, var(--color-warm-ink) 100%)`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {children}
    </span>
  );
}
