"use client";

import { useCallback } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { SpotlightText } from "./spotlight-text";

export function Hero() {
  const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="min-h-[100dvh] flex flex-col justify-center px-4 sm:px-6 pt-20 sm:pt-24 pb-12 sm:pb-16 max-w-7xl mx-auto w-full relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full opacity-[0.02]"
          style={{
            width: 600,
            height: 600,
            top: "50%",
            left: "20%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, var(--color-accent-slate) 0%, transparent 70%)",
          }}
        />
      </div>
      <div className="max-w-3xl relative z-[1]">
        <p className="text-sm text-muted mb-6">
          Cloud Engineering Student &mdash; ESPRIT ARCTIC
        </p>
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.92] font-medium">
          <SpotlightText className="text-foreground" radius={320}>
            Malek
          </SpotlightText>
          <br />
          <SpotlightText className="text-foreground" radius={320}>
            Bsaissa
          </SpotlightText>
          <span className="text-accent">.</span>
        </h1>
        <p className="text-lg md:text-xl text-muted mt-8 max-w-xl leading-relaxed">
          4th year Cloud engineering student at ESPRIT — ARCTIC section. Based in Tunisia.
        </p>
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <a
            href="#work"
            onClick={(e) => scrollTo(e, "work")}
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:opacity-80 transition-opacity group pressable cursor-pointer"
          >
            View selected work
            <span className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/15 transition-colors">
              <ArrowRight
                weight="bold"
                className="w-3.5 h-3.5 icon-spring"
              />
            </span>
          </a>
          <a
            href="/cv"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors group pressable cursor-pointer"
          >
            Download CV
            <span className="w-6 h-6 rounded-full bg-stone-surface flex items-center justify-center group-hover:bg-stone-border/50 transition-colors">
              <ArrowRight
                weight="bold"
                className="w-3.5 h-3.5 icon-spring"
              />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
