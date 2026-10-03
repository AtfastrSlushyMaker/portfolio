import { Hero } from "@/components/hero";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { Projects } from "@/components/projects";
import { Timeline } from "@/components/timeline";
import { GitGraph } from "@/components/git-graph";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Scene } from "@/components/scene";

export default function Home() {
  return (
    <>
      <Hero backdrop={<HeroBackdrop />} />
      <Projects />
      <About />
      <Timeline />
      <GitGraph />
      <Contact backdrop={<Scene name="contact" className="contact-scene" />} />
    </>
  );
}
