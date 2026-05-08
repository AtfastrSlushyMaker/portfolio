import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export function Hero() {
  return (
    <section className="min-h-[100dvh] flex flex-col justify-center px-6 pt-24 pb-16 max-w-7xl mx-auto w-full relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full opacity-[0.02]"
          style={{
            width: 600,
            height: 600,
            top: "50%",
            left: "20%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, var(--color-accent-slate) 0%, transparent 70%)",
          }}
        />
      </div>
      <div className="max-w-3xl relative z-[1]">
        <p className="text-sm text-muted mb-6">
          Cloud Engineering Student &mdash; ESPRIT ARCTIC
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-tighter leading-[0.95] font-medium text-foreground">
          Malek
          <br />
          Bsaissa
        </h1>
        <p className="text-lg md:text-xl text-muted mt-8 max-w-xl leading-relaxed">
          Fourth-year cloud engineering student building real-time
          geospatial platforms, enterprise applications, and
          AI-integrated systems. Based in Tunisia.
        </p>
        <div className="mt-10 flex items-center gap-6">
          <a
            href="#work"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:opacity-80 transition-opacity group"
          >
            View selected work
            <ArrowRight
              weight="bold"
              className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
            />
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors group"
          >
            Download CV
            <ArrowRight
              weight="bold"
              className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
