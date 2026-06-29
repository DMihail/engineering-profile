/** Site identity and marketing copy — edit here for homepage, meta tags, and OG. */

export const SITE_URL = "https://dzhezhelo.dev";
export const SITE_AUTHOR = "Mykhailo Dzhezhelo";
export const SITE_EMAIL = "dzezelomihail@gmail.com";
export const SITE_ROLE = "Mobile Engineer · React Native · Web Developer";
export const SITE_ROLE_SEO = "Mobile Engineer | React Native | Web Developer";
export const SITE_LOCATION = "Dublin, Ireland · Remote EU, UK & US";

export const SITE_HERO_INTRO =
  "7+ years of software development experience, including 5+ years building production mobile applications with React Native. App Store and Google Play releases, Firebase, REST APIs, GraphQL, WebSockets, offline-first apps, and React web dashboards when the product needs them.";

export const SITE_HERO_AVAILABILITY_LABEL = "Available";
export const SITE_HERO_AVAILABILITY_TYPES = "Full-time · contract · remote & onsite";

/** @deprecated Use SITE_HERO_AVAILABILITY_LABEL + SITE_HERO_AVAILABILITY_TYPES */
export const SITE_HERO_AVAILABILITY = `${SITE_HERO_AVAILABILITY_LABEL} · ${SITE_HERO_AVAILABILITY_TYPES}`;

export const SITE_DESCRIPTION =
  "Mobile Engineer and React Native Developer in Dublin, Ireland. 7+ years software development, 5+ years shipping iOS and Android apps to App Store and Google Play. Firebase, REST APIs, GraphQL, WebSockets, offline-first, healthcare, auctions, and workforce apps. Open to roles in Ireland, EU, UK, and US remote.";

export const SITE_SHORT_DESCRIPTION =
  "Mobile Engineer · React Native in Dublin — production iOS & Android apps, Firebase, and real-time features.";

export const SITE_EDUCATION_FOCUS = "Systems Analysis";

export const CV_FILES = [
  "/Mykhailo_Dzhezhelo_CV_Ireland.pdf",
  "/Mykhailo_Dzhezhelo_CV_UK.pdf",
] as const;

export const SITE_OG = {
  statusBadge: "Open to contracts",
  regionLine: "EU / US / REMOTE",
  techTags: ["React Native", "TypeScript", "iOS", "Android", "Node.js", "WebSockets"],
} as const;

export function mailtoUrl(subject = "Role inquiry"): string {
  return `mailto:${SITE_EMAIL}?subject=${encodeURIComponent(subject)}`;
}
