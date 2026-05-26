export function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="mono-sm tracking-[0.15em] uppercase text-primary">
        {n} / {label}
      </span>
      <div className="flex-1 h-px bg-white/5" />
    </div>
  );
}

export function Chip({ label, variant = "default" }: { label: string; variant?: "default" | "blue" | "green" }) {
  const variantClass = variant === "blue" ? "chip-blue" : variant === "green" ? "chip-green" : "chip-default";
  return (
    <span className={`chip ${variantClass}`}>
      {label}
    </span>
  );
}
