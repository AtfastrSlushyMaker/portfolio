import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { COVER_SIZES } from "./hero-backdrop";

const findFile = (dir: string, name: string) =>
  ["jpg", "jpeg", "png", "webp"].map(ext => `${name}.${ext}`).find(file => fs.existsSync(path.join(process.cwd(), "public", "scenes", dir, file)));

/**
 * Decorative photograph from /public/scenes/<name>/ with a day (light mode) and night (dark mode) version.
 * Renders nothing until at least one file exists; a single file is used for both themes.
 */
export function Scene({ name, className, sizes = COVER_SIZES }: { name: string; className: string; sizes?: string }) {
  const day = findFile(name, "day");
  const night = findFile(name, "night");
  if (!day && !night) return null;
  const only = !day || !night;
  return (
    <div className={`scene ${className}`} aria-hidden="true">
      {day && <Image src={`/scenes/${name}/${day}`} alt="" fill quality={90} sizes={sizes} className={`scene-image scene-image--light${only ? " scene-image--only" : ""}`} />}
      {night && <Image src={`/scenes/${name}/${night}`} alt="" fill quality={90} sizes={sizes} className={`scene-image scene-image--dark${only ? " scene-image--only" : ""}`} />}
    </div>
  );
}
