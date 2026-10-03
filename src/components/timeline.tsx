"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { projects } from "@/lib/projects";

interface TimelineItem { title: string; organization: string; logo: string; location: string; period: string; description: string[]; projectIds: string[]; isEducation?: boolean }

const timelineItems: TimelineItem[] = [
  {
    title: "Full-Stack & Cloud Engineering Intern",
    organization: "Banque de Tunisie",
    logo: "/logos/orgs/banque-de-tunisie.png",
    projectIds: ["memo"],
    location: "Remote · Tunisia",
    period: "Jul – Aug 2026",
    description: [
      "Built MEMO with Angular, Spring Boot, and PostgreSQL: tenant-scoped workplace operations, messaging, audit trails, and a separate platform console.",
      "Integrated a FastAPI assistant with streamed, source-grounded answers and delegated authorization enforced by Spring.",
      "Deployed a demo to Azure AKS with Terraform and GitHub Actions OIDC; added container builds and Prometheus/Grafana monitoring.",
    ],
  },
  {
    title: "Full-Stack Developer Intern",
    organization: "Smart Skills",
    logo: "/logos/orgs/smart-skills.png",
    projectIds: ["myskills"],
    location: "El Ghazela Technology Park, Ariana",
    period: "Jun – Aug 2025",
    description: [
      "Engineered MySkills, a multi-role training management platform (Admin, Coordinator, Trainer, Trainee) with Laravel 12, React 18.3, and MySQL.",
      "Built 70+ RESTful API endpoints with token-based authentication via Laravel Sanctum and granular RBAC enforced end-to-end.",
      "Delivered an automated certificate generation pipeline and a dual-channel notification system (in-app + SMTP email).",
    ],
  },
  {
    title: "Operations Intern",
    organization: "Tunisair",
    logo: "/logos/orgs/tunisair.svg",
    projectIds: [],
    location: "Tunis-Carthage International Airport",
    period: "Jun 2023",
    description: ["Observed and supported airline ticketing, refund processing, and day-to-day operational workflows."],
  },
  {
    title: "Engineering Degree, Computer Science",
    organization: "ESPRIT School of Engineering",
    logo: "/logos/orgs/esprit.png",
    projectIds: ["elif", "elif-ai-agent", "hybrid-cloud", "the-12th-player", "wamiago"],
    location: "Ariana, Tunisia",
    period: "2022 – 2027",
    description: [
      "Fifth and final year. Specialty: ARCTIC (Cloud Computing & DevOps).",
      "Key coursework: Software Engineering, Data Structures & Algorithms, OOP, Web Development, Cloud Infrastructure.",
    ],
    isEducation: true,
  },
];

export function Timeline() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.fromTo(".timeline-line-fill", { scaleY: 0 }, { scaleY: 1, ease: "none",
      scrollTrigger: { trigger: ".timeline-list", start: "top 65%", end: "bottom 65%", scrub: true } });
    gsap.utils.toArray<HTMLElement>(".timeline-entry").forEach(entry => {
      gsap.from(entry, { x: 40, autoAlpha: 0, duration: 1.2, scrollTrigger: { trigger: entry, start: "top 82%", once: true } });
      gsap.fromTo(entry, { "--lit": 0 }, { "--lit": 1, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: entry, start: "top 65%", toggleActions: "play none none reverse" } });
    });
  }, { scope: root });

  return (
    <section ref={root} id="experience" className="experience page-section" aria-labelledby="experience-title">
      <div className="section-heading">
        <p className="section-label">Experience</p>
        <h2 id="experience-title" data-split>Internships &amp; education</h2>
      </div>
      <ol className="timeline-list">
        <span className="timeline-line" aria-hidden="true"><span className="timeline-line-fill" /></span>
        {timelineItems.map(item => (
          <li key={item.organization} className="timeline-entry">
            <div className="org-mark"><Image src={item.logo} alt={`${item.organization} logo`} width={160} height={160} /></div>
            <div className="timeline-content">
              <p className="timeline-period">{item.period}{item.isEducation && <span className="timeline-tag">Education</span>}</p>
              <h3>{item.organization}</h3>
              <p className="timeline-role">{item.title} <span>· {item.location}</span></p>
              <ul>{item.description.map(line => <li key={line}>{line}</li>)}</ul>
              {item.projectIds.length > 0 && (
                <p className="timeline-projects">
                  <span>{item.projectIds.length > 1 ? "Projects" : "Project"}</span>
                  {item.projectIds.map(id => { const project = projects.find(p => p.id === id)!; return <Link key={id} href={`/projects/${id}`}>{project.title} ↗</Link>; })}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
