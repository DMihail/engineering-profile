import {
  RESUME_EDUCATION,
  RESUME_EXPERIENCE,
  RESUME_LANGUAGES,
  RESUME_PROJECTS,
  RESUME_ROLE,
  RESUME_SKILL_GROUPS,
  RESUME_SUMMARY,
} from "@/lib/content/resume";
import type {
  ResumeEducationEntry,
  ResumeExperienceEntry,
  ResumeLanguageEntry,
  ResumeProjectEntry,
  ResumeSkillGroup,
} from "@/lib/content/resume-types";
import { SITE_AUTHOR, SITE_EMAIL } from "@/lib/config";
import { phoneForRegion, type ContactRegion } from "@/lib/contact-region";

export type ResumeVariant = "ireland" | "ua";

const RESUME_LINKS = {
  linkedin: "https://www.linkedin.com/in/mihail-dzhezhelo-27a41114a/",
  website: "https://dzhezhelo.dev",
} as const;

export interface ResumeContact {
  email: string;
  phone: string;
  phoneTel: string;
  linkedin: string;
  linkedinLabel: string;
  website: string;
}

export interface ResumeVariantContent {
  locationLine: string;
  summary: string;
}

const VARIANT_CONTENT: Record<ResumeVariant, ResumeVariantContent> = {
  ireland: {
    locationLine: "Dublin, Ireland",
    summary: RESUME_SUMMARY.ireland,
  },
  ua: {
    locationLine: "Dublin, Ireland",
    summary: RESUME_SUMMARY.ua,
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
    linkedinLabel: "linkedin.com/in/mihail-dzhezhelo-27a41114a",
    website: RESUME_LINKS.website,
  };
}

export function getResumeVariantContent(variant: ResumeVariant): ResumeVariantContent {
  return VARIANT_CONTENT[variant];
}

export function getResumeSkillGroups(): ResumeSkillGroup[] {
  return RESUME_SKILL_GROUPS;
}

export function getResumeExperience(): ResumeExperienceEntry[] {
  return RESUME_EXPERIENCE;
}

export function getResumeProjects(): ResumeProjectEntry[] {
  return RESUME_PROJECTS;
}

export function getResumeEducation(): ResumeEducationEntry[] {
  return RESUME_EDUCATION;
}

export function getResumeLanguages(): ResumeLanguageEntry[] {
  return RESUME_LANGUAGES;
}

export function getResumeHeading() {
  return {
    name: SITE_AUTHOR,
    role: RESUME_ROLE,
  };
}
