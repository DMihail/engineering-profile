import type { ResumeSkillGroup } from "@/lib/content/resume-types";

export const RESUME_ROLE = "Mobile Engineer | React Native | Web Developer";

export const RESUME_SUMMARY = {
  ireland:
    "Mobile Engineer with 7+ years of software development experience, including 5+ years building production mobile applications with React Native. Experienced in App Store and Google Play releases, Firebase, REST APIs, GraphQL, WebSockets, offline-first applications, and production support. Based in Dublin, Ireland and eligible to work under Temporary Protection.",
  ua:
    "Mobile Engineer with 7+ years of software development experience, including 5+ years building production mobile applications with React Native. Experienced in App Store and Google Play releases, Firebase, REST APIs, GraphQL, WebSockets, offline-first applications, and production support.",
} as const;

export const RESUME_SKILL_GROUPS: ResumeSkillGroup[] = [
  {
    label: "React Native",
    skills:
      "React Native CLI, Expo, Navigation, State Management, Push Notifications, Deep Linking, Offline Storage, App Store & Google Play Releases",
  },
  {
    label: "TypeScript & JavaScript",
    skills: "ES6+, TypeScript, Async Programming, API Integration, Performance Optimization",
  },
  {
    label: "React",
    skills: "React, Hooks, Redux Toolkit, React Query, Zustand",
  },
  {
    label: "Mobile Development",
    skills: "iOS, Android, Firebase, SQLite, Mobile Architecture, Production Support",
  },
  {
    label: "Backend Development",
    skills: "Node.js, Express, REST APIs, GraphQL, GraphQL Subscriptions",
  },
  {
    label: "Real-Time Applications",
    skills: "WebSockets, GraphQL Subscriptions, Real-Time Synchronization",
  },
  {
    label: "Databases",
    skills: "MySQL, MongoDB, SQLite",
  },
  {
    label: "Development Tools",
    skills: "Git, Docker, Postman, Firebase Crashlytics, App Store Connect, Google Play Console",
  },
  {
    label: "Collaboration & Leadership",
    skills: "Code Reviews, Sprint Planning, Task Estimation, Mentoring, Stakeholder Communication",
  },
];

export const RESUME_OG = {
  badge: "Resume · PDF ready",
  highlights: ["React Native", "iOS & Android", "Firebase", "GraphQL", "App Store", "Google Play"],
} as const;
