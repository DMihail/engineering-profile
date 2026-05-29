export const SITE_URL = "https://dzhezhelo.dev";
export const SITE_AUTHOR = "Mykhailo Dzhezhelo";
export const SITE_EMAIL = "dzhezhelomikhail@gmail.com";
export const SITE_ROLE = "React Native & Mobile Systems Engineer";
export const SITE_LOCATION = "Dublin, Ireland · Remote EU & UK";
export const SITE_OG_IMAGE_PATH = "/opengraph-image";
export const SITE_LAST_MODIFIED = process.env.SITE_LAST_MODIFIED ?? "2026-05-27";

export const CV_FILES = [
  "/Mykhailo_Dzhezhelo_CV_Ireland.pdf",
  "/Mykhailo_Dzhezhelo_CV_UK.pdf",
] as const;

export function mailtoUrl(subject = "Project Inquiry"): string {
  return `mailto:${SITE_EMAIL}?subject=${encodeURIComponent(subject)}`;
}
export const SITE_DESCRIPTION =
  `React Native engineer (${SITE_LOCATION}) — realtime systems, native integrations, performance optimization, and cross-platform mobile architecture. Available for remote and onsite roles.`;
export const SITE_SHORT_DESCRIPTION =
  `React Native engineer — ${SITE_LOCATION}. Mobile apps, realtime systems, and native integrations.`;
