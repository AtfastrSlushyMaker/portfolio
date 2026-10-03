import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import { ProjectMark } from "@/components/project-mark";
import { ProjectArchitecture } from "@/components/project-architecture";
import { UiIcon } from "@/components/ui-icon";

const openstackServices = [["Nova", "Compute"], ["Neutron", "Networking"], ["Keystone", "Identity"], ["Glance", "VM images"], ["Heat", "Orchestration"], ["Horizon", "Dashboard"], ["Octavia", "Load balancing"], ["Cinder", "Block storage"], ["Swift", "Object storage"]];

export function generateStaticParams() {
  return projects.map(project => ({ slug: project.id }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(p => p.id === slug);
  if (!project) return {};
  return { title: project.title, description: project.description };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex(p => p.id === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="case" style={{ "--project": project.color } as CSSProperties}>
      <header className="case-hero page-section">
        <Link href="/#work" className="case-back"><UiIcon name="back" /> All projects</Link>
        <div className="case-hero-grid">
          <div>
            <p className="section-label">{String(index + 1).padStart(2, "0")} · {project.category}</p>
            <h1 className="case-title" data-split>{project.title}</h1>
            <p className="case-subtitle" data-reveal>{project.subtitle}</p>
          </div>
          <ProjectMark project={project} size="hero" priority />
        </div>
        <dl className="case-meta" data-reveal-stagger>
          <div><dt>Role</dt><dd>{project.role}</dd></div>
          <div><dt>Year</dt><dd>{project.year}</dd></div>
          {project.links.length > 0 && <div><dt>Links</dt><dd className="case-links">{project.links.map(link => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} <UiIcon name="outward" /></a>)}</dd></div>}
        </dl>
      </header>

      <section className="case-section page-section" aria-labelledby="overview">
        <h2 id="overview" className="section-label">Overview</h2>
        <div className="case-overview">
          <p className="case-lede" data-scrub-words>{project.description}</p>
          <p className="case-detail" data-reveal>{project.detail}</p>
        </div>
      </section>

      {project.gallery && (
        <section className="case-section page-section" aria-labelledby="screens">
          <h2 id="screens" className="section-label">{project.gallery.length > 1 ? "Screenshots" : "Look"}</h2>
          <div className="case-gallery">
            {project.gallery.map((shot, i) => (
              <figure key={shot.src} className={i === 0 ? "case-shot case-shot--lead" : "case-shot"} data-reveal>
                <Image src={shot.src} alt={shot.caption} width={shot.width} height={shot.height} quality={90} sizes={i === 0 ? "(max-width: 900px) 100vw, 75vw" : "(max-width: 900px) 100vw, 37vw"} />
                <figcaption>{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="case-section page-section" aria-labelledby="architecture">
        <h2 id="architecture" className="section-label">Architecture</h2>
        <div data-reveal><ProjectArchitecture id={project.id} /></div>
      </section>

      <section className="case-section page-section" aria-labelledby="stack">
        <h2 id="stack" className="section-label">Stack</h2>
        <ul className="case-stack" data-reveal-stagger>{project.stack.map(item => <li key={item}>{item}</li>)}</ul>
      </section>

      {project.id === "hybrid-cloud" && (
        <section className="case-section page-section" aria-labelledby="openstack">
          <h2 id="openstack" className="section-label">OpenStack services</h2>
          <div className="openstack-services" data-reveal-stagger>{openstackServices.map(([name, role]) => <figure key={name}><Image src={`/logos/openstack/${name.toLowerCase()}.png`} alt={`${name} logo`} width={180} height={90} /><figcaption><strong>{name}</strong><span>{role}</span></figcaption></figure>)}</div>
        </section>
      )}

      {project.sections && (
        <section className="case-section page-section" aria-labelledby="details">
          <h2 id="details" className="section-label">In depth</h2>
          <div className="case-deep">{project.sections.map(section => <div key={section.title} className="case-deep-item" data-reveal><h3>{section.title}</h3><p>{section.text}</p></div>)}</div>
        </section>
      )}

      {project.note && <p className="case-note page-section">{project.note}</p>}

      <Link href={`/projects/${next.id}`} className="case-next" style={{ "--project": next.color } as CSSProperties}>
        <span className="page-section case-next-inner">
          <span className="section-label">Next project</span>
          <span className="case-next-title">{next.title} <UiIcon name="outward" /></span>
          <span className="case-next-subtitle">{next.subtitle}</span>
        </span>
      </Link>
    </article>
  );
}
