import { CV_DOWNLOADS } from "@/lib/content/cv";

export const HERO_CTA = {
  // SSR-stable Ireland/intl PDF. Region-specific file is offered in the contact sidebar.
  cv: CV_DOWNLOADS.intl.file,
  github: "https://github.com/DMihail",
  linkedin: "https://www.linkedin.com/in/mihail-dzhezhelo-27a41114a/",
  contact: "/#contact",
} as const;

export const HERO_STATS = [
  { value: "7+", label: "Years shipping software" },
  { value: "5+", label: "Years React Native" },
  { value: "2 stores", label: "App Store & Google Play" },
];
