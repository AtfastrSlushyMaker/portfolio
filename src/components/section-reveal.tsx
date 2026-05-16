"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function SectionReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-800 ${
        visible ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-[0.97] blur-sm"
      } ${className ?? ""}`}
      style={{ transformOrigin: "center" }}
    >
      {children}
    </div>
  );
}
