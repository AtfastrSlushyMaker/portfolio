import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { SpotlightText } from "@/components/spotlight-text";

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-muted/50 mb-6">
        404
      </p>
      <h1 className="text-4xl md:text-6xl tracking-tighter font-medium mb-4">
        <SpotlightText className="text-foreground" radius={300}>
          Page not found.
        </SpotlightText>
      </h1>
      <p className="text-base text-muted max-w-md mb-10">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:opacity-80 transition-opacity pressable cursor-pointer"
      >
        <ArrowLeft weight="bold" className="w-3.5 h-3.5" />
        Back home
      </Link>
    </div>
  );
}
