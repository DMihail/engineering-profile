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
import { phoneForRegion } from "@/lib/contact-region";

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

/** Query-only: canonical `/resume` is Ireland; UA requires `?variant=ua` (or legacy `uk`). */
export function parseResumeVariant(value: string | undefined): ResumeVariant {
  if (value === "ua" || value === "uk") return "ua";
  return "ireland";
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

/**
 * ISO 8601 interval for periods like `03/2025 – 12/2025` or `09/2015 – Present`.
 */
export function resumePeriodDateTime(period: string): string {
  const match = period.match(
    /(\d{1,2})\/(\d{4})\s*[–—-]\s*(?:(\d{1,2})\/(\d{4})|(?:Present|present))/,
  );
  if (!match) return period.replace(/\s+/g, "");

  const start = `${match[2]}-${match[1].padStart(2, "0")}`;
  if (!match[3] || !match[4]) return `${start}/..`;

  return `${start}/${match[4]}-${match[3].padStart(2, "0")}`;
}
