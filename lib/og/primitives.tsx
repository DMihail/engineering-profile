import { OG_COLORS } from "@/lib/og/constants";

export function OgGridBackground() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage:
          `linear-gradient(${OG_COLORS.grid} 1px, transparent 1px), linear-gradient(90deg, ${OG_COLORS.grid} 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }}
    />
  );
}

export function OgStatusBadge({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: 999,
          background: OG_COLORS.success,
          boxShadow: "0 0 8px rgba(34,197,94,0.6)",
        }}
      />
      <span
        style={{
          fontSize: "0.8125rem",
          color: OG_COLORS.success,
          fontFamily: "monospace",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export function OgTechTags({ tags }: { tags: readonly string[] }) {
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      {tags.map((tag) => (
        <span
          key={tag}
          style={{
            fontSize: "0.8125rem",
            color: OG_COLORS.primary,
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
  );
}

export function OgShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "72px 80px",
        background: OG_COLORS.background,
        fontFamily: "Inter, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <OgGridBackground />
      {children}
    </div>
  );
}
