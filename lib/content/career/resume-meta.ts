import type { ResumeSkillGroup } from "@/lib/content/resume-types";

export const RESUME_ROLE = "React Native Developer (iOS & Android)";

export const RESUME_SUMMARY = {
  ireland:
    "React Native developer with 5+ years building and shipping iOS and Android apps, and 7+ years in software development. Delivered healthcare, betting, auction and field-service apps to the App Store and Google Play, from new features to React Native upgrades and production crash fixing. Currently building a screen-time app on the React Native New Architecture with native Kotlin and Swift modules. Based in Dublin with full right to work in Ireland, no visa sponsorship required.",
  ua:
    "React Native developer with 5+ years building and shipping iOS and Android apps, and 7+ years in software development. Delivered healthcare, betting, auction and field-service apps to the App Store and Google Play, from new features to React Native upgrades and production crash fixing. Currently building a screen-time app on the React Native New Architecture with native Kotlin and Swift modules.",
} as const;

export const RESUME_SKILL_GROUPS: ResumeSkillGroup[] = [
  {
    label: "React Native",
    skills:
      "React Native CLI, Expo, New Architecture (Turbo Modules), Navigation, Reanimated, Push Notifications, Deep Linking, Offline Storage, App Store & Google Play Releases",
  },
  {
    label: "TypeScript & JavaScript",
    skills: "ES6+, TypeScript, Async Programming, API Integration, Performance Optimization",
  },
  {
    label: "Native",
    skills: "Kotlin, Swift (native modules), Android foreground services, iOS Screen Time APIs",
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
    skills: "Node.js, NestJS, Express, REST APIs, GraphQL, GraphQL Subscriptions, React Admin",
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
    skills: "Jest, ESLint, Husky, Git, Docker, Postman, Firebase Crashlytics, App Store Connect, Google Play Console",
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
