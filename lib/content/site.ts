/** Site identity and marketing copy — edit here for homepage, meta tags, and OG. */

export const SITE_URL = "https://dzhezhelo.dev";
export const SITE_AUTHOR = "Mykhailo Dzhezhelo";
export const SITE_EMAIL = "dzezelomihail@gmail.com";
export const SITE_ROLE = "Mobile Engineer · React Native · Web Developer";
export const SITE_LOCATION = "Dublin, Ireland · Remote EU, UK & US";

/** One-screen hire pitch — keep short for 5–8s recruiter scan. */
export const SITE_HERO_INTRO =
  "I ship production React Native apps to the App Store and Google Play — offline-first, real-time, and native modules when the product needs them. 7+ years in software, 5+ years mobile.";

export const SITE_HERO_AVAILABILITY_LABEL = "Available";
export const SITE_HERO_AVAILABILITY_TYPES = "Full-time · contract · remote & onsite";

/** Honest English framing for Dublin / EU hiring (not inflated CEFR). */
export const SITE_ENGLISH_LEVEL = "Working professional English (B1+)";
export const SITE_ENGLISH_NOTE = "Daily standups, written async, and client calls";
export const SITE_ENGLISH_CERTIFICATE_HREF =
  "/Mykhailo_Dzhezhelo_ENGLISH_LANGUAGE_ATTENDANCE_CERTIFICATE.pdf";

export const SITE_DESCRIPTION =
  "Mobile Engineer and React Native Developer in Dublin, Ireland. 7+ years software development, 5+ years shipping iOS and Android apps to App Store and Google Play. Firebase, REST APIs, GraphQL, WebSockets, offline-first, healthcare, auctions, and workforce apps. Open to roles in Ireland, EU, UK, and US remote.";

export const SITE_SHORT_DESCRIPTION =
  "Mobile Engineer · React Native in Dublin — production iOS & Android apps, Firebase, and real-time features.";

export const SITE_EDUCATION_FOCUS = "Systems Analysis";

export { CV_FILES } from "@/lib/content/cv";

export const SITE_OG = {
  statusBadge: "Open to contracts",
  regionLine: "EU / US / REMOTE",
  techTags: ["React Native", "TypeScript", "iOS", "Android", "Node.js", "WebSockets"],
} as const;

export function mailtoUrl(subject = "Role inquiry"): string {
  return `mailto:${SITE_EMAIL}?subject=${encodeURIComponent(subject)}`;
}
