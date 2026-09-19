"use client";
import { PointerMask } from "./pointer-mask";
import { ArrowDownRight } from "@phosphor-icons/react";
export function Hero() {
  return <section className="hero" aria-labelledby="hero-name">
    <div className="hero-intro"><p>Software & cloud engineering</p><p>ESPRIT · 5th year</p></div>
    <div className="hero-composition"><PointerMask as="h1" id="hero-name" className="hero-name"><span>Malek</span><span>Bsaissa</span></PointerMask></div>
    <div className="hero-availability"><p>Final-year engineering student.<br />Looking for an end-of-study internship.</p><a href="mailto:dev.malekbsaissa@gmail.com">Contact me ↗</a></div>
    <ul className="hero-disciplines" aria-label="Areas of work"><li>Full-stack development</li><li>Cloud infrastructure</li><li>Machine learning</li></ul>
    <div className="hero-bottom"><p>Based in Tunisia.</p><a className="explore-link" href="#work">View projects <ArrowDownRight size={28} weight="light" /></a></div>
  </section>;
}
