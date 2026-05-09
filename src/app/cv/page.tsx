import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV — Malek Bsaissa",
};

export default function CvPage() {
  return (
    <iframe
      src="/cv.pdf"
      className="fixed inset-0 w-full h-full border-0"
      title="Malek Bsaissa — CV"
    />
  );
}
