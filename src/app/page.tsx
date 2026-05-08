import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Timeline } from "@/components/timeline";
import { GitGraph } from "@/components/git-graph";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <GitGraph />
      <Timeline />
      <About />
      <Contact />
    </>
  );
}
