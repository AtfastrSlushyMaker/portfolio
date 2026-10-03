"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";

export function Hero({ backdrop }: { backdrop?: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useGSAP((_, contextSafe) => {
    const html = document.documentElement;
    if (prefersReducedMotion() || !contextSafe) { html.dataset.intro = "done"; return; }

    gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } })
      .to(".hero-backdrop", { yPercent: 18, ease: "none" }, 0)
      .to(".hero-name-line:first-child", { xPercent: -8, ease: "none" }, 0)
      .to(".hero-name-line:last-child", { xPercent: 8, ease: "none" }, 0);

    let cancelled = false;
    let split: SplitText | undefined;
    const removers: (() => void)[] = [];
    const lines = gsap.utils.toArray<HTMLElement>(".hero-name-line", root.current);

    const start = contextSafe(() => {
      if (cancelled) return;
      split = SplitText.create(lines, { type: "chars", mask: "chars", charsClass: "hero-char" });
      html.dataset.intro = "done";
      gsap.timeline()
        .fromTo(".hero-backdrop-layer", { autoAlpha: 0 }, { autoAlpha: 1, duration: 2, ease: "power2.out" }, 0)
        .fromTo(split.chars, { yPercent: 115 }, { yPercent: 0, duration: 1.5, stagger: 0.035, ease: "expo.out" }, 0.15)
        .fromTo(".hero-fade", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.08, duration: 1 }, 0.7);

      // Hover: each letter rolls out of its masked slot and back in from below, so a sweep across the name ripples.
      if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      (split.chars as HTMLElement[]).forEach(char => {
        const roll = contextSafe(() => {
          if (gsap.isTweening(char)) return;
          gsap.timeline()
            .to(char, { yPercent: -110, duration: 0.28, ease: "power2.in" })
            .set(char, { yPercent: 110 })
            .to(char, { yPercent: 0, duration: 0.55, ease: "expo.out" });
        });
        char.addEventListener("pointerenter", roll);
        removers.push(() => char.removeEventListener("pointerenter", roll));
      });
    });

    document.fonts.ready.then(start);

    return () => {
      cancelled = true;
      removers.forEach(remove => remove());
      split?.revert();
    };
  }, { scope: root });

  return (
    <section ref={root} className="hero" aria-labelledby="hero-name">
      {backdrop}
      <div className="hero-top page-section">
        <p className="hero-fade">Software &amp; cloud engineering student, ESPRIT</p>
        <p className="hero-fade">Ariana, Tunisia</p>
      </div>
      <h1 id="hero-name" className="hero-name" aria-label="Malek Bsaissa">
        <span className="hero-name-line" aria-hidden="true">Malek</span>
        <span className="hero-name-line" aria-hidden="true">Bsaissa</span>
      </h1>
      <div className="hero-bottom page-section">
        <p className="hero-fade hero-lede">Final-year engineering student specializing in cloud and DevOps. Looking for an end-of-study internship.</p>
        <nav className="hero-fade hero-links" aria-label="Quick links">
          <a href="#work">Selected work</a>
          <Link href="/cv">Résumé</Link>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </section>
  );
}
