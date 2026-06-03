import { SKILL_LAYERS } from "@/lib/content/portfolio/skills";
import { SOCIAL_LINKS } from "@/lib/content/portfolio/social-links";
import { SITE_URL } from "@/lib/content/site";

export const SEO_IDS = {
  person: `${SITE_URL}/#person`,
  website: `${SITE_URL}/#website`,
  projects: `${SITE_URL}/#projects`,
} as const;

export const SEO_AREA_SERVED = [
  "Ireland",
  "European Union",
  "United Kingdom",
  "Ukraine",
  "Remote",
] as const;

export const SEO_ADDRESS = {
  locality: "Dublin",
  country: "IE",
} as const;

/** Primary skills for Person schema — derived from portfolio data plus core keywords. */
export function buildKnowsAbout(): string[] {
  const fromSkills = SKILL_LAYERS.flatMap((layer) =>
    layer.skills.filter((skill) => skill.primary).map((skill) => skill.name),
  );

  const extras = [
    "GraphQL",
    "WebSockets",
    "Firebase Crashlytics",
    "App Store",
    "Google Play",
  ];

  return [...new Set([...fromSkills, ...extras])];
}

export function buildSameAs(): string[] {
  return SOCIAL_LINKS
    .map((link) => link.href)
    .filter((href) => href.startsWith("http"));
}

/** Stable fragment URL for a project panel on the homepage. */
export function projectFragmentId(projectId: string): string {
  return `project-${projectId}`;
}

export function projectUrl(projectId: string): string {
  return `${SITE_URL}/#${projectFragmentId(projectId)}`;
}
