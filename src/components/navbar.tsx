"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "#work", label: "Work" },
  { href: "#activity", label: "Activity" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
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
          className="text-sm font-medium tracking-tight text-foreground/80 hover:text-foreground transition-colors"
        >
          Malek Bsaissa
        </Link>
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className="relative text-sm text-muted hover:text-foreground transition-colors py-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
