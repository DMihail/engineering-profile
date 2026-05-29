export const SITE_URL = "https://dzhezhelo.dev";
export const SITE_AUTHOR = "Mykhailo Dzhezhelo";
export const SITE_EMAIL = "dzhezhelomikhail@gmail.com";
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
export const SITE_ROLE = "React Native & Mobile Systems Engineer";
export const SITE_DESCRIPTION =
  "React Native engineer specializing in realtime systems, native integrations, performance optimization, and cross-platform mobile architecture.";
export const SITE_SHORT_DESCRIPTION = SITE_DESCRIPTION;
