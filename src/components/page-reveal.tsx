"use client";

import { useLayoutEffect, useState } from "react";
import { initSound } from "@/lib/sound";

export function PageReveal() {
  const [phase, setPhase] = useState<"covered" | "out" | "done">("covered");

  useLayoutEffect(() => {
    initSound();
    setTimeout(() => setPhase("out"), 100);
    setTimeout(() => setPhase("done"), 900);
  }, []);

  if (phase === "done") return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      <div
        className="page-reveal-mask"
        data-reveal={phase}
      />
    </div>
  );
}
