"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, ArrowUpRight } from "@phosphor-icons/react";
import { moreProjects, projects } from "@/lib/projects";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { getLenis } from "./smooth-scroll";
import { ProjectMark } from "./project-mark";

export function Projects() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const more = useRef<HTMLElement>(null);
  const pin = useRef<ScrollTrigger | null>(null);
  // Which way the visitor is moving through the pinned row: the skip button jumps out in that direction.
  const [direction, setDirection] = useState<"down" | "up">("down");

  const skip = () => {
    const lenis = getLenis();
    if (direction === "up" && pin.current) {
      const top = Math.max(0, pin.current.start - window.innerHeight);
      if (lenis) lenis.scrollTo(top, { duration: 1.2 }); else window.scrollTo({ top });
      return;
    }
    const target = more.current;
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { offset: -80, duration: 1.2 });
    else target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
    target.focus({ preventScroll: true });
  };

  // Desktop: the section pins and the row of projects slides sideways with the scroll.
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px)", () => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth;
      const scroll = gsap.to(el, { x: () => -distance(), ease: "none",
        scrollTrigger: { trigger: section.current, start: "top top", end: () => `+=${distance()}`, scrub: 0.8, pin: true, invalidateOnRefresh: true, anticipatePin: 1,
          onUpdate: self => setDirection(self.direction === -1 ? "up" : "down") } });
      pin.current = scroll.scrollTrigger ?? null;
      gsap.fromTo(".work-progress-bar", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: section.current, start: "top top", end: () => `+=${distance()}`, scrub: true } });
      gsap.utils.toArray<HTMLElement>(".showcase-item").forEach(item => {
        gsap.fromTo(item.querySelector(".project-mark"), { yPercent: 12, scale: 0.9 }, { yPercent: 0, scale: 1, ease: "power2.out",
          scrollTrigger: { trigger: item, containerAnimation: scroll, start: "left 100%", end: "left 55%", scrub: true } });
      });
      ScrollTrigger.refresh();
      return () => { pin.current = null; };
    });
    return () => mm.revert();
  }, { scope: section });

  return (
    <>
      <section ref={section} id="work" className="work" aria-labelledby="work-title">
        <div ref={track} className="work-track">
          <header className="work-intro">
            <p className="section-label">Selected work <span>({projects.length})</span></p>
            <h2 id="work-title" data-split>Projects</h2>
            <p className="work-intro-copy">Applications, cloud infrastructure and machine learning, from school, internships and my own time. Each case study states my role.</p>
          </header>
          {projects.map((project, index) => (
            <Link key={project.id} href={`/projects/${project.id}`} className="showcase-item">
              <ProjectMark project={project} bare />
              <div className="showcase-body">
                <p className="showcase-meta"><span>{String(index + 1).padStart(2, "0")}</span><span>{project.category}</span><span>{project.year}</span></p>
                <h3>{project.title}</h3>
                <p className="showcase-subtitle">{project.subtitle}</p>
                <span className="showcase-cta">Case study <ArrowUpRight size={16} weight="bold" aria-hidden="true" /></span>
              </div>
            </Link>
          ))}
          <div className="work-end" aria-hidden="true" />
        </div>
        <div className="work-footer">
          <div className="work-progress" aria-hidden="true"><span className="work-progress-bar" /></div>
          <button type="button" className="work-skip" onClick={skip}>Skip projects {direction === "up" ? <ArrowUp size={16} weight="bold" aria-hidden="true" /> : <ArrowDown size={16} weight="bold" aria-hidden="true" />}</button>
        </div>
      </section>

      <section ref={more} tabIndex={-1} className="more-projects page-section" aria-labelledby="more-title">
        <p className="section-label" id="more-title">More projects</p>
        <ul>
          {moreProjects.map(project => (
            <li key={project.href}>
              <a href={project.href} target="_blank" rel="noopener noreferrer">
                <strong>{project.title}</strong>
                <span>{project.description}</span>
                <span className="more-stack">{project.stack}</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
