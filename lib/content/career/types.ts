export interface CareerProject {
  title: string;
  caseStudyId?: string;
  bullets: string[];
}

export interface CareerExperienceEntry {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets?: string[];
  projects?: CareerProject[];
  applications?: string[];
  applicationsLabel?: string;
  portfolio?: {
    tags: string[];
    relatedCaseId?: string;
    relatedCaseTitle?: string;
  };
}

export interface CareerFeaturedProject {
  title: string;
  period: string;
  bullets: string[];
  technologies?: string;
  caseStudyId?: string;
}

export interface CareerEducationEntry {
  degree: string;
  institution: string;
  period: string;
  location: string;
}

export interface CareerLanguageEntry {
  language: string;
  level: string;
}
