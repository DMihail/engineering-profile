import type {
  CareerEducationEntry,
  CareerExperienceEntry,
  CareerFeaturedProject,
  CareerLanguageEntry,
} from "@/lib/content/career/types";

/** Single source of truth for work history — portfolio and resume derive from here. */
export const CAREER_EXPERIENCE: CareerExperienceEntry[] = [
  {
    role: "Relocation to Ireland and personal projects",
    company: "Self-directed",
    period: "01/2026 – Present",
    location: "Dublin",
    impact:
      "Moved to Dublin; building Keept on the React Native New Architecture with native Kotlin and Swift modules.",
    portfolio: {
      tags: ["React Native", "New Architecture", "Turbo Modules", "Kotlin", "Swift", "Expo", "Jest"],
      relatedCaseId: "focusguard",
      relatedCaseTitle: "Keept",
    },
    bullets: [
      "Moved to Dublin; taking English classes.",
      "Building Keept, a screen-time app on React Native 0.87 (New Architecture) with native Kotlin and Swift modules, now in closed testing on Google Play.",
      "Building Nudge, a gamified to-do app with Expo; learning Kotlin and Jetpack Compose for a planned Wear OS companion.",
    ],
  },
  {
    role: "React Native Developer (Contract)",
    company: "Elementica",
    period: "03/2025 – 12/2025",
    location: "Uzhhorod",
    impact:
      "Shipped healthcare mobile to App Store & Google Play; delivered analytics admin features with the product team.",
    portfolio: {
      tags: [
        "React Native",
        "Firebase",
        "REST APIs",
        "Push Notifications",
        "Vision Camera",
        "React",
        "App Store",
        "Google Play",
      ],
    },
    projects: [
      {
        title: "Vitadrop (Healthcare Mobile Application)",
        caseStudyId: "vitadrop",
        bullets: [
          "Built core features of a healthcare app in React Native and TypeScript: Firebase Authentication, REST API integration and push notifications.",
          "Added camera capture with VisionCamera and image analysis with OpenCV, including native iOS and Android SDK integration.",
          "Prepared and shipped releases to the App Store and Google Play.",
        ],
      },
      {
        title: "Vidalytics Admin Platform",
        caseStudyId: "vidalytics",
        bullets: [
          "Built analytics dashboards and video player settings in React, working with product managers and designers in Agile sprints.",
        ],
      },
    ],
  },
  {
    role: "React Native Developer (Contract)",
    company: "NetGame",
    period: "06/2024 – 01/2025",
    location: "Kyiv",
    impact:
      "Owned production iOS/Android release cycles — features, Crashlytics triage, and post-release fixes.",
    portfolio: { tags: ["React Native", "Expo", "Firebase Crashlytics", "App Store", "Google Play"] },
    bullets: [
      "Developed features for production betting and casino apps on iOS and Android.",
      "Triaged and fixed top production crashes found in Firebase Crashlytics.",
      "Supported regular release cycles and post-release monitoring.",
    ],
    applicationsLabel: "Applications:",
    applications: ["BetKing Casino & Sportsbook", "777 UA Casino"],
  },
  {
    role: "Full Stack / React Native Developer",
    company: "Kultprosvet",
    period: "03/2021 – 12/2023",
    location: "Dnipro",
    impact:
      "Multi-year ownership of auction and workforce apps — offline-first, real-time sync, and RN upgrades in production.",
    portfolio: {
      tags: ["React Native", "React", "Node.js", "NestJS", "GraphQL", "Express", "WebSockets", "MySQL"],
    },
    bullets: [
      "Took part in code reviews, sprint planning and estimation, and mentored junior developers.",
    ],
    projects: [
      {
        title: "Waddingtons Auctions",
        caseStudyId: "waddingtons",
        bullets: [
          "Moved live auction features from the web platform to new iOS and Android apps (Expo) and supported them for two years.",
        ],
      },
      {
        title: "Amako",
        caseStudyId: "amako",
        bullets: [
          "Upgraded the app from an outdated React Native version to a modern release while keeping releases running for field engineers.",
          "Built offline data storage and real-time sync over WebSockets, so engineers could work without a connection.",
        ],
      },
      {
        title: "Education Platform (classroom focus app)",
        bullets: [
          "Built a React Native app where teachers start a lesson and students join it; once joined, an on-device VPN blocks social media (Instagram, Facebook and others).",
          "Built and maintained the NestJS, GraphQL and MySQL backend with GraphQL Subscriptions for real-time classroom control, and a React Admin panel for teachers.",
        ],
      },
    ],
  },
  {
    role: "Junior React Native Developer",
    company: "Devsteam.mobi",
    period: "03/2020 – 03/2021",
    location: "Kyiv",
    impact: "Built offline audiobook playback and SQLite storage for a production React Native app.",
    portfolio: {
      tags: ["React Native", "SQLite", "REST APIs", "TypeScript"],
      relatedCaseId: "audiobook",
      relatedCaseTitle: "Audiobook Application",
    },
    bullets: [
      "Built audio playback and offline downloads (SQLite) for an audiobook app, with REST API sync.",
    ],
  },
  {
    role: "JavaScript Developer",
    company: "Absolutist",
    period: "09/2018 – 07/2019",
    location: "Dnipro",
    impact: "Migrated browser games from ActionScript to JavaScript/TypeScript in a live product codebase.",
    portfolio: {
      tags: ["JavaScript", "TypeScript", "ActionScript"],
    },
    bullets: [
      "Migrated browser games from ActionScript to JavaScript and TypeScript.",
    ],
  },
];

/** Personal projects — client work lives under CAREER_EXPERIENCE so the resume does not repeat it. */
export const CAREER_FEATURED_PROJECTS: CareerFeaturedProject[] = [
  {
    title: "Keept (FocusGuard), Screen-Time App",
    period: "05/2026 – Present",
    caseStudyId: "focusguard",
    bullets: [
      "Building a cross-platform app that tracks distracting apps, warns before limits and blocks them; now in closed testing on Google Play.",
      "Wrote native code for both platforms: Kotlin foreground service, UsageStatsManager, overlay blocking and home-screen widget on Android; Swift Screen Time (Family Controls, DeviceActivity) extensions on iOS, connected through a Turbo Module.",
      "Set up Zustand + MMKV storage, Reanimated charts, i18n (EN/RU), Firebase Crashlytics, and a quality gate with ESLint, Prettier, TypeScript and Jest (130+ tests).",
    ],
    technologies: "React Native 0.87 (New Architecture), React 19, TypeScript, Turbo Modules, Kotlin, Swift, Zustand, MMKV, Jest",
  },
  {
    title: "Nudge, Gamified To-Do App",
    period: "08/2026 – Present",
    bullets: [
      "Building a to-do app with XP, streaks and scheduled reminders; learning Kotlin and Jetpack Compose for a planned Wear OS companion.",
    ],
    technologies: "React Native, Expo, Expo Router, TypeScript, Zustand",
  },
];

export const CAREER_EDUCATION: CareerEducationEntry[] = [
  {
    degree: "Master's Degree in Systems Analysis",
    institution: "Oles Honchar Dnipro National University",
    period: "09/2019 – 02/2021",
    location: "Dnipro",
  },
  {
    degree: "Bachelor's Degree in Systems Analysis",
    institution: "Oles Honchar Dnipro National University",
    period: "09/2015 – 06/2019",
    location: "Dnipro",
  },
];

export const CAREER_LANGUAGES: CareerLanguageEntry[] = [
  { language: "Ukrainian", level: "Native" },
  { language: "English", level: "Intermediate (B1), taking classes in Dublin" },
];
