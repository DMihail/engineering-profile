import { NAV, type NavId } from "@/lib/data/nav";

export const MAIN_CONTENT_ID = "main-content";
export const HERO_ID = "hero";
export const EDUCATION_ID = "education";

/** All in-page section ids rendered on `/` (single source of truth for hash links). */
export const PAGE_SECTION_IDS = [HERO_ID, ...NAV, EDUCATION_ID] as const;

export type PageSectionId = (typeof PAGE_SECTION_IDS)[number];

export const SECTION_LABELS: Record<PageSectionId, string> = {
  hero: "Home",
  impact: "About",
  projects: "Projects",
  skills: "Skills",
  experience: "Experience",
  education: "Education",
  contact: "Contact",
};

export function isPageSectionId(id: string): id is PageSectionId {
  return (PAGE_SECTION_IDS as readonly string[]).includes(id);
}

/** Root-relative hash href — resolves in IDE and works from any path. */
export function sectionHref(id: string): `/#${string}` {
  return `/#${id}`;
}

export { NAV, type NavId };
