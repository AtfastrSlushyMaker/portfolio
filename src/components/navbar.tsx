"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "#work", label: "Work", id: "work" },
  { href: "#activity", label: "Activity", id: "activity" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#about", label: "About", id: "about" },
  { href: "#contact", label: "Contact", id: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-warm-paper/80 backdrop-blur-md border-b border-stone-border/50"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 text-sm font-medium tracking-tight text-foreground/80 hover:text-foreground transition-colors"
        >
          <img src="/logo.png" alt="MB" className="w-14 h-14 shrink-0 object-contain" />
          <span className="hidden sm:inline">Malek Bsaissa</span>
        </Link>
        <div className="flex items-center gap-6">
          {links.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className={`relative text-sm py-1 transition-colors group ${
                  isActive ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-px bg-accent transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            );
          })}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
