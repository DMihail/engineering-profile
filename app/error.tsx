"use client";

import { useEffect } from "react";
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
      <a href={`#${MAIN_CONTENT_ID}`} className="skip-link">
        Skip to content
      </a>
      <main id={MAIN_CONTENT_ID} tabIndex={-1} className="min-h-[60vh] flex items-center justify-center px-4">
        <section className="text-center max-w-md">
          <p className="mono-label mb-3">{"// error_boundary"}</p>
          <h1 className="font-sans text-2xl font-bold text-foreground mb-2">
            Something went wrong
          </h1>
          <p className="text-sm text-muted-foreground mb-6" role="alert">
            {error.message || "An unexpected error occurred. Please try again."}
          </p>
          <button type="button" onClick={reset} className="btn-primary">
            Try again
          </button>
        </section>
      </main>
    </>
  );
}
