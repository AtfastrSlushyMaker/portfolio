"use client";

import { useEffect, useRef, useState } from "react";
import { Briefcase, ClockCounterClockwise, GraduationCap } from "@phosphor-icons/react";
import { SectionReveal } from "./section-reveal";
import { SpotlightText } from "./spotlight-text";

const timelineItems = [
  {
    year: "2025",
    title: "Full-Stack Developer Intern",
    organization: "Smart Skills",
    location: "El Ghazela Technology Park, Ariana",
    period: "Jun — Aug 2025",
    description: [
      "Engineered MySkills, a multi-role training management platform (Admin, Coordinator, Trainer, Trainee) with Laravel 12, React 18.3, and MySQL",
      "Built 70+ RESTful API endpoints with token-based authentication via Laravel Sanctum and granular RBAC enforced end-to-end",
      "Delivered an automated certificate generation pipeline and a dual-channel notification system (in-app + SMTP email)",
    ],
  },
  {
    year: "2023",
    title: "Operations Intern",
    organization: "Tunisair",
    location: "Tunis-Carthage International Airport",
    period: "Jun 2023",
    description: [
      "Observed and supported airline ticketing, refund processing, and day-to-day operational workflows",
    ],
  },
  {
    year: "2022",
    title: "Engineering Degree — Computer Science",
    organization: "ESPRIT School of Engineering",
    location: "Ariana, Tunisia",
    period: "2022 — 2027 (Expected)",
    description: [
      "Specialty: ARCTIC (Cloud Computing & DevOps)",
      "Key coursework: Software Engineering, Data Structures & Algorithms, OOP, Web Development, Cloud Infrastructure",
    ],
    isEducation: true,
  },
];

function TimelineEntry({
  item,
  index,
}: {
  item: (typeof timelineItems)[number];
  index: number;
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
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative pl-10 md:pl-14 pb-16 last:pb-0 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="absolute left-0 top-0 bottom-0 flex flex-col items-center">
        <div
          className={`w-5 h-5 rounded-full border-2 shrink-0 mt-1 flex items-center justify-center transition-all duration-500 ${
            visible
              ? "bg-accent border-accent scale-100"
              : "bg-transparent border-stone-border scale-50"
          }`}
          style={{ transitionDelay: `${index * 150 + 300}ms` }}
        >
          {item.isEducation ? (
            <GraduationCap weight="duotone" className={`w-3 h-3 transition-colors duration-500 ${visible ? "text-[var(--color-warm-paper)]" : "text-transparent"}`} />
          ) : (
            <Briefcase weight="duotone" className={`w-3 h-3 transition-colors duration-500 ${visible ? "text-[var(--color-warm-paper)]" : "text-transparent"}`} />
          )}
        </div>
        {index < timelineItems.length - 1 && (
          <div
            className="w-px flex-1 bg-stone-border/60 mt-2 transition-all duration-700 origin-top"
            style={{
              transform: visible ? "scaleY(1)" : "scaleY(0)",
              transitionDelay: `${index * 150 + 500}ms`,
            }}
          />
        )}
      </div>

      <div>
        <span className="text-xs text-accent font-medium tracking-wide mb-1 block">
          {item.year}
        </span>
        <h3 className="text-xl font-medium tracking-tight text-foreground">
          {item.title}
        </h3>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-sm text-muted">
          <span>{item.organization}</span>
          <span className="text-stone-border">|</span>
          <span>{item.location}</span>
        </div>
        <p className="text-xs text-muted/60 mt-1">{item.period}</p>
        <ul className="mt-4 space-y-2">
          {item.description.map((desc, i) => (
            <li
              key={i}
              className="text-sm text-muted leading-relaxed flex items-start gap-2"
            >
              <span className="text-accent mt-1.5 shrink-0 block w-1 h-1 rounded-full bg-accent" />
              {desc}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Timeline() {
  return (
    <section id="experience" className="px-6 py-20 md:py-48 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
        <div>
          <p className="text-xs text-muted/60 tracking-wide mb-4">
            <ClockCounterClockwise weight="duotone" className="w-3.5 h-3.5 inline-block mr-1.5 -mt-px" />
            Experience
          </p>
        </div>
        <div>
          <h2 className="text-3xl md:text-5xl tracking-tighter font-medium text-foreground mb-16">
            <SectionReveal>
              <h2 className="text-3xl md:text-5xl tracking-tighter font-medium text-foreground mb-16">
                <SpotlightText className="text-foreground" radius={280}>
                  Where I have
                </SpotlightText>
                <br />
                <SpotlightText className="text-foreground" radius={280}>
                  been so far.
                </SpotlightText>
              </h2>
            </SectionReveal>
          </h2>
          <div className="relative">
            {timelineItems.map((item, i) => (
              <TimelineEntry key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
