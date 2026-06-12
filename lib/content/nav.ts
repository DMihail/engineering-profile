import { SECTIONS, type ContentSectionId } from "@/lib/content/sections";
import { TESTIMONIALS } from "@/lib/content/portfolio/testimonials";

export type NavId = ContentSectionId;

/** Page sections in nav order — testimonials omitted when empty. */
export const NAV: ContentSectionId[] = SECTIONS.filter(
  (section) => section.id !== "testimonials" || TESTIMONIALS.length > 0,
).map((section) => section.id);

export const NAV_LABELS: Record<NavId, string> = Object.fromEntries(
  SECTIONS.map((s) => [s.id, s.label]),
) as Record<NavId, string>;

export { HERO_CTA, HERO_STATS } from "@/lib/content/hero";
