import { ArrowUpRight, Envelope, FileText, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { SectionReveal } from "./section-reveal";
import { SpotlightText } from "./spotlight-text";

export function Contact() {
  return (
    <section id="contact" className="px-6 py-32 md:py-48 max-w-7xl mx-auto w-full">
      <div className="border-t border-stone-border/60 pt-16 md:pt-24">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
          <div>
            <p className="text-xs text-muted/60 tracking-wide mb-4">
              <Envelope weight="duotone" className="w-3.5 h-3.5 inline-block mr-1.5 -mt-px" />
              Contact
            </p>
          </div>
          <div>
            <SectionReveal>
              <h2 className="text-3xl md:text-5xl tracking-tighter font-medium text-foreground mb-8">
                <SpotlightText className="text-foreground" radius={280}>
                  Let us work
                </SpotlightText>
                <br />
                <SpotlightText className="text-foreground" radius={280}>
                  together.
                </SpotlightText>
              </h2>
            </SectionReveal>
            <a
              href="mailto:dev.malekbsaissa@gmail.com"
              className="inline-flex items-center gap-2 text-lg text-accent hover:opacity-80 transition-opacity group mb-8"
            >
              dev.malekbsaissa@gmail.com
              <ArrowUpRight weight="bold" className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <div className="flex flex-wrap gap-6">
              <a
                href="/cv"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors pressable"
              >
                <FileText weight="duotone" className="w-4 h-4" />
                Download CV
              </a>
              <a
                href="https://github.com/AtfastrSlushyMaker"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors pressable"
              >
                <GithubLogo weight="duotone" className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/malek-bsaissa-8861b229b/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors pressable"
              >
                <LinkedinLogo weight="duotone" className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
      <footer className="mt-32 pt-8 border-t border-stone-border/30 flex flex-col sm:flex-row justify-between gap-2 text-xs text-muted/50">
        <span>&copy; {new Date().getFullYear()} Malek Bsaissa</span>
        <span>Built with Next.js, TypeScript, Tailwind</span>
      </footer>
    </section>
  );
}
