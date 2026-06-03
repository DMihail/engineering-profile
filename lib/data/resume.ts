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

export const RESUME_EXPERIENCE: ResumeExperienceEntry[] = [
  {
    role: "React Native Developer",
    company: "Elementica",
    period: "03/2025 – 12/2025",
    location: "Uzhhorod",
    projects: [
      {
        title: "Vitadrop (Healthcare Mobile Application)",
        bullets: [
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
        bullets: [
          "Contributed to the development of a video analytics and player management platform using React.",
          "Developed analytics dashboards and player configuration features.",
          "Implemented new functionality and improvements based on business requirements.",
          "Worked closely with product managers, designers, and engineers in an Agile environment.",
        ],
      },
    ],
  },
  {
    role: "React Native Developer",
    company: "NetGame",
    period: "06/2024 – 01/2025",
    location: "Kyiv",
    bullets: [
      "Developed and maintained production mobile applications for iOS and Android.",
      "Delivered new features, bug fixes, and performance improvements.",
      "Investigated and resolved production issues using Firebase Crashlytics and analytics tools.",
      "Supported release cycles and post-release maintenance.",
    ],
    applicationsLabel: "Applications:",
    applications: ["BetKing Casino & Sportsbook", "777 UA Casino"],
  },
  {
    role: "Full Stack / React Native Developer",
    company: "Kultprosvet",
    period: "03/2021 – 12/2023",
    location: "Dnipro",
    bullets: [
      "Developed mobile and web applications using React Native, React, TypeScript, and Node.js.",
      "Built backend services and APIs using Express, GraphQL, GraphQL Subscriptions, and MySQL.",
      "Participated in code reviews, sprint planning, task estimation, and mentoring activities.",
      "Worked directly with clients and stakeholders throughout the development lifecycle.",
    ],
    projects: [
      {
        title: "Waddingtons Auctions",
        bullets: [
          "Developed and maintained a mobile auction platform built with Expo and React Native.",
          "Implemented new features and enhancements while supporting the application over a two-year period.",
          "Helped migrate auction functionality from a web platform to mobile applications.",
        ],
      },
      {
        title: "Amako",
        bullets: [
          "Maintained and enhanced a workforce management application used by field engineers.",
          "Implemented offline data storage and WebSocket-based real-time synchronization.",
          "Upgraded the project from an outdated React Native version to a modern release.",
          "Delivered new features and performance improvements while maintaining existing business workflows.",
        ],
      },
      {
        title: "Education Platform",
        bullets: [
          "Developed functionality for an educational platform used by teachers and students.",
          "Built backend services, administration features, and real-time functionality.",
          "Worked with React Native, React, GraphQL, and GraphQL Subscriptions to support mobile and web applications.",
        ],
      },
    ],
  },
  {
    role: "Junior React Native Developer",
    company: "Devsteam.mobi",
    period: "03/2020 – 03/2021",
    location: "Kiev",
    bullets: [
      "Contributed to the development of a React Native audiobook application.",
      "Implemented audio playback functionality and offline content storage using SQLite.",
      "Integrated REST APIs for content synchronization and user management.",
      "Improved application stability and performance through bug fixing and maintenance.",
    ],
  },
  {
    role: "JavaScript Developer",
    company: "Absolutist",
    period: "09/2018 – 07/2019",
    location: "Dnipro",
    bullets: [
      "Participated in migration of browser games from ActionScript to JavaScript and TypeScript.",
      "Implemented new functionality and maintained existing game codebases.",
      "Worked on bug fixing, performance improvements, and feature development.",
      "Collaborated with developers, designers, and QA engineers throughout the development process.",
    ],
  },
];

export const RESUME_PROJECTS: ResumeProjectEntry[] = [
  {
    title: "Vitadrop",
    period: "03/2025 – 06/2025",
    bullets: [
      "Developed and maintained a healthcare mobile application using React Native.",
      "Implemented Firebase Authentication, REST API integrations, push notifications, and core application features.",
      "Integrated camera functionality and OpenCV-based image analysis workflows.",
      "Worked with iOS and Android native projects to integrate third-party SDKs and platform-specific functionality.",
      "Participated in App Store and Google Play release processes.",
      "Collaborated closely with backend developers and stakeholders to deliver new features and improvements.",
    ],
    technologies: "React Native, TypeScript, Firebase, REST API, VisionCamera, OpenCV Integration",
  },
  {
    title: "Waddingtons Auctions, Mobile Auction Platform",
    period: "09/2021 – 12/2023",
    bullets: [
      "Developed and maintained a production mobile auction platform built with React Native and Expo.",
      "Helped migrate auction functionality from a web platform to mobile applications.",
      "Implemented new features and enhancements while supporting the application over a two-year period.",
      "Collaborated with backend developers and product stakeholders to improve user experience and platform functionality.",
    ],
    technologies: "React Native, Expo, TypeScript, REST API",
  },
  {
    title: "FocusGuard, Education Platform",
    period: "06/2022 – 12/2022",
    bullets: [
      "Participated in development of an educational platform for teachers and students.",
      "Developed mobile and web functionality using React Native and React.",
      "Built backend services using Node.js, GraphQL, and GraphQL Subscriptions.",
      "Implemented real-time classroom management and user synchronization features.",
      "Developed administration functionality for teacher and lesson management.",
    ],
  },
];

export const RESUME_EDUCATION: ResumeEducationEntry[] = [
  {
    degree: "Master's Degree in Systems Analysis",
    institution: "Oles Honchar Dnipro National University",
    period: "09/2019 – 02/2021",
    location: "Dnipro",
  },
  {
    degree: "Bachelor Degree in Systems Analysis",
    institution: "Oles Honchar Dnipro National University",
    period: "09/2015 – 06/2019",
    location: "Dnipro",
  },
];

export const RESUME_LANGUAGES: ResumeLanguageEntry[] = [
  { language: "Ukrainian", level: "Native" },
  { language: "Russian", level: "Native" },
  { language: "English", level: "Intermediate (B1)" },
];
