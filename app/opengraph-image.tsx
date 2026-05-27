import { ImageResponse } from "next/og";
import { SITE_AUTHOR, SITE_ROLE } from "@/lib/config";

export const alt = `${SITE_AUTHOR} — ${SITE_ROLE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          background: "#0B0F17",
          fontFamily: "Inter, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Corner system UI decoration */}
        <div
          style={{
            position: "absolute",
            top: 28,
            right: 40,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "monospace",
            fontSize: "0.75rem",
            color: "#4B5563",
            letterSpacing: "0.05em",
          }}
        >
          <span>SYS</span>
          <span style={{ color: "#22C55E" }}>●</span>
          <span>ONLINE</span>
          <span style={{ margin: "0 8px", color: "#374151" }}>|</span>
          <span>EU / US / REMOTE</span>
        </div>

        {/* Bottom-left terminal prompt */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
            left: 40,
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "monospace",
            fontSize: "0.8125rem",
            color: "#374151",
          }}
        >
          <span style={{ color: "#38BDF8" }}>$</span>
          <span>npx mykhailo --hire</span>
          <span style={{ width: 7, height: 16, background: "#38BDF8", opacity: 0.6, borderRadius: 1 }} />
        </div>

        {/* Status badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 32,
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: 999, background: "#22C55E", boxShadow: "0 0 8px rgba(34,197,94,0.6)" }} />
          <span style={{ fontSize: "0.8125rem", color: "#22C55E", fontFamily: "monospace", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Open to contracts
          </span>
        </div>

        {/* Name */}
        <div style={{ fontSize: "3.5rem", fontWeight: 800, color: "#E5E7EB", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 12 }}>
          {SITE_AUTHOR}
        </div>

        {/* Title */}
        <div style={{ fontSize: "1.5rem", fontWeight: 600, color: "#38BDF8", letterSpacing: "-0.01em", marginBottom: 32 }}>
          {SITE_ROLE}
        </div>

        {/* Tech tags */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {["React Native", "TypeScript", "iOS", "Android", "Node.js", "WebSockets"].map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "0.8125rem",
                color: "#38BDF8",
                background: "rgba(56,189,248,0.08)",
                border: "1px solid rgba(56,189,248,0.18)",
                borderRadius: 5,
                padding: "4px 11px",
                fontFamily: "monospace",
                letterSpacing: "0.02em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
