import type { ReactNode } from "react";

// Scroll motion is progressive enhancement. Content never depends on JavaScript.
export function SectionReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`section-reveal ${className}`}>{children}</div>;
}
