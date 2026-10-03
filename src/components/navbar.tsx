"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { UiIcon } from "./ui-icon";
import { ThemeToggle } from "./theme-toggle";
import { usePortfolioMotion } from "./motion-provider";

const links = [{ id: "work", label: "Work" }, { id: "about", label: "About" }, { id: "experience", label: "Experience" }, { id: "contact", label: "Contact" }];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const { enabled } = usePortfolioMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-40% 0px -55% 0px" });
    links.forEach(link => { const el = document.getElementById(link.id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y < window.innerHeight * 0.5) setActive("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); button.current?.focus(); } };
    const resize = () => { if (innerWidth >= 800) setOpen(false); };
    window.addEventListener("keydown", escape); window.addEventListener("resize", resize);
    return () => { window.removeEventListener("keydown", escape); window.removeEventListener("resize", resize); };
  }, [open]);

  return (
    <header className="site-header" data-scrolled={scrolled || open}>
      <nav className="main-nav" aria-label="Main navigation">
        <Link href="/" className="brand" aria-label="Malek Bsaissa home">MB<span>.</span></Link>
        <div className="desktop-nav">{links.map(link => <a key={link.id} href={`/#${link.id}`} aria-current={pathname === "/" && active === link.id ? "location" : undefined}>{link.label}</a>)}</div>
        <div className="nav-tools">
          <Link href="/cv" className="cv-link">Résumé <UiIcon name="outward" /></Link>
          <ThemeToggle />
          <button ref={button} className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}<span aria-hidden="true"><UiIcon name={open ? "minus" : "plus"} /></span></button>
        </div>
      </nav>
      <AnimatePresence initial={false}>{open && <motion.nav id="mobile-menu" aria-label="Mobile navigation" className="mobile-nav" initial={enabled ? { height: 0 } : false} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: enabled ? .5 : 0, ease: [.22, 1, .36, 1] }}>
        <div className="mobile-nav-inner">{links.map((link, index) => <motion.a initial={enabled ? { y: 30, opacity: 0 } : false} animate={{ y: 0, opacity: 1 }} transition={{ duration: .5, delay: enabled ? .1 + index * .05 : 0, ease: [.22, 1, .36, 1] }} key={link.id} href={`/#${link.id}`} onClick={() => setOpen(false)}>{link.label}<span aria-hidden="true"><UiIcon name="outward" /></span></motion.a>)}</div>
      </motion.nav>}</AnimatePresence>
    </header>
  );
}
