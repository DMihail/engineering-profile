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
    heading: "What I deliver",
    comment:
      "Production mobile apps for iOS and Android — shipped to the stores, maintained in production, and built with product teams.",
  },
  {
    id: "projects",
    n: "02",
    label: "Projects",
    heading: "Production work",
    comment:
      "Healthcare, auctions, workforce, media, and education — React Native, Firebase, REST APIs, and real-time features.",
  },
  {
    id: "skills",
    n: "03",
    label: "Skills",
    heading: "Stack & tools",
    comment: "Mobile-first stack aligned with production delivery — primary tools highlighted.",
  },
  {
    id: "experience",
    n: "04",
    label: "Experience",
    heading: "Work history",
    comment: "7+ years software development — 5+ years focused on React Native and mobile delivery.",
  },
  {
    id: "education",
    n: "05",
    label: "Education",
    heading: "Education",
    comment: "Systems Analysis — Bachelor's and Master's degrees from Dnipro National University.",
  },
  {
    id: "contact",
    n: "06",
    label: "Contact",
    heading: "Contact",
    comment:
      "Hiring for React Native or Mobile Engineer? Share the role, stack, and timeline — I reply within 24 hours.",
  },
];

export function getSectionMeta(id: ContentSectionId): SectionMeta {
  const match = SECTIONS.find((section) => section.id === id);
  if (!match) {
    throw new Error(`Unknown section id: ${id}`);
  }
  return match;
}
