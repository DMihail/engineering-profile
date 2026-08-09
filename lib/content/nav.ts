import { SECTIONS, type ContentSectionId } from "@/lib/content/sections";

export type NavId = ContentSectionId;

/** Page sections in nav order. */
export const NAV: ContentSectionId[] = SECTIONS.map((section) => section.id);

export const NAV_LABELS: Record<NavId, string> = Object.fromEntries(
  SECTIONS.map((s) => [s.id, s.label]),
) as Record<NavId, string>;
