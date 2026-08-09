import type { XP, Education } from "@/lib/types";
import type {
  CareerEducationEntry,
  CareerExperienceEntry,
  CareerFeaturedProject,
} from "@/lib/content/career/types";
import type {
  ResumeEducationEntry,
  ResumeExperienceEntry,
  ResumeProjectEntry,
} from "@/lib/content/resume-types";

/**
 * Maps the shared career source into portfolio UI shapes and resume shapes.
 * Keep view-specific types separate — do not collapse them into one model.
 */
export function toXpEntries(entries: CareerExperienceEntry[]): XP[] {
  return entries.map((entry) => ({
    company: entry.company,
    role: entry.role,
    period: entry.period,
    location: entry.location,
    current: false,
    tags: entry.portfolio?.tags ?? [],
    items: entry.bullets ?? [],
    projects: entry.projects?.map((project) => ({
      title: project.title,
      items: project.bullets,
      relatedCaseId: project.caseStudyId,
    })),
    applications: entry.applications,
    applicationsLabel: entry.applicationsLabel,
    relatedCaseId: entry.portfolio?.relatedCaseId,
    relatedCaseTitle: entry.portfolio?.relatedCaseTitle,
  }));
}

export function toPortfolioEducation(entries: CareerEducationEntry[]): Education[] {
  return entries.map((entry) => ({
    institution: entry.institution,
    field: entry.degree,
    period: entry.period,
  }));
}

export function toResumeExperience(entries: CareerExperienceEntry[]): ResumeExperienceEntry[] {
  return entries.map((entry) => ({
    role: entry.role,
    company: entry.company,
    period: entry.period,
    location: entry.location,
    bullets: entry.bullets,
    applications: entry.applications,
    applicationsLabel: entry.applicationsLabel,
    projects: entry.projects?.map((project) => ({
      title: project.title,
      bullets: project.bullets,
    })),
  }));
}

export function toResumeProjects(projects: CareerFeaturedProject[]): ResumeProjectEntry[] {
  return projects.map(({ title, period, bullets, technologies }) => ({
    title,
    period,
    bullets,
    technologies,
  }));
}

export function toResumeEducation(entries: CareerEducationEntry[]): ResumeEducationEntry[] {
  return entries.map((entry) => ({ ...entry }));
}
