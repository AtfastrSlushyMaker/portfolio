import { UiIcon } from "@/components/ui-icon";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Résumé" };
export default function CvPage() {
  return <section className="cv-page">
    <div className="cv-toolbar"><Link href="/"><UiIcon name="back" /> Back to portfolio</Link><a href="/cv.pdf" download>English PDF <UiIcon name="outward" /></a><a href="/cv-fr.pdf" download>CV français <UiIcon name="outward" /></a></div>
    <p className="project-note">If your browser does not display PDFs, use the download link above.</p>
    <iframe src="/cv.pdf" title="Malek Bsaissa résumé" />
  </section>;
}
