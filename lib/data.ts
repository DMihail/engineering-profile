import {
  Smartphone, Layers, Eye, Code2, Cpu, Activity,
  Globe, Monitor, Wind, GitBranch, Zap, Mail,
  Server, Shield, Database, Wifi, Boxes,
  Gauge, Network, Terminal, Workflow, RefreshCw, Package, BarChart2,
  PenTool, Link2, Wrench,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { SITE_EMAIL, mailtoUrl } from "@/lib/config";
import type { Capability, SkillLayer, CaseStudy, XP, SocialLink, Education } from "@/lib/types";

export const NAV = ["impact", "projects", "skills", "experience", "contact"] as const;

export type NavId = (typeof NAV)[number];

export const NAV_LABELS: Record<NavId, string> = {
  impact: "Capabilities",
  projects: "Case studies",
  skills: "Skills",
  experience: "Experience",
  contact: "Contact",
};

export const CAPABILITIES: Capability[] = [
  {
    id: "perf", kpi: "< 16ms", kpiSub: "frame budget",
    icon: Gauge,
    title: "Mobile Performance",
    desc: "Profiling and eliminating unnecessary re-renders for consistent 60fps. JS thread optimization, Hermes tuning, and bundle size reduction across production apps.",
    tags: ["react-native", "hermes", "flipper", "60fps"],
    appliedIn: "FocusGuard · 3 client productions",
  },
  {
    id: "rt", kpi: "< 100ms", kpiSub: "latency",
    icon: Network,
    title: "Real-time Systems",
    desc: "Camera frame pipelines with OpenCV for on-device vision. WebSocket architectures for live bidding and location tracking at 2,000+ concurrent users.",
    tags: ["vision-camera", "opencv", "websocket", "redis"],
    appliedIn: "Waddingtons · Vitadrop",
  },
  {
    id: "native", kpi: "zero-copy", kpiSub: "JSI bridge",
    icon: Terminal,
    title: "Native Integration",
    desc: "Swift and Kotlin modules via JSI and TurboModules for OS-level capabilities — screen-time enforcement, background tasks, biometric auth, and file system access.",
    tags: ["swift", "kotlin", "jsi", "turbomodules"],
    appliedIn: "FocusGuard · Vitadrop · 4 clients",
  },
  {
    id: "arch", kpi: "iOS + Android", kpiSub: "+ Web",
    icon: Layers,
    title: "Cross-platform Architecture",
    desc: "Offline-first apps with local persistence and background sync. Shared code across iOS, Android, and web while preserving native UX patterns.",
    tags: ["mmkv", "offline-first", "monorepo", "ios", "android"],
    appliedIn: "Vitadrop · client monorepos",
  },
  {
    id: "state", kpi: "normalized", kpiSub: "cache",
    icon: Workflow,
    title: "State Management",
    desc: "Redux Toolkit with normalized caches, RTK Query for server state, and Zustand for feature-scoped state. Predictable data flow in complex multi-screen apps.",
    tags: ["redux-toolkit", "rtk-query", "zustand", "react-query"],
    appliedIn: "Waddingtons · Vitadrop · all clients",
  },
];

export const SKILL_LAYERS: SkillLayer[] = [
  {
    id: "mobile", layer: "Mobile Development", desc: "60fps animations, gesture systems, offline-first storage, camera pipelines",
    scope: "primary", projectRefs: "FocusGuard · Vitadrop",
    skills: [
      { name: "React Native", primary: true,  icon: Smartphone },
      { name: "Expo",         primary: true,  icon: Layers     },
      { name: "TypeScript",   primary: true,  icon: Code2      },
      { name: "Reanimated",   primary: false, icon: Activity   },
      { name: "Vision Camera",primary: false, icon: Eye        },
      { name: "MMKV",         primary: false, icon: Database   },
    ],
  },
  {
    id: "realtime", layer: "Real-time & Backend", desc: "WebSocket messaging, push notifications, low-latency event streaming",
    scope: "backend", projectRefs: "Waddingtons · Vitadrop",
    skills: [
      { name: "WebSockets",        primary: true,  icon: Wifi     },
      { name: "Firebase",          primary: true,  icon: Shield   },
      { name: "Firebase Deep Links", primary: false, icon: Link2  },
      { name: "Node.js",           primary: true,  icon: Server   },
      { name: "MySQL",             primary: false, icon: Database },
      { name: "MongoDB",           primary: false, icon: Database },
      { name: "PostgreSQL",        primary: false, icon: Database },
      { name: "OpenCV",            primary: false, icon: Eye      },
    ],
  },
  {
    id: "frontend", layer: "Frontend & Web", desc: "SSR/SSG rendering, component libraries, responsive design systems",
    scope: "web", projectRefs: "Waddingtons · client work",
    skills: [
      { name: "React",        primary: true,  icon: Globe     },
      { name: "Next.js",      primary: true,  icon: Monitor   },
      { name: "TypeScript",   primary: true,  icon: Code2     },
      { name: "GraphQL",      primary: false, icon: GitBranch },
      { name: "Tailwind CSS", primary: false, icon: Wind      },
      { name: "Figma",        primary: false, icon: PenTool   },
      { name: "Postman",      primary: false, icon: Wrench    },
    ],
  },
  {
    id: "native", layer: "Native Integration", desc: "Swift/Kotlin modules, JSI bridging, background tasks, platform sensors",
    scope: "platform", projectRefs: "FocusGuard · Vitadrop",
    skills: [
      { name: "Swift",           primary: true,  icon: Cpu      },
      { name: "Kotlin",          primary: true,  icon: Cpu      },
      { name: "JSI Bridge",      primary: true,  icon: Boxes    },
      { name: "TurboModules",    primary: false, icon: Layers   },
      { name: "BGTaskScheduler", primary: false, icon: Activity },
      { name: "SQLite",          primary: false, icon: Database },
    ],
  },
  {
    id: "perf", layer: "Performance Tooling", desc: "Frame profiling, memory leak detection, bundle splitting, startup optimization",
    scope: "optimization", projectRefs: "FocusGuard · contract work",
    skills: [
      { name: "Flipper",           primary: true,  icon: Activity  },
      { name: "Hermes Profiler",   primary: true,  icon: Zap       },
      { name: "Metro Bundler",     primary: true,  icon: Package   },
      { name: "Chrome DevTools",   primary: false, icon: Monitor   },
      { name: "Bundle Analysis",   primary: false, icon: BarChart2 },
      { name: "Why Did You Render",primary: false, icon: Eye       },
    ],
  },
  {
    id: "state", layer: "State Management", desc: "Normalized caches, optimistic updates, server-state sync, reactive subscriptions",
    scope: "data layer", projectRefs: "Vitadrop · Waddingtons",
    skills: [
      { name: "Redux Toolkit", primary: true,  icon: Workflow  },
      { name: "RTK Query",     primary: true,  icon: RefreshCw },
      { name: "Zustand",       primary: true,  icon: Database  },
      { name: "Redux Saga",    primary: false, icon: GitBranch },
      { name: "React Query",   primary: false, icon: RefreshCw },
      { name: "Jotai",         primary: false, icon: Boxes     },
    ],
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "focusguard",
    num: "01",
    title: "FocusGuard",
    type: "Personal project · iOS",
    version: "Production · App Store",
    summary:
      "Mobile productivity system for session tracking, focus-state management, and realtime activity monitoring on Android and iOS.",
    stack: ["React Native", "Expo", "TypeScript", "Swift", "Kotlin", "SQLite"],
    technicalPoints: [
      "Foreground services and background execution handling",
      "Realtime activity tracking flows",
      "React Native architecture with native Android integrations",
      "Android system constraints and lifecycle management",
      "Performance-conscious mobile UX",
    ],
    context:
      "FocusGuard is a mobile productivity system focused on session tracking, focus-state management, and realtime activity monitoring. The project explores background execution constraints, foreground services, persistent tracking flows, and mobile performance optimization across Android devices.",
    problem:
      "Mobile focus apps need reliable tracking while respecting strict OS limits on background work, battery use, and user-visible performance. The product had to stay responsive while syncing focus state and activity data across sessions.",
    solution:
      "Built with React Native and native Android integrations, the application emphasizes responsive UX, efficient state synchronization, and production-oriented mobile architecture — balancing realtime monitoring with platform constraints.",
    constraints: [
      "Background execution windows are limited on mobile OSes",
      "Tracking flows must remain accurate without draining battery",
      "Native modules required for OS-level capabilities",
      "UI must stay responsive during sync and state updates",
    ],
    architecture: [
      { decision: "React Native + native modules", rationale: "Shared product logic with platform-specific execution where the OS requires it" },
      { decision: "Local persistence for session state", rationale: "Reliable tracking when connectivity or background time is limited" },
      { decision: "Foreground services on Android", rationale: "Stable tracking during active focus sessions within platform rules" },
    ],
    tradeoffs: [
      { chosen: "Native integrations over pure JS", rationale: "Required for reliable background behavior and system-level hooks" },
      { chosen: "Conservative sync over aggressive polling", rationale: "Better battery life and smoother UX on mid-range devices" },
    ],
    performanceNotes: [
      "Optimized render paths for session dashboards and timers",
      "Reduced unnecessary re-renders during active tracking",
      "Efficient state updates for long-running focus sessions",
    ],
    results: [
      { metric: "2,400+", label: "downloads" },
      { metric: "4.8★", label: "App Store rating" },
      { metric: "−47 min", label: "avg. daily screen time reduction" },
    ],
  },
  {
    id: "waddingtons",
    num: "02",
    title: "Waddington's Auctions",
    type: "Client · Production",
    version: "Expo · Mobile · Invaluable ecosystem",
    summary:
      "Mobile auction platform built with Expo and integrated with the Invaluable ecosystem — live bidding, lot tracking, and realtime auction participation.",
    stack: ["Expo", "React Native", "TypeScript", "WebSockets", "Redux Toolkit", "RTK Query"],
    technicalPoints: [
      "Expo-based React Native delivery for iOS and Android",
      "Realtime auction updates",
      "Live bidding flows",
      "Responsive mobile architecture",
      "Scalable React Native codebase",
      "Cross-platform development",
      "Auction state synchronization",
      "Mobile performance optimization",
    ],
    context:
      "Waddington's Auctions is a mobile auction platform integrated with the Invaluable ecosystem, enabling users to browse auctions, track lots, participate in live bidding, and manage auction activity in realtime.",
    problem:
      "Auction participants need fast, reliable updates during live events. Delayed bid feedback or inconsistent lot state creates friction and undermines trust during high-intensity bidding windows.",
    solution:
      "Built with Expo and React Native, the project focused on responsive mobile UX, realtime auction interactions, synchronization flows, and scalable application architecture — keeping bid state authoritative and the interface calm under load.",
    constraints: [
      "Live events require low-latency updates across many concurrent users",
      "Bid confirmations must reflect server truth, not optimistic guesses",
      "Mobile networks drop frequently during long auction sessions",
      "Lot and session state must stay consistent across screens",
    ],
    architecture: [
      { decision: "WebSocket-driven live updates", rationale: "Push authoritative auction changes instead of polling under peak load" },
      { decision: "Normalized client state", rationale: "Predictable updates across lot lists, detail views, and bidding panels" },
      { decision: "Server-authoritative bidding", rationale: "Financial accuracy requires confirmed server responses" },
    ],
    tradeoffs: [
      { chosen: "Realtime channel over REST polling", rationale: "Lower latency and fewer race conditions during live events" },
      { chosen: "Structured state over ad-hoc props", rationale: "Easier to maintain as auction flows grew in complexity" },
    ],
    performanceNotes: [
      "Reduced bid confirmation latency during live sessions",
      "Stable scrolling and updates on lot-heavy auction views",
      "Efficient reconnect behavior for interrupted mobile sessions",
    ],
    results: [
      { metric: "800→80ms", label: "bid confirmation latency" },
      { metric: "0", label: "duplicate bids post-launch" },
      { metric: "2,000+", label: "concurrent live sessions supported" },
    ],
  },
  {
    id: "vitadrop",
    num: "03",
    title: "Vitadrop",
    type: "Client project · Not publicly released",
    version: "iOS / Android · Confidential",
    summary:
      "Healthcare-oriented mobile application for realtime test analysis, camera processing, and native image-processing pipelines.",
    stack: ["React Native", "Expo", "TypeScript", "Vision Camera", "OpenCV", "Swift", "Kotlin"],
    technicalPoints: [
      "VisionCamera integration",
      "OpenCV processing",
      "Realtime frame analysis",
      "Native iOS/Android modules",
      "Image preprocessing pipelines",
      "Cross-platform synchronization",
      "Performance optimization under hardware constraints",
    ],
    context:
      "Vitadrop was a healthcare-oriented mobile application focused on realtime test analysis workflows, camera processing, and native image-processing pipelines. The project was not publicly released as a consumer app.",
    problem:
      "On-device vision workflows had to stay responsive while processing camera frames, running analysis pipelines, and keeping UX smooth on varied mobile hardware — without implying a public consumer launch.",
    solution:
      "Built with React Native, VisionCamera, OpenCV-based frame analysis, realtime detection systems, and cross-platform native modules. Engineering focus: performant image-processing flows under mobile hardware constraints while maintaining responsive UX and cross-platform consistency.",
    constraints: [
      "Camera frame processing must stay within mobile CPU/GPU budgets",
      "Pipeline latency affects usability during live capture",
      "Native modules required for performance-critical vision work",
      "Cross-platform behavior had to remain consistent on iOS and Android",
    ],
    architecture: [
      { decision: "VisionCamera + native processing", rationale: "Low-latency access to frames and hardware-accelerated paths" },
      { decision: "OpenCV on-device analysis", rationale: "Realtime preprocessing without round-trips to a server" },
      { decision: "Modular native bridges", rationale: "Isolate platform-specific vision work behind stable RN interfaces" },
    ],
    tradeoffs: [
      { chosen: "On-device processing over cloud round-trips", rationale: "Lower latency and better offline resilience during capture" },
      { chosen: "Native modules over JS-only vision", rationale: "Necessary for acceptable frame throughput on real devices" },
    ],
    performanceNotes: [
      "Tuned frame analysis pipelines for responsive capture UX",
      "Reduced processing overhead on mid-tier Android hardware",
      "Optimized synchronization between camera, analysis, and UI state",
    ],
    results: [
      { metric: "98%", label: "analysis workflow completion in testing" },
      { metric: "<100ms", label: "target frame pipeline latency" },
      { metric: "0", label: "data-loss incidents in QA/production trials" },
    ],
  },
];

export const EDUCATION: Education[] = [
  {
    institution: "Oles Honchar Dnipro National University,",
    field: "Bachelor's Degree in Systems Analysis",
    period: "2016 — 2020",
  },
  {
    institution: "Oles Honchar Dnipro National University,",
    field: "Master’s Degree in Systems Analysis",
    period: "2020 — 2021",
  },
];

export const XP_ENTRIES: XP[] = [
  {
    company: "Elementica", role: "React Native Developer",
    period: "03/2025 – 03/2026", location: "Uzhgorod, Ukraine", current: false,
    systems: "Cross-platform mobile apps · Redux Toolkit · Firebase · App Store & Google Play",
    tags: ["React Native", "TypeScript", "Redux Toolkit", "Firebase", "App Store", "Google Play"],
    highlight: "Cross-platform consumer mobile · production store releases",
    items: [
      "Develop and maintain cross-platform mobile applications using React Native and TypeScript",
      "Design scalable architecture using Redux Toolkit",
      "Integrate REST APIs and backend services",
      "Implement Firebase (Authentication, Analytics, Push Notifications)",
      "Publish and maintain applications in App Store and Google Play",
      "Improve application performance and resolve production issues",
    ],
  },
  {
    company: "NetGame", role: "React Native Developer",
    period: "06/2024 – 01/2025", location: "Kiev · Remote", current: false,
    systems: "React Native mobile apps · WebSockets · Firebase · TestFlight & Google Play",
    tags: ["React Native", "WebSockets", "Firebase", "TestFlight", "Google Play"],
    highlight: "Gaming sector · real-time mobile features",
    relatedCaseId: "waddingtons",
    items: [
      "Built and supported mobile applications using React Native",
      "Implemented real-time features using WebSockets",
      "Integrated Firebase services and backend APIs",
      "Delivered new features and improvements",
      "Managed releases via TestFlight and Google Play",
    ],
  },
  {
    company: "Kultprosvet", role: "Full-Stack Developer",
    period: "03/2021 – 01/2023", location: "Dnepr office", current: false,
    systems: "React · React Native · Node.js (Express.js, NestJS) · GraphQL · Firebase",
    tags: ["React", "React Native", "Express.js", "NestJS", "GraphQL", "Node.js", "Firebase"],
    highlight: "Full-stack delivery · mobile, web & internal admin tools",
    items: [
      "Developed mobile and web applications using React and React Native",
      "Built backend services using Node.js (Express, NestJS)",
      "Integrated GraphQL APIs and Firebase",
      "Created admin panels and internal tools",
    ],
  },
  {
    company: "Devsteam.mobi", role: "React Native Developer",
    period: "03/2020 – 2021", location: "Remote", current: false,
    systems: "React Native mobile apps · API testing · QA debugging",
    tags: ["React Native", "REST APIs", "Postman"],
    highlight: "Contract-style RN sprints · refactor, QA & API integration",
    items: [
      "Developed new features for mobile applications",
      "Refactored and improved existing codebases",
      "Debugged and resolved issues during QA testing",
      "Tested APIs using Postman",
    ],
  },
  {
    company: "Absolutist", role: "JavaScript Developer",
    period: "09/2018 – 06/2019", location: "Dnepr office", current: false,
    systems: "Browser games · ActionScript to JavaScript/TypeScript migration",
    tags: ["JavaScript", "TypeScript", "ActionScript"],
    highlight: "Browser games · ActionScript → TypeScript migration",
    items: [
      "Migrated browser games from ActionScript to JavaScript / TypeScript",
      "Improved performance and fixed bugs",
    ],
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub",   hint: "github.com/mykhailo-dzhezhelo",     icon: GithubIcon,   href: "https://github.com/DMihail" },
  { label: "LinkedIn", hint: "linkedin.com/in/mykhailo-dzhezhelo", icon: LinkedinIcon, href: "https://www.linkedin.com/in/mihail-dzhezhelo-27a41114a/" },
  { label: "Email",    hint: SITE_EMAIL,                           icon: Mail,         href: mailtoUrl() },
];

export const HERO_CTA = {
  cv: "/Mykhailo_Dzhezhelo_CV_Ireland.pdf",
  github: "https://github.com/DMihail",
  linkedin: "https://www.linkedin.com/in/mihail-dzhezhelo-27a41114a/",
  contact: "#contact",
} as const;

export const HERO_STATS = [
  { value: "6+",   label: "yrs exp" },
  { value: "20+",  label: "shipped" },
  { value: "4.8★", label: "rating" },
];

