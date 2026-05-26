import { T } from "./tokens";

export function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span style={{ fontFamily: T.mono, fontSize: "10px", letterSpacing: "0.15em", color: T.blue, textTransform: "uppercase" as const }}>
        {n} / {label}
      </span>
      <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
    </div>
  );
}

export function Chip({ label, variant = "default" }: { label: string; variant?: "default" | "blue" | "green" }) {
  const styles: Record<string, React.CSSProperties> = {
    default: { color: T.d,     background: "rgba(255,255,255,0.04)", border: `1px solid ${T.bd}` },
    blue:    { color: T.blue,  background: "rgba(56,189,248,0.08)",  border: "1px solid rgba(56,189,248,0.16)" },
    green:   { color: T.green, background: "rgba(34,197,94,0.08)",   border: "1px solid rgba(34,197,94,0.14)" },
  };
  return (
    <span style={{ fontFamily: T.mono, fontSize: "10px", padding: "2px 8px", borderRadius: "4px", whiteSpace: "nowrap" as const, ...styles[variant] }}>
      {label}
    </span>
  );
}
