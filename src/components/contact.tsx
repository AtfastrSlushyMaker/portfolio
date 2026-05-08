import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { SectionReveal } from "./section-reveal";

export function Contact() {
  return (
    <section id="contact" className="px-6 py-32 md:py-48 max-w-7xl mx-auto w-full">
      <div className="border-t border-stone-border/60 pt-16 md:pt-24">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
          <div>
            <p className="text-xs text-muted/60 tracking-wide mb-4">Contact</p>
          </div>
          <div>
            <SectionReveal>
              <h2 className="text-3xl md:text-5xl tracking-tighter font-medium text-foreground mb-8">
                Let us work<br />together.
              </h2>
            </SectionReveal>
            <div className="flex flex-wrap gap-6 mt-12">
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent hover:opacity-80 transition-opacity font-medium"
              >
                Download CV
              </a>
              <a
                href="https://github.com/AtfastrSlushyMaker"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/malek-bsaissa-8861b229b/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
      <footer className="mt-32 pt-8 border-t border-stone-border/30 flex justify-between text-xs text-muted/50">
        <span>&copy; {new Date().getFullYear()}</span>
        <span>All rights reserved.</span>
      </footer>
    </section>
  );
}
