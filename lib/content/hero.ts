import { RESUME_HREF } from "@/lib/content/cv";

export const HERO_CTA = {
  // HTML resume is source of truth; ATS PDFs stay in the contact aside.
  resume: RESUME_HREF,
  github: "https://github.com/DMihail",
  linkedin: "https://www.linkedin.com/in/mihail-dzhezhelo-27a41114a/",
  contact: "/#contact",
} as const;

export const HERO_STATS = [
  { value: "7+", label: "Years shipping software" },
  { value: "5+", label: "Years React Native" },
  { value: "2 stores", label: "App Store & Google Play" },
];
