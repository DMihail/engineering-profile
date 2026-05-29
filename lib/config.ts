export const SITE_URL = "https://dzhezhelo.dev";
export const SITE_AUTHOR = "Mykhailo Dzhezhelo";
export const SITE_EMAIL = "dzhezhelomikhail@gmail.com";
export const SITE_ROLE = "React Native & Full-Stack Developer";
export const SITE_LOCATION = "Ireland · Remote EU & UK";
export const SITE_OG_IMAGE_PATH = "/opengraph-image";
/** Square image for Person schema. Override with `/profile.jpg` when a real photo is in public/. */
export const SITE_PROFILE_IMAGE_PATH =
  process.env.NEXT_PUBLIC_PROFILE_IMAGE_PATH ?? "/profile-image";
export const SITE_LAST_MODIFIED = process.env.SITE_LAST_MODIFIED ?? "2026-05-27";

export const CV_FILES = [
  "/Mykhailo_Dzhezhelo_CV_Ireland.pdf",
  "/Mykhailo_Dzhezhelo_CV_UK.pdf",
] as const;

export function mailtoUrl(subject = "Project Inquiry"): string {
  return `mailto:${SITE_EMAIL}?subject=${encodeURIComponent(subject)}`;
}
export const SITE_DESCRIPTION =
  `React Native and full-stack developer in Dublin. Expo apps for iOS and Android, web with React and Next.js, Node.js APIs, and Firebase. Six years of App Store and Google Play releases. Open to remote and onsite roles in EU, UK, and US time zones.`;
export const SITE_SHORT_DESCRIPTION =
  `Expo & React Native full-stack developer in Dublin — mobile, web, and Node.js.`;
