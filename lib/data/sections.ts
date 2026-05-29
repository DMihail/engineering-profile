export interface SectionMeta {
  id: ContentSectionId;
  n: string;
  label: string;
  heading: string;
  comment?: string;
}

export type ContentSectionId =
  | "impact"
  | "projects"
  | "skills"
  | "experience"
  | "education"
  | "contact";

/** Content sections in page order — single source for labels and numbering. */
export const SECTIONS: SectionMeta[] = [
  {
    id: "impact",
    n: "01",
    label: "About",
    heading: "What I build",
    comment: "End-to-end delivery: mobile in the stores, web in production, APIs behind both — on agency teams and my own apps.",
  },
  {
    id: "projects",
    n: "02",
    label: "Projects",
    heading: "Selected work",
    comment: "Production client work and personal projects — shipped auction apps and a focus app in active development.",
  },
  {
    id: "skills",
    n: "03",
    label: "Skills",
    heading: "Stack & tools",
    comment: "What I reach for daily — primary tools highlighted.",
  },
  {
    id: "experience",
    n: "04",
    label: "Experience",
    heading: "Work history",
    comment: "Six years shipping React Native, web, and Node.js — client teams and owned products.",
  },
  {
    id: "education",
    n: "05",
    label: "Education",
    heading: "Education",
    comment: "Systems analysis — analytical foundation for product and backend work.",
  },
  {
    id: "contact",
    n: "06",
    label: "Contact",
    heading: "Contact",
    comment: "Hiring for React Native or full-stack? Share the role, stack, and timeline — I reply within 24 hours.",
  },
];

const SECTION_BY_ID = Object.fromEntries(SECTIONS.map((s) => [s.id, s])) as Record<
  ContentSectionId,
  SectionMeta
>;

export function getSectionMeta(id: ContentSectionId): SectionMeta {
  return SECTION_BY_ID[id];
}
