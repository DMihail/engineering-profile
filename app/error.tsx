"use client";

import { useEffect } from "react";

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
    <main className="min-h-[60vh] flex items-center justify-center px-4">
      <section className="text-center max-w-md">
        <p className="mono-label mb-3">{"// error_boundary"}</p>
        <h1 className="font-sans text-2xl font-bold text-foreground mb-2">
          Something went wrong
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <button type="button" onClick={reset} className="btn-primary">
          Try again
        </button>
      </section>
    </main>
  );
}
