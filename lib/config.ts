export const SITE_URL = "https://dzhezhelo.dev";
export const SITE_AUTHOR = "Mykhailo Dzhezhelo";
export const SITE_EMAIL = "dzezelomihail@gmail.com";
export const SITE_ROLE = "Senior React Native & Full-Stack Developer";
export const SITE_LOCATION = "Ireland · Remote EU & UK";
export const SITE_WORK_AUTHORIZATION =
  "Eligible to work in Ireland · open to onsite and remote across EU & UK";
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
  "Senior React Native and full-stack developer in Dublin. Expo apps for iOS and Android, React and Next.js web, Node.js APIs, and Firebase. Six years of App Store and Google Play releases. Eligible to work in Ireland — open to remote and onsite roles in EU, UK, and US time zones.";

export const SITE_SHORT_DESCRIPTION =
  "Senior Expo & React Native developer in Dublin — mobile, web, and Node.js in production.";
