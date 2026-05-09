"use client";

import { useEffect, useState, useCallback } from "react";
import { ArrowUp } from "@phosphor-icons/react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <button
      onClick={scrollUp}
      aria-label="Back to top"
      className={`fixed bottom-8 right-8 z-40 w-10 h-10 rounded-full border border-stone-border/50 bg-warm-paper/80 backdrop-blur-md text-muted hover:text-foreground hover:border-stone-border transition-all duration-300 flex items-center justify-center ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp weight="bold" className="w-4 h-4" />
    </button>
  );
}
