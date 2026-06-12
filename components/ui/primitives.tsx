import type { ContentSectionId } from "@/lib/content/sections";
import { getSectionMeta } from "@/lib/content/sections";

export function sectionHeadingId(sectionId: ContentSectionId): string {
  return `${sectionId}-heading`;
}

export function SectionLabelRow({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5" aria-hidden="true">
      <span className="mono-sm tracking-[0.15em] uppercase text-primary">
        {n} / {label}
      </span>
      <span className="flex-1 h-px bg-border" />
    </div>
  );
}

function SectionLabel({ sectionId }: { sectionId: ContentSectionId }) {
  const { n, label } = getSectionMeta(sectionId);

  return <SectionLabelRow n={n} label={label} />;
}

export function Chip({ label, variant = "default" }: { label: string; variant?: "default" | "blue" }) {
  return (
    <span className={`chip ${variant === "blue" ? "chip-blue" : "chip-default"}`}>
      {label}
    </span>
  );
}

export function SectionHeader({
  sectionId,
  headingClassName = "",
  commentClassName = "mb-10",
}: {
  sectionId: ContentSectionId;
  headingClassName?: string;
  commentClassName?: string;
}) {
  const { heading, comment } = getSectionMeta(sectionId);

  return (
    <>
      <SectionLabel sectionId={sectionId} />
      <h2 id={sectionHeadingId(sectionId)} className={`section-heading mb-2 ${headingClassName}`.trim()}>
        {heading}
      </h2>
      {comment && <p className={`section-comment max-w-copy ${commentClassName}`.trim()}>{comment}</p>}
    </>
  );
}
