import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SITE_AUTHOR } from "@/lib/config";

export const metadata: Metadata = {
  title: "Page not found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="bg-background min-h-screen flex items-center justify-center relative overflow-hidden font-sans">
      <div className="absolute inset-0 pointer-events-none bg-grid" aria-hidden />
      <div className="absolute inset-0 pointer-events-none bg-vignette-sm" aria-hidden />

      <section className="relative text-center px-6 fade-up max-w-lg">
        <p className="font-sans text-primary font-extrabold leading-none tracking-[-0.06em] text-404-display text-glow-primary mb-4">
          404
        </p>

        <h1 className="font-sans text-foreground font-bold mb-3 tracking-[-0.025em] text-404-title text-balance">
          Page not found
        </h1>

        <p className="text-sm text-muted-foreground mb-8 leading-looser text-pretty">
          This URL is not part of the portfolio. Check the address or return to the home page.
        </p>

        <Link href="/" className="btn-primary no-underline">
          <ArrowLeft size={14} aria-hidden />
          Back to home
        </Link>

        <p className="mono-sm text-text-faint mt-10">
          md://portfolio · {SITE_AUTHOR}
        </p>
      </section>
    </main>
  );
}
