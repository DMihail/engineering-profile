import type { XP, Education } from "@/lib/types";

export const EDUCATION: Education[] = [
  {
    institution: "Oles Honchar Dnipro National University",
    field: "Master's Degree in Systems Analysis",
    period: "09/2019 – 02/2021",
  },
  {
    institution: "Oles Honchar Dnipro National University",
    field: "Bachelor Degree in Systems Analysis",
    period: "09/2015 – 06/2019",
  },
];

export const XP_ENTRIES: XP[] = [
  {
    company: "Elementica",
    role: "React Native Developer",
    period: "03/2025 – 12/2025",
    location: "Uzhhorod",
    current: false,
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
    items: [],
    projects: [
      {
        title: "Vitadrop (Healthcare Mobile Application)",
        relatedCaseId: "vitadrop",
        items: [
          "Developed and maintained a healthcare mobile application using React Native.",
          "Implemented Firebase Authentication, REST API integrations, push notifications, and core application features.",
          "Integrated camera functionality and OpenCV-based image analysis workflows.",
          "Worked with iOS and Android native projects to integrate third-party SDKs and platform-specific functionality.",
          "Participated in application releases for App Store and Google Play.",
          "Collaborated with backend developers and stakeholders to deliver new features and improvements.",
        ],
      },
      {
        title: "Vidalytics Admin Platform",
        relatedCaseId: "vidalytics",
        items: [
          "Contributed to the development of a video analytics and player management platform using React.",
          "Developed analytics dashboards and player configuration features.",
          "Implemented new functionality and improvements based on business requirements.",
          "Worked closely with product managers, designers, and engineers in an Agile environment.",
        ],
      },
    ],
  },
  {
    company: "NetGame",
    role: "React Native Developer",
    period: "06/2024 – 01/2025",
    location: "Kyiv",
    current: false,
    tags: ["React Native", "Expo", "Firebase Crashlytics", "App Store", "Google Play"],
    items: [
      "Developed and maintained production mobile applications for iOS and Android.",
      "Delivered new features, bug fixes, and performance improvements.",
      "Investigated and resolved production issues using Firebase Crashlytics and analytics tools.",
      "Supported release cycles and post-release maintenance.",
    ],
    applicationsLabel: "Applications:",
    applications: ["BetKing Casino & Sportsbook", "777 UA Casino"],
  },
  {
    company: "Kultprosvet",
    role: "Full Stack / React Native Developer",
    period: "03/2021 – 12/2023",
    location: "Dnipro",
    current: false,
    tags: ["React Native", "React", "Node.js", "GraphQL", "Express", "WebSockets", "MySQL"],
    items: [
      "Developed mobile and web applications using React Native, React, TypeScript, and Node.js.",
      "Built backend services and APIs using Express, GraphQL, GraphQL Subscriptions, and MySQL.",
      "Participated in code reviews, sprint planning, task estimation, and mentoring activities.",
      "Worked directly with clients and stakeholders throughout the development lifecycle.",
    ],
    projects: [
      {
        title: "Waddingtons Auctions",
        relatedCaseId: "waddingtons",
        items: [
          "Developed and maintained a mobile auction platform built with Expo and React Native.",
          "Implemented new features and enhancements while supporting the application over a two-year period.",
          "Helped migrate auction functionality from a web platform to mobile applications.",
        ],
      },
      {
        title: "Amako",
        relatedCaseId: "amako",
        items: [
          "Maintained and enhanced a workforce management application used by field engineers.",
          "Implemented offline data storage and WebSocket-based real-time synchronization.",
          "Upgraded the project from an outdated React Native version to a modern release.",
          "Delivered new features and performance improvements while maintaining existing business workflows.",
        ],
      },
      {
        title: "Education Platform",
        items: [
          "Developed functionality for an educational platform used by teachers and students.",
          "Built backend services, administration features, and real-time functionality.",
          "Worked with React Native, React, GraphQL, and GraphQL Subscriptions to support mobile and web applications.",
        ],
      },
    ],
  },
  {
    company: "Devsteam.mobi",
    role: "Junior React Native Developer",
    period: "03/2020 – 03/2021",
    location: "Kiev",
    current: false,
    tags: ["React Native", "SQLite", "REST APIs", "TypeScript"],
    items: [
      "Contributed to the development of a React Native audiobook application.",
      "Implemented audio playback functionality and offline content storage using SQLite.",
      "Integrated REST APIs for content synchronization and user management.",
      "Improved application stability and performance through bug fixing and maintenance.",
    ],
    relatedCaseId: "audiobook",
    relatedCaseTitle: "Audiobook Application",
  },
  {
    company: "Absolutist",
    role: "JavaScript Developer",
    period: "09/2018 – 07/2019",
    location: "Dnipro",
    current: false,
    tags: ["JavaScript", "TypeScript", "ActionScript"],
    items: [
      "Participated in migration of browser games from ActionScript to JavaScript and TypeScript.",
      "Implemented new functionality and maintained existing game codebases.",
      "Worked on bug fixing, performance improvements, and feature development.",
      "Collaborated with developers, designers, and QA engineers throughout the development process.",
    ],
  },
];
