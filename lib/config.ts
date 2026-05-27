export const SITE_URL = "https://dzhezhelo.dev";
export const SITE_AUTHOR = "Mykhailo Dzhezhelo";
export const SITE_EMAIL = "dzhezhelomikhail@gmail.com";

export function mailtoUrl(subject = "Project Inquiry"): string {
  return `mailto:${SITE_EMAIL}?subject=${encodeURIComponent(subject)}`;
}
export const SITE_ROLE = "React Native & Mobile Systems Engineer";
export const SITE_DESCRIPTION =
  "React Native engineer specializing in realtime systems, native integrations, performance optimization, and cross-platform mobile architecture.";
export const SITE_SHORT_DESCRIPTION = SITE_DESCRIPTION;
