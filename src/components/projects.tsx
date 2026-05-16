"use client";

import { ArrowUpRight, Briefcase } from "@phosphor-icons/react";
import { SectionReveal } from "./section-reveal";
import { SpotlightText } from "./spotlight-text";
import { TechIcon } from "./tech-icon";

const projects = [
  {
    title: "AtlasMesh",
    role: "React / CesiumJS / Node.js / TypeScript",
    contribution: "Solo project",
    date: "2026",
    description:
      "Real-time 3D geospatial visualization platform aggregating 18 live data sources — aircraft, ships, satellites, ISS, Starlink, earthquakes, volcanoes, wildfires, weather — rendered simultaneously on a CesiumJS globe. Full-stack with REST API, deployed on Render.",
    link: "https://github.com/AtfastrSlushyMaker/AtlasMesh",
    live: "https://atlasmesh.onrender.com",
    tags: ["React 18", "CesiumJS", "TypeScript", "Node.js", "Docker", "Render"],
  },
  {
    title: "Elif — Pet Care Platform",
    role: "Angular 18 / Spring Boot 3.5 / MySQL",
    contribution: "Community Module · 4th Year · Team",
    date: "2025",
    description:
      "Full-stack pet-care monorepo spanning 8 business domains. Built the community system: posts, threaded comments, voting, real-time chat with mentions, moderation tools, and notification pipelines. Angular front-office with a Spring Boot REST API.",
    link: "https://github.com/AtfastrSlushyMaker/Elif",
    tags: ["Angular", "Spring Boot", "Java 17", "TypeScript", "MySQL", "Monorepo"],
  },
  {
    title: "Elif AI Agent",
    role: "Python / FastAPI / Groq LLM",
    contribution: "Microservice · Solo",
    date: "2025",
    description:
      "Standalone LLM-powered agent loop microservice for natural-language community search within Elif. Retrieves context from community APIs, plans actions via Groq, executes API calls, and returns grounded answers with follow-up suggestions. Provider-agnostic agent architecture.",
    link: "https://github.com/AtfastrSlushyMaker/elif-community-ai-agent-nl",
    tags: ["Python", "FastAPI", "Groq", "LLM Agent", "Microservice"],
  },
  {
    title: "WamiaGo",
    role: "JavaFX / Symfony / MySQL",
    contribution: "Bicycle Module · 3rd Year · Team",
    subtitle: "Desktop + Webapp",
    date: "2024",
    description:
      "Transportation management platform for Tunisia combining a JavaFX desktop application with a Symfony web platform. Built the electric bicycle module — station-based bike management with QR code unlocking, real-time availability tracking, and automated rental lifecycle. Developed the companion web platform sharing data models and business logic across both applications for seamless cross-platform operation.",
    link: "https://github.com/AtfastrSlushyMaker/WamiaGo-Webapp",
    linkLabel: "Webapp source",
    extraLink: { label: "Desktop source", href: "https://github.com/AtfastrSlushyMaker/WamiaGo-Desktop" },
    tags: ["JavaFX", "Symfony", "PHP 8", "MySQL"],
  },
  {
    title: "MySkills",
    role: "Laravel 12 / React 18 / MySQL",
    contribution: "Internship · Summer 2025",
    date: "Summer 2025",
    description:
      "Six-week internship project building a training management platform from the ground up. Multi-role architecture (Admin, Coordinator, Trainer, Trainee), course creation and scheduling, registration workflows with approval pipelines, certificate generation, and analytics dashboard.",
    link: "https://github.com/AtfastrSlushyMaker/MySkills",
    tags: ["Laravel", "React", "PHP", "TypeScript", "MySQL", "Ant Design"],
  },
  {
    title: "The 12th Man",
    role: "Python / scikit-learn / pandas / ML",
    contribution: "4th Year · Team",
    date: "2025",
    description:
      "AI-powered football analytics platform predicting Premier League standings, match outcomes, team tactical styles, and rising talent across Europe's top 5 leagues. Applied feature engineering on multi-season data and evaluated Logistic Regression, Random Forest, and XGBoost models against historical baselines.",
    link: "https://github.com/AtfastrSlushyMaker/the-12th-player",
    live: "https://the-12th-player-app.onrender.com",
    tags: ["Python", "scikit-learn", "pandas", "XGBoost", "ML", "TypeScript"],
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <div className="border-t border-stone-border/60 py-12 md:py-16 first:border-t-0">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <p className="text-xs text-muted/60 tracking-wide">
              {String(index + 1).padStart(2, "0")}
            </p>
            <span className="text-[10px] text-muted/40 font-mono">{project.date}</span>
          </div>
          <h3 className="text-2xl font-medium tracking-tight">
            <SpotlightText className="text-foreground" radius={320}>
              {project.title}
            </SpotlightText>
            {"subtitle" in project && project.subtitle && (
              <span className="text-sm text-muted/50 font-normal ml-2">
                ({project.subtitle})
              </span>
            )}
          </h3>
          <p className="text-sm text-muted mt-2">{project.role}</p>
          <p className="text-xs text-accent mt-1.5 font-medium">
            {project.contribution}
          </p>
        </div>
        <div className="space-y-4">
          <p className="text-base text-muted leading-relaxed max-w-[65ch]">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full bg-stone-surface/80 text-muted border border-stone-border/40 hover:border-stone-border/60 tag-hover inline-flex items-center gap-1 cursor-pointer"
              >
                <TechIcon name={tag} />
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-6 pt-1">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-accent font-medium group cursor-pointer"
            >
              {"linkLabel" in project && project.linkLabel
                ? project.linkLabel
                : "Source"}
              <ArrowUpRight weight="bold" className="w-3.5 h-3.5 icon-spring" />
            </a>
            {"live" in project && project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-accent font-medium group cursor-pointer"
              >
                Live Demo
                <ArrowUpRight weight="bold" className="w-3.5 h-3.5 icon-spring" />
              </a>
            )}
            {"extraLink" in project && project.extraLink && (
              <a
                href={project.extraLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-accent font-medium group cursor-pointer"
              >
                {project.extraLink.label}
                <ArrowUpRight weight="bold" className="w-3.5 h-3.5 icon-spring" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="work" className="px-6 py-20 md:py-48 max-w-7xl mx-auto w-full">
      <SectionReveal>
        <div className="mb-16 md:mb-24">
          <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-muted/50 mb-4">
            <Briefcase weight="duotone" className="w-3 h-3 inline-block mr-1.5 -mt-px" />
            Selected Work
          </p>
          <h2 className="text-3xl md:text-5xl tracking-tighter font-medium text-foreground">
            <SpotlightText className="text-foreground" radius={280}>
              Building systems
            </SpotlightText>
            <br />
            <SpotlightText className="text-foreground" radius={280}>
              from the ground up.
            </SpotlightText>
          </h2>
        </div>
      </SectionReveal>
      <div>
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
