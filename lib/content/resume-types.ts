export interface ResumeSkillGroup {
  label: string;
  skills: string;
}

export interface ResumeProjectBlock {
  title: string;
  bullets: string[];
}

export interface ResumeExperienceEntry {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets?: string[];
  projects?: ResumeProjectBlock[];
  applications?: string[];
  applicationsLabel?: string;
}

export interface ResumeProjectEntry {
  title: string;
  period: string;
  bullets: string[];
  technologies?: string;
}

export interface ResumeEducationEntry {
  degree: string;
  institution: string;
  period: string;
  location: string;
}

export interface ResumeLanguageEntry {
  language: string;
  level: string;
}
