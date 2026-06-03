export const SITE_URL = "https://dzhezhelo.dev";
export const SITE_AUTHOR = "Mykhailo Dzhezhelo";
export const SITE_EMAIL = "dzezelomihail@gmail.com";
export const SITE_ROLE = "Mobile Engineer · React Native · Web Developer";
export const SITE_LOCATION = "Dublin, Ireland · Remote EU, UK & US";
export const SITE_HERO_INTRO =
  "7+ years of software development experience, including 5+ years building production mobile applications with React Native. App Store and Google Play releases, Firebase, REST APIs, GraphQL, WebSockets, offline-first apps, and React web dashboards when the product needs them.";
export const SITE_CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";
export const SITE_OG_IMAGE_PATH = "/opengraph-image";
/** Square image for Person schema. Override with `/profile.jpg` when a real photo is in public/. */
export const SITE_PROFILE_IMAGE_PATH =
  process.env.NEXT_PUBLIC_PROFILE_IMAGE_PATH ?? "/profile-image";
export const SITE_LAST_MODIFIED = process.env.SITE_LAST_MODIFIED ?? "2026-05-27";

export const CV_FILES = [
  "/Mykhailo_Dzhezhelo_CV_Ireland.pdf",
  "/Mykhailo_Dzhezhelo_CV_UK.pdf",
] as const;

export function mailtoUrl(subject = "Role inquiry"): string {
  return `mailto:${SITE_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

export const SITE_DESCRIPTION =
  "Mobile Engineer and React Native Developer in Dublin, Ireland. 7+ years software development, 5+ years shipping iOS and Android apps to App Store and Google Play. Firebase, REST APIs, GraphQL, WebSockets, offline-first, healthcare, auctions, and workforce apps. Open to roles in Ireland, EU, UK, and US remote.";

export const SITE_SHORT_DESCRIPTION =
  "Mobile Engineer · React Native in Dublin — production iOS & Android apps, Firebase, and real-time features.";
