import Image from "next/image";
import { ViewTransition } from "react";
import type { Project } from "@/lib/projects";

/** The project's logo, bare or on a neutral tile. Shares a view-transition name across routes unless disabled. */
export function ProjectMark({ project, size = "card", priority = false, viewTransition = true, bare = false }: { project: Project; size?: "card" | "hero"; priority?: boolean; viewTransition?: boolean; bare?: boolean }) {
  const tile = (
    <div className={`project-mark project-mark--${size}${bare ? " project-mark--bare" : ""}`}>
      <Image src={project.logo} alt={`${project.title} logo`} width={640} height={640} priority={priority} sizes={size === "hero" ? "(max-width: 800px) 70vw, 34vw" : "(max-width: 800px) 30vw, 22vw"} />
    </div>
  );
  return viewTransition ? <ViewTransition name={`project-mark-${project.id}`} share="morph">{tile}</ViewTransition> : tile;
}
