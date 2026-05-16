import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { ViewTransition } from "react";

export const metadata: Metadata = {
  title: "CV — Malek Bsaissa",
};

export default function CvPage() {
  return (
    <ViewTransition>
      <Link
        href="/"
        className="fixed top-20 left-6 z-50 inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors pressable cursor-pointer bg-warm-paper/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-stone-border/50"
      >
        <ArrowLeft weight="bold" className="w-3.5 h-3.5" />
        Back
      </Link>
      <div className="fixed inset-0 top-16 z-0">
        <iframe
          src="/cv.pdf"
          className="w-full h-full border-0"
          title="Malek Bsaissa — CV"
        />
      </div>
    </ViewTransition>
  );
}
