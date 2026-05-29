import { EDUCATION, SKILL_LAYERS, XP_ENTRIES } from "@/lib/data";
import {
  SITE_AUTHOR,
  SITE_EMAIL,
  SITE_ROLE,
} from "@/lib/config";
import { phoneForRegion, type ContactRegion } from "@/lib/contact-region";
import type { SkillLayer } from "@/lib/types";

export type ResumeVariant = "ireland" | "ua";

const RESUME_LINKS = {
  linkedin: "https://www.linkedin.com/in/mihail-dzhezhelo-27a41114a/",
  github: "https://github.com/DMihail",
  website: "https://dzhezhelo.dev",
} as const;

export interface ResumeContact {
  email: string;
  phone: string;
  phoneTel: string;
  linkedin: string;
  linkedinLabel: string;
  github: string;
  githubLabel: string;
  website: string;
}

export interface ResumeVariantContent {
  locationLine: string;
  authorizationLine: string;
  summary: string;
}

const VARIANT_CONTENT: Record<ResumeVariant, ResumeVariantContent> = {
  ireland: {
    locationLine: "Dublin, Ireland · Remote EU & UK",
    authorizationLine: "Eligible to work in Ireland · open to onsite and remote across EU & UK",
    summary:
      "Senior React Native and full-stack developer with six years shipping production mobile and web products. " +
      "Expo and React Native for iOS and Android, React with Material UI for web, Node.js APIs, and Firebase in production. " +
      "Track record of App Store and Google Play releases, live WebSocket features under load, and Jest/Detox coverage on critical paths.",
  },
  ua: {
    locationLine: "Ukraine · Remote EU & international",
    authorizationLine: "Open to remote and contract roles across EU and international time zones",
    summary:
      "Senior React Native and full-stack developer with six years delivering mobile and web products for EU and international clients. " +
      "Expo/React Native for iOS and Android, React and Next.js for web, Node.js backends, and Firebase integrations. " +
      "Experienced with store releases, realtime bidding systems, and test automation on production codebases.",
  },
};

export function parseResumeVariant(value: string | undefined): ResumeVariant {
  if (value === "ua" || value === "uk") return "ua";
  return "ireland";
}

export function resolveResumeVariant(
  queryVariant: string | undefined,
  region: ContactRegion,
): ResumeVariant {
  if (queryVariant !== undefined) {
    return parseResumeVariant(queryVariant);
  }
  return region === "ua" ? "ua" : "ireland";
}

export function resumePath(variant: ResumeVariant): string {
  return variant === "ireland" ? "/resume" : "/resume?variant=ua";
}

export function getResumeContact(variant: ResumeVariant): ResumeContact {
  const phone = phoneForRegion(variant === "ua" ? "ua" : "intl");

  return {
    email: SITE_EMAIL,
    phone: phone.display,
    phoneTel: phone.e164,
    linkedin: RESUME_LINKS.linkedin,
    linkedinLabel: "linkedin.com/in/mihail-dzhezhelo",
    github: RESUME_LINKS.github,
    githubLabel: "github.com/DMihail",
    website: RESUME_LINKS.website,
  };
}

export function getResumeVariantContent(variant: ResumeVariant): ResumeVariantContent {
  return VARIANT_CONTENT[variant];
}

export function getResumeSkillGroups(): Array<{ label: string; skills: string }> {
  return SKILL_LAYERS.map((layer: SkillLayer) => ({
    label: skillGroupLabel(layer),
    skills: layer.skills.map((skill) => skill.name).join(", "),
  }));
}

function skillGroupLabel(layer: SkillLayer): string {
  const [head] = layer.layer.split("·");
  return head.trim();
}

export function getResumeExperience() {
  return XP_ENTRIES;
}

export function getResumeEducation() {
  return EDUCATION;
}

export function getResumeHeading() {
  return {
    name: SITE_AUTHOR,
    role: SITE_ROLE,
  };
}
