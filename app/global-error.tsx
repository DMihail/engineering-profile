"use client";

import "./globals.css";
import { fontBodyClassName, fontVariableClassName } from "@/lib/fonts";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className={fontVariableClassName}>
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className={`${fontBodyClassName} min-h-full flex items-center justify-center bg-background text-foreground`}>
        <div className="text-center p-8">
          <p className="mono-label mb-3">{"// runtime_error"}</p>
          <h1 className="text-2xl font-bold mb-2 text-balance">Something went wrong</h1>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto text-pretty">
            {error.digest ? `Error ID: ${error.digest}` : "An unexpected error occurred."}
          </p>
          <button type="button" onClick={reset} className="btn-primary">
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
