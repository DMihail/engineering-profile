import { NAV, NAV_LABELS } from "@/lib/data/nav";

export const MAIN_CONTENT_ID = "main-content";
export const HERO_ID = "hero";
export const PAGE_SECTION_IDS = [HERO_ID, ...NAV] as const;

export type PageSectionId = (typeof PAGE_SECTION_IDS)[number];

export const SECTION_LABELS: Record<PageSectionId, string> = {
  hero: "Home",
  ...NAV_LABELS,
};

export function isPageSectionId(id: string): id is PageSectionId {
  return (PAGE_SECTION_IDS as readonly string[]).includes(id);
}

export function isProjectFragmentId(id: string): boolean {
  return id.startsWith("project-");
}

/** Section or deep-linked project panel on the homepage. */
export function isHomeScrollTargetId(id: string): boolean {
  return isPageSectionId(id) || isProjectFragmentId(id);
}

/** Root-relative hash href — resolves in IDE and works from any path. */
export function sectionHref(id: string): `/#${string}` {
  return `/#${id}`;
}

/** Deep link to a project panel on the homepage. */
export function projectHref(projectId: string): `/#${string}` {
  return `/#project-${projectId}`;
}
