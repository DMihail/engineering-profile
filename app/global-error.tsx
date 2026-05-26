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
      <body style={{ background: "#0B0F17", color: "#E5E7EB", fontFamily: "system-ui, sans-serif", margin: 0, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p style={{ fontFamily: "monospace", fontSize: "12px", color: "#8891A0", marginBottom: "12px" }}>
            {"// runtime_error"}
          </p>
          <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: "14px", color: "#8891A0", marginBottom: "24px", maxWidth: "400px" }}>
            {error.digest ? `Error ID: ${error.digest}` : "An unexpected error occurred."}
          </p>
          <button
            onClick={reset}
            style={{
              padding: "12px 24px",
              borderRadius: "10px",
              background: "#38BDF8",
              color: "#0B0F17",
              fontSize: "14px",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
