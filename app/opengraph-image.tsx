import { ImageResponse } from "next/og";
import { SITE_AUTHOR, SITE_ROLE, SITE_SHORT_DESCRIPTION } from "@/lib/config";

export const alt = `${SITE_AUTHOR} — ${SITE_ROLE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const s = {
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "72px 80px",
    background: "#0B0F17",
    fontFamily: "Inter, sans-serif",
  },
  header: { display: "flex", alignItems: "center", gap: 24, marginBottom: 40 },
  statusDot: { width: 8, height: 8, borderRadius: 999, background: "#22C55E" },
  statusLabel: { fontSize: 18, color: "#22C55E", fontFamily: "monospace", letterSpacing: "0.06em" },
  name: { fontSize: 64, fontWeight: 800, color: "#E5E7EB", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 12 },
  role: { fontSize: 28, fontWeight: 600, color: "#38BDF8", letterSpacing: "-0.01em", marginBottom: 24 },
  description: { fontSize: 20, color: "#9CA3AF", lineHeight: 1.5, maxWidth: 700 },
  tags: { display: "flex", gap: 12, marginTop: 40, flexWrap: "wrap" },
  tag: {
    fontSize: 14,
    color: "#38BDF8",
    background: "rgba(56,189,248,0.08)",
    border: "1px solid rgba(56,189,248,0.16)",
    borderRadius: 6,
    padding: "4px 12px",
    fontFamily: "monospace",
  },
} as const;

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={s.root}>
        <div style={s.header}>
          <svg width="64" height="64" viewBox="0 0 100 100" fill="none">
            <rect width="100" height="100" rx="22" fill="#111827" />
            <path
              d="M 50,16 A 40,40 0 1 1 11,46 C 13,38 14,17 14,16 C 14,17 25,57 34,64 C 38,68 50,29 50,16"
              stroke="#38BDF8"
              strokeWidth={6}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <line x1="50" y1="16" x2="50" y2="96" stroke="#38BDF8" strokeWidth={6} strokeLinecap="round" />
          </svg>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={s.statusDot} />
            <span style={s.statusLabel}>OPEN TO CONTRACTS</span>
          </div>
        </div>

        <div style={s.name}>{SITE_AUTHOR}</div>
        <div style={s.role}>{SITE_ROLE}</div>
        <div style={s.description}>{SITE_SHORT_DESCRIPTION}</div>

        <div style={s.tags}>
          {["React Native", "TypeScript", "iOS", "Android", "Node.js", "Firebase"].map((tag) => (
            <span key={tag} style={s.tag}>{tag}</span>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
