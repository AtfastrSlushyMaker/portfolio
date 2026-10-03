"use client";

import { useState, type ReactNode } from "react";
import { getLenis } from "./smooth-scroll";

const email = "dev.malekbsaissa@gmail.com";

export function Contact({ backdrop }: { backdrop?: ReactNode }) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  async function copyEmail() {
    try { await navigator.clipboard.writeText(email); setCopyState("copied"); setTimeout(() => setCopyState("idle"), 2200); }
    catch { setCopyState("failed"); }
  }
  const toTop = () => { const l = getLenis(); if (l) l.scrollTo(0); else window.scrollTo({ top: 0 }); };

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      {backdrop}
      <div className="page-section">
        <p className="section-label" id="contact-title">Contact</p>
        <p className="contact-intro" data-reveal>Open to end-of-study internships in cloud, DevOps or software engineering.</p>
        <a href={`mailto:${email}`} className="contact-email" data-split>dev.malekbsaissa@<wbr />gmail.com</a>
        <div className="contact-details" data-reveal>
          <button onClick={copyEmail} className="text-button">{copyState === "copied" ? "Copied" : "Copy email"}</button>
          <span role="status" className={copyState === "failed" ? "copy-error" : "sr-only"}>{copyState === "copied" ? "Email address copied." : copyState === "failed" ? "Copy unavailable. Select the email or use the email link." : ""}</span>
          <a href="https://github.com/AtfastrSlushyMaker" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/malek-bsaissa-8861b229b/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="/cv">Résumé</a>
        </div>
      </div>
      <footer className="footer page-section">
        <span>© {new Date().getFullYear()} Malek Bsaissa</span>
        <button onClick={toTop} className="text-button">Back to top</button>
      </footer>
    </section>
  );
}
