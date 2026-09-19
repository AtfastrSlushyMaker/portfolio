"use client";

import Image from "next/image";
import { TechIcon } from "./tech-icon";
import { useState } from "react";
import { LayoutGroup, motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { projects, type ProjectCategory } from "@/lib/projects";
import { ProjectArchitecture } from "./project-architecture";
import { usePortfolioMotion } from "./motion-provider";

const filters = ["Everything", "Applications", "Cloud", "AI & data"] as const;
type Filter = typeof filters[number];

export function Projects() {
  const [filter, setFilter] = useState<Filter>("Everything");
  const [selectedId, setSelectedId] = useState(projects[0].id);
  const { enabled } = usePortfolioMotion();
  const visible = projects.filter(p => filter === "Everything" || p.category === filter as ProjectCategory);
  const selected = visible.find(p => p.id === selectedId) ?? visible[0];
  return (
    <section id="work" className="work-section page-section" aria-labelledby="work-title">
      <div className="work-heading">
        <h2 id="work-title">Selected projects</h2>
        <p>Applications, infrastructure,<br />and machine learning.</p>
      </div>
      <div className="project-filters" role="group" aria-label="Filter projects">
        {filters.map(value => <button key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>
          {value}<span>{value === "Everything" ? projects.length : projects.filter(p => p.category === value).length}</span>
        </button>)}
      </div>
      <LayoutGroup id="project-browser"><div className="work-browser">
        <div className="project-index" aria-label="Select a project">
          {visible.map(project => <motion.button
            layout={enabled ? "position" : false}
            transition={{type:"spring", stiffness:330, damping:34}}
            key={project.id}
            aria-pressed={selected.id === project.id}
            aria-controls="project-detail"
            onClick={() => setSelectedId(project.id)}
            className="project-choice"
          >
            {selected.id === project.id && <motion.span className="project-selection" layoutId={enabled ? "selected-project" : undefined} transition={{type:"spring",stiffness:300,damping:36}} aria-hidden="true" />}
            <span className="project-number">{String(projects.indexOf(project) + 1).padStart(2,"0")}</span>
            <span className="project-choice-title">{project.title}<span>{project.subtitle}</span></span>
            <ArrowUpRight className="project-choice-arrow" size={24} weight="light" aria-hidden="true" />
          </motion.button>)}
        </div>
        <motion.article key={selected.id} initial={false} animate={{x: enabled ? [12,0] : 0}} transition={{duration:.45,ease:[.22,1,.36,1]}} id="project-detail" className="project-detail" aria-label={`${selected.title} project details`}>
          <ProjectArchitecture id={selected.id} />
          <div key={selected.id} className="project-copy" aria-live="polite">
            <div className="project-meta"><span>{selected.role}</span><span>{selected.year}</span></div>
            <h3>{selected.title}</h3>
            <p className="project-description">{selected.description}</p>
            <p className="project-detail-text">{selected.detail}</p>
            <ul className="project-stack" aria-label="Technologies">{selected.stack.map(item => <li key={item}><TechIcon name={item} />{item}</li>)}</ul>
            <div className="project-links">{selected.links.map(link => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={18} aria-hidden="true" /></a>)}</div>
            {selected.id === "hybrid" && <div className="openstack-services" aria-label="OpenStack services">{[["Nova","Compute"],["Neutron","Networking"],["Keystone","Identity"],["Glance","VM images"],["Heat","Orchestration"],["Horizon","Dashboard"],["Octavia","Load balancing"],["Cinder","Block storage"],["Swift","Object storage"]].map(([name,role])=><figure key={name}><Image src={`/logos/openstack/${name.toLowerCase()}.png`} alt={`${name} logo`} width={180} height={90} /><figcaption><strong>{name}</strong><span>{role}</span></figcaption></figure>)}</div>}
            {selected.sections?.map(section => <section className="project-deep-detail" key={section.title}><h4>{section.title}</h4><p>{section.text}</p></section>)}
            {selected.note && <p className="project-note">{selected.note}</p>}
          </div>
        </motion.article>
      </div></LayoutGroup>
      <noscript><div className="static-projects">{projects.slice(1).map(project => <article key={project.id}><h3>{project.title}</h3><p>{project.description}</p><p>{project.detail}</p>{project.links.map(link => <a key={link.href} href={link.href}>{link.label} ↗</a>)}</article>)}</div></noscript>
    </section>
  );
}
