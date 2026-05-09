import { User } from "@phosphor-icons/react/dist/ssr";
import { SectionReveal } from "./section-reveal";

export function About() {
  return (
    <section id="about" className="px-6 py-32 md:py-48 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
        <div>
          <p className="text-xs text-muted/60 tracking-wide mb-4">
            <User weight="duotone" className="w-3.5 h-3.5 inline-block mr-1.5 -mt-px" />
            About
          </p>
        </div>
        <div className="space-y-8">
          <SectionReveal>
            <p className="text-xl md:text-2xl text-foreground leading-relaxed tracking-tight max-w-[50ch]">
              I am a fourth-year cloud engineering student at ESPRIT,
              specializing in the ARCTIC section. I build full-stack
              systems that work across web, desktop, and cloud.
            </p>
          </SectionReveal>
          <SectionReveal>
            <p className="text-base text-muted leading-relaxed max-w-[55ch]">
              My work spans real-time geospatial platforms with 3D
              visualization, multi-role enterprise applications,
              AI-integrated transportation systems, and full-stack
              training platforms. I care about clean architecture,
              containerization, and shipping code that runs reliably
              in production.
            </p>
          </SectionReveal>
          <SectionReveal>
            <div className="grid grid-cols-3 gap-4 pt-8">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">
                Frontend
              </h4>
              <ul className="text-sm text-muted space-y-1.5">
                <li>React / Angular</li>
                <li>TypeScript</li>
                <li>CesiumJS</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">
                Backend
              </h4>
              <ul className="text-sm text-muted space-y-1.5">
                <li>Node.js / Flask</li>
                <li>Spring Boot</li>
                <li>Symfony / Laravel</li>
                <li>Java / PHP / Python</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">
                DevOps &amp; Data
              </h4>
              <ul className="text-sm text-muted space-y-1.5">
                <li>Docker</li>
                <li>MySQL</li>
                <li>Cloud (Openstack)</li>
                <li>AI/ML Integration</li>
              </ul>
            </div>
          </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
