"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <head>
        <title>Error — Mykhailo Dzhezhelo</title>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body style={{ background: "#0B0F17", color: "#E5E7EB", fontFamily: "system-ui, sans-serif", margin: 0, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <main style={{ textAlign: "center", padding: "2rem" }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#8891A0", marginBottom: "0.75rem" }}>
            {"// runtime_error"}
          </p>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: "0.875rem", color: "#8891A0", marginBottom: "1.5rem", maxWidth: "25rem" }} role="alert">
            {error.digest ? `Error ID: ${error.digest}` : "An unexpected error occurred."}
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "0.625rem",
              background: "#38BDF8",
              color: "#0B0F17",
              fontSize: "0.875rem",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
