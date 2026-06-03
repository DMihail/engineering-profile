import { SECTIONS, type ContentSectionId } from "@/lib/content/sections";
import { CV_FILES } from "@/lib/content/site";

export const NAV: ContentSectionId[] = SECTIONS.map((s) => s.id);

export type NavId = ContentSectionId;

export const NAV_LABELS: Record<NavId, string> = Object.fromEntries(
  SECTIONS.map((s) => [s.id, s.label]),
) as Record<NavId, string>;

export const HERO_CTA = {
  cv: CV_FILES[0],
  github: "https://github.com/DMihail",
  linkedin: "https://www.linkedin.com/in/mihail-dzhezhelo-27a41114a/",
  contact: "/#contact",
} as const;

export const HERO_STATS = [
  { value: "7+", label: "Years software development" },
  { value: "5+", label: "Years React Native" },
  { value: "Stores", label: "App Store & Google Play" },
];
