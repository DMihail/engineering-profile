export {
  CAREER_EDUCATION,
  CAREER_EXPERIENCE,
  CAREER_FEATURED_PROJECTS,
  CAREER_LANGUAGES,
} from "@/lib/content/career/data";

export {
  RESUME_OG,
  RESUME_ROLE,
  RESUME_SKILL_GROUPS,
  RESUME_SUMMARY,
} from "@/lib/content/career/resume-meta";

export type {
  ResumeEducationEntry,
  ResumeExperienceEntry,
  ResumeLanguageEntry,
  ResumeProjectBlock,
  ResumeProjectEntry,
  ResumeSkillGroup,
} from "@/lib/content/resume-types";

import {
  CAREER_EDUCATION,
  CAREER_EXPERIENCE,
  CAREER_FEATURED_PROJECTS,
  CAREER_LANGUAGES,
} from "@/lib/content/career/data";
import {
  toResumeEducation,
  toResumeExperience,
  toResumeProjects,
} from "@/lib/content/career/adapters";

export const RESUME_EXPERIENCE = toResumeExperience(CAREER_EXPERIENCE);
export const RESUME_PROJECTS = toResumeProjects(CAREER_FEATURED_PROJECTS);
export const RESUME_EDUCATION = toResumeEducation(CAREER_EDUCATION);
export const RESUME_LANGUAGES = CAREER_LANGUAGES;
