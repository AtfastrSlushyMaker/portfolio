"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from "@/lib/gsap";

let lenis: Lenis | null = null;
export const getLenis = () => lenis;

/**
 * Smooth scrolling plus the shared scroll reveals.
 * Content is fully visible without JavaScript or with reduced motion; reveals only hide what they are about to animate.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    lenis = new Lenis({ lerp: 0.1, anchors: { offset: -80 }, autoRaf: false });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis?.destroy(); lenis = null; };
  }, []);

  useEffect(() => {
    if (!location.hash) { lenis?.scrollTo(0, { immediate: true }); window.scrollTo(0, 0); }
    if (prefersReducedMotion()) return;
    const splits: SplitText[] = [];
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach(el => {
        gsap.fromTo(el, { y: 60, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.2, delay: Number(el.dataset.revealDelay ?? 0),
          scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]").forEach(group => {
        gsap.fromTo(group.children, { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.08,
          scrollTrigger: { trigger: group, start: "top 85%", once: true } });
      });
    });
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      ctx.add(() => {
        gsap.utils.toArray<HTMLElement>("[data-split]").forEach(el => {
          const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line" });
          splits.push(split);
          gsap.fromTo(split.lines, { yPercent: 110 }, { yPercent: 0, stagger: 0.09, duration: 1.3,
            scrollTrigger: { trigger: el, start: "top 88%", once: true } });
        });
        gsap.utils.toArray<HTMLElement>("[data-scrub-words]").forEach(el => {
          const split = SplitText.create(el, { type: "words", wordsClass: "scrub-word" });
          splits.push(split);
          gsap.fromTo(split.words, { opacity: 0.14 }, { opacity: 1, ease: "none", stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true } });
        });
      });
      ScrollTrigger.refresh();
    });
    return () => { cancelled = true; ctx.revert(); splits.forEach(s => s.revert()); };
  }, [pathname]);

  return <>{children}</>;
}
