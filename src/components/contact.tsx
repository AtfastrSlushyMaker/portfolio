"use client";

import { PointerMask } from "./pointer-mask";
import { useState } from "react";
import { ArrowUpRight, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
const email = "dev.malekbsaissa@gmail.com";
export function Contact() {
  const [copyState,setCopyState] = useState<"idle"|"copied"|"failed">("idle");
  async function copyEmail() {
    try {await navigator.clipboard.writeText(email);setCopyState("copied");}
    catch {setCopyState("failed");}
  }
  return <section id="contact" className="contact-section page-section" aria-labelledby="contact-title">
    <div className="contact-top"><PointerMask id="contact-title">Get in touch</PointerMask><div className="contact-aside"><p>End-of-study internship opportunities<br />in cloud, DevOps, or software engineering.</p><a href={`mailto:${email}`} className="contact-action">Email me <ArrowUpRight size={42} weight="light" /></a></div></div>
    <div className="contact-details"><div className="email-row"><a href={`mailto:${email}`}>{email}</a><button onClick={copyEmail}>{copyState === "copied" ? "Copied" : "Copy"}</button><span role="status" className={copyState === "failed" ? "copy-error" : "sr-only"}>{copyState === "copied" ? "Email address copied." : copyState === "failed" ? "Copy unavailable. Select the email or use the email link." : ""}</span></div>
      <div className="social-links"><a href="https://github.com/AtfastrSlushyMaker" target="_blank" rel="noopener noreferrer"><GithubLogo size={20} />GitHub</a><a href="https://www.linkedin.com/in/malek-bsaissa-8861b229b/" target="_blank" rel="noopener noreferrer"><LinkedinLogo size={20} />LinkedIn</a><a href="/cv">Résumé <ArrowUpRight size={18} /></a></div></div>
    <footer className="footer"><span>© {new Date().getFullYear()} Malek Bsaissa</span><a href="#hero-name">Back to top ↑</a><span>Tunisia</span></footer>
  </section>;
}
