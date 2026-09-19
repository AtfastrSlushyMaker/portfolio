import { UiIcon } from "@/components/ui-icon";
import Link from "next/link";
export default function NotFound() {
  return <section className="not-found"><p>404</p><h1>A loose thread.</h1><p>This page could not be found.</p><Link href="/"><UiIcon name="back" /> Back to the portfolio</Link></section>;
}
