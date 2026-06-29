"use client";

import { useEffect } from "react";
import Link from "next/link";
import { SkipLink } from "@/components/layout/skip-link";
import { SubpageHeader } from "@/components/layout/subpage-header";
import { UI_LABELS } from "@/lib/content/ui-labels";
import { MAIN_CONTENT_ID } from "@/lib/section-ids";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[ErrorBoundary]", error);
  }, [error]);

  return (
    <>
      <SkipLink />
      <SubpageHeader />
      <main
        id={MAIN_CONTENT_ID}
        tabIndex={-1}
        className="min-h-[60vh] flex items-center justify-center px-4 bg-background font-sans"
      >
        <section className="text-center max-w-md" aria-labelledby="error-title">
          <p className="mono-label mb-3">{UI_LABELS.errorPage.boundaryLabel}</p>
          <h1 id="error-title" className="font-sans text-2xl font-bold text-foreground mb-2">
            {UI_LABELS.errorPage.title}
          </h1>
          <p className="text-sm text-muted-foreground mb-6" role="alert">
            {error.message || UI_LABELS.errorPage.fallbackMessage}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" onClick={reset} className="btn-primary">
              {UI_LABELS.errorPage.tryAgain}
            </button>
            <Link href="/" className="btn-outline no-underline">
              {UI_LABELS.errorPage.backHome}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
