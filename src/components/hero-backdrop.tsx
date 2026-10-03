import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { HeroSky } from "./hero-sky";

/** Which photo set in /public/hero to use. Each set holds hero-day (light mode) and hero-night (dark mode). */
const HERO_SET = "option-b";
/** Where the field meets the sky (fraction of image height); stars above it twinkle at night. */
const HORIZON = 0.665;
/** The 3:2 photo covers a full-height section: on viewports taller than 3:2 it is cropped and needs 1.5x the height in width. */
export const COVER_SIZES = "(max-aspect-ratio: 3/2) 150vh, 100vw";

const find = (dir: string, name: string) => {
  const file = ["jpg", "jpeg", "png", "webp"].map(ext => `${name}.${ext}`).find(f => fs.existsSync(path.join(process.cwd(), "public", dir, f)));
  return file && `/${dir}/${file}`;
};

/**
 * Full-bleed hero photography, one image per theme, rendering nothing until the files exist.
 * When the golden-hour and dusk frames of the same field exist too, the hero becomes a slow timelapse.
 */
export function HeroBackdrop() {
  const morning = find(`hero/${HERO_SET}`, "hero-day");
  const night = find(`hero/${HERO_SET}`, "hero-night");
  const goldenHour = find("scenes/contact", "day");
  const dusk = find("scenes/contact", "night");
  const stills = [
    { theme: "light", src: morning },
    { theme: "dark", src: night },
  ].filter((v): v is { theme: string; src: string } => Boolean(v.src));
  if (stills.length === 0) return null;
  return (
    <div className="hero-backdrop" aria-hidden="true">
      <div className="hero-backdrop-layer">
        {stills.map(v => (
          <Image key={v.src} src={v.src} alt="" fill priority quality={90} sizes={COVER_SIZES} className={`hero-backdrop-image hero-backdrop-image--${v.theme}${stills.length === 1 ? " hero-backdrop-image--only" : ""}`} />
        ))}
        {morning && goldenHour && dusk && night && <HeroSky light={[morning, goldenHour]} dark={[dusk, night]} horizon={HORIZON} />}
      </div>
      <div className="hero-backdrop-fade" />
    </div>
  );
}
