export const NAV = ["impact", "projects", "skills", "experience", "contact"] as const;

export type NavId = (typeof NAV)[number];

export const NAV_LABELS: Record<NavId, string> = {
  impact: "What I do",
  projects: "Projects",
  skills: "Skills",
  experience: "Experience",
  contact: "Contact",
};

export const HERO_CTA = {
  cv: "/Mykhailo_Dzhezhelo_CV_Ireland.pdf",
  github: "https://github.com/DMihail",
  linkedin: "https://www.linkedin.com/in/mihail-dzhezhelo-27a41114a/",
  contact: "/#contact",
} as const;

export const HERO_STATS = [
  { value: "6+", label: "Years of experience" },
  { value: "20+", label: "Projects delivered" },
  { value: "4.8★", label: "App Store rating" },
];
