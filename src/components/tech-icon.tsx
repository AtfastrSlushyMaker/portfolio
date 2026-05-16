"use client";

import {
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiDocker,
  SiCesium,
  SiAngular,
  SiSpringboot,
  SiMysql,
  SiSymfony,
  SiPhp,
  SiOpenjdk,
  SiLaravel,
  SiPython,
  SiFastapi,
  SiScikitlearn,
  SiPandas,
  SiBoost,
  SiAntdesign,
  SiRender,
} from "@icons-pack/react-simple-icons";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "React": SiReact,
  "React 18": SiReact,
  "TypeScript": SiTypescript,
  "Node.js": SiNodedotjs,
  "Docker": SiDocker,
  "CesiumJS": SiCesium,
  "Render": SiRender,
  "Angular": SiAngular,
  "Spring Boot": SiSpringboot,
  "MySQL": SiMysql,
  "Monorepo": undefined!,
  "Symfony": SiSymfony,
  "PHP 8": SiPhp,
  "AI/ML": undefined!,
  "Java 17": SiOpenjdk,
  "JavaFX": undefined!,
  "Laravel": SiLaravel,
  "PHP": SiPhp,
  "Groq": undefined!,
  "LLM Agent": undefined!,
  "Microservice": undefined!,
  "Python": SiPython,
  "FastAPI": SiFastapi,
  "scikit-learn": SiScikitlearn,
  "pandas": SiPandas,
  "XGBoost": SiBoost,
  "ML": undefined!,
  "Ant Design": SiAntdesign,
  "Java": SiOpenjdk,
};

export function TechIcon({ name }: { name: string }) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon className="w-3 h-3 shrink-0" />;
}
