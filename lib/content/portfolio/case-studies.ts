import type { CaseStudy } from "@/lib/types";

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "vitadrop",
    num: "01",
    title: "Vitadrop",
    type: "Client project · Healthcare",
    version: "React Native · iOS & Android",
    summary:
      "Healthcare mobile application with Firebase, REST APIs, camera capture, and on-device image analysis — integrated with native iOS and Android projects via Turbo Modules for third-party SDKs.",
    stack: [
      "React Native",
      "TypeScript",
      "Firebase",
      "REST API",
      "Vision Camera",
      "OpenCV",
      "Turbo Modules",
    ],
    technicalPoints: [
      "React Native app with Firebase Authentication, push notifications, and REST API integrations",
      "Camera capture and OpenCV-based image analysis workflows on the device",
      "Turbo Modules and native host projects for third-party SDK and platform-specific integration",
      "App Store and Google Play release participation",
      "Collaboration with backend developers and stakeholders on new features",
    ],
    context:
      "Vitadrop is a healthcare mobile application where users run tests through the phone camera. The product needed reliable auth, notifications, and camera-driven workflows on both platforms.",
    problem:
      "Camera pipelines and third-party SDKs do not fit cleanly into JavaScript alone. The app also had to ship to the stores with Firebase-backed auth and REST integrations.",
    solution:
      "Built the product in React Native with Firebase and REST APIs for core flows. Camera and SDK integration went through Turbo Modules and native host projects on iOS and Android.",
    constraints: [
      "Healthcare workflows require consistent behaviour on iOS and Android",
      "Camera and SDK integration needs native code paths",
      "Release process spans App Store and Google Play",
    ],
    architecture: [
      { decision: "React Native for product UI and flows", rationale: "One codebase for iOS and Android with shared business logic" },
      { decision: "Turbo Modules for camera and SDK access", rationale: "Native performance and third-party SDK integration where JS is not enough" },
      { decision: "Firebase + REST for backend integration", rationale: "Auth, notifications, and API-driven features aligned with the product stack" },
    ],
    tradeoffs: [
      { chosen: "Turbo Modules over pure JavaScript vision", rationale: "Camera frame rates and SDK APIs need native integration" },
      { chosen: "On-device analysis over cloud-only processing", rationale: "Lower latency and better offline behaviour during capture" },
    ],
    performanceNotes: [
      "Tuned camera and analysis workflows for production devices",
      "Kept UI responsive during capture and processing steps",
    ],
    results: [
      { metric: "iOS & Android", label: "production mobile app" },
      { metric: "Stores", label: "App Store & Google Play releases" },
      { metric: "Firebase", label: "auth & push notifications" },
    ],
  },
  {
    id: "waddingtons",
    num: "02",
    title: "Waddington's Auctions",
    type: "Client · Production",
    version: "Expo · iOS & Android",
    summary:
      "Production mobile auction platform built with Expo and React Native — catalog browsing, bidding, absentee bids, and two years of feature work while migrating auction functionality from web to mobile.",
    stack: ["Expo", "React Native", "TypeScript", "REST API", "Redux Toolkit", "Firebase", "Jest"],
    technicalPoints: [
      "Expo-based React Native app for iOS and Android",
      "REST API integration for catalog, bidding, and absentee bid flows",
      "Firebase analytics and crash reporting in production",
      "Redux Toolkit for auction and lot state across screens",
      "Two years of maintenance, new features, and platform migration support",
      "Jest tests for auction and bidding logic",
    ],
    context:
      "Waddington's needed a mobile auction platform so collectors could browse lots and bid from their phone, with functionality migrated from an existing web platform.",
    problem:
      "Auction flows span catalog browsing, live bidding, and absentee bids. The mobile app had to stay maintainable over a long lifecycle while new features landed regularly.",
    solution:
      "Built with Expo and React Native, integrated with REST APIs for auction data and bid submission. Redux Toolkit kept lot lists, detail screens, and bid panels in sync across the app.",
    constraints: [
      "Long-term maintenance over a two-year engagement",
      "Feature parity with web auction flows during migration",
      "Production stability with Firebase crash reporting",
    ],
    architecture: [
      { decision: "REST APIs for auction data and bids", rationale: "Server-backed catalog and bid flows aligned with the existing platform" },
      { decision: "Centralized state in Redux Toolkit", rationale: "Consistent lot and bid data across list, detail, and bid screens" },
      { decision: "Expo for iOS and Android delivery", rationale: "Shared codebase with store release support" },
    ],
    tradeoffs: [
      { chosen: "Structured Redux state over ad-hoc props", rationale: "Easier to extend as auction flows grew over two years" },
      { chosen: "Incremental migration from web", rationale: "Deliver mobile value while web platform remained in use" },
    ],
    performanceNotes: [
      "Stable list scrolling during busy catalog browsing",
      "Maintained production quality through ongoing feature work",
    ],
    results: [
      { metric: "2+ years", label: "production maintenance" },
      { metric: "Web → mobile", label: "auction migration" },
      { metric: "Production", label: "iOS & Android app" },
    ],
  },
  {
    id: "amako",
    num: "03",
    title: "Amako",
    type: "Client · Production",
    version: "React Native · iOS & Android",
    summary:
      "Workforce management app for field engineers — offline data storage, WebSocket-based real-time sync, React Native upgrade, and ongoing feature delivery.",
    stack: ["React Native", "TypeScript", "WebSockets", "SQLite", "Firebase", "Redux Toolkit"],
    technicalPoints: [
      "Offline data storage for field workflows without reliable connectivity",
      "WebSocket-based real-time synchronization with the backend",
      "Upgraded the project from an outdated React Native version to a modern release",
      "New features and performance improvements while preserving business workflows",
      "Production support for engineers using the app in the field",
    ],
    context:
      "Amako is a workforce management application used by field engineers who need job data on site, often with poor network coverage.",
    problem:
      "Field teams cannot rely on constant connectivity. The app had to work offline, sync when possible, and stay on a supported React Native version.",
    solution:
      "Implemented offline storage and WebSocket sync so engineers could keep working without a connection. Upgraded React Native and delivered features without breaking existing workflows.",
    constraints: [
      "Unreliable mobile networks at job sites",
      "Existing business workflows could not break during upgrades",
      "Real-time updates needed when connectivity returned",
    ],
    architecture: [
      { decision: "Offline-first local storage", rationale: "Field engineers need data available without a network" },
      { decision: "WebSockets for real-time sync", rationale: "Live updates when connectivity is available" },
      { decision: "React Native upgrade in place", rationale: "Modern toolchain without rewriting the product" },
    ],
    tradeoffs: [
      { chosen: "Offline storage over online-only flows", rationale: "Field use cases fail without local data" },
      { chosen: "Incremental upgrade over full rewrite", rationale: "Lower risk for active production users" },
    ],
    performanceNotes: [
      "Improved app performance after the React Native upgrade",
      "Maintained sync reliability across network interruptions",
    ],
    results: [
      { metric: "Offline-first", label: "field workflows" },
      { metric: "WebSockets", label: "real-time sync" },
      { metric: "RN upgrade", label: "modern release" },
    ],
  },
  {
    id: "vidalytics",
    num: "04",
    title: "Vidalytics Admin Platform",
    type: "Client · Web",
    version: "React · Analytics dashboards",
    summary:
      "Video analytics and player management platform — analytics dashboards, player configuration, and new functionality delivered with product managers and designers in Agile sprints.",
    stack: ["React", "TypeScript", "Redux Toolkit", "React Query", "GraphQL"],
    technicalPoints: [
      "Analytics dashboards for video and player metrics",
      "Player configuration and management features",
      "New functionality based on business requirements",
      "Collaboration with product managers, designers, and engineers in Agile",
    ],
    context:
      "Vidalytics is an admin platform for managing video players and reviewing analytics. The team needed reliable dashboards and configuration tools for internal users.",
    problem:
      "Analytics views and player settings change frequently. The UI had to stay maintainable while new business requirements landed each sprint.",
    solution:
      "Built dashboard and configuration features in React with TypeScript, integrated with backend APIs, and iterated with the product team on each release cycle.",
    constraints: [
      "Dashboards must reflect live business metrics accurately",
      "Configuration flows touch production player behaviour",
      "Agile delivery with cross-functional stakeholders",
    ],
    architecture: [
      { decision: "React component architecture for dashboards", rationale: "Reusable views as analytics requirements grew" },
      { decision: "Typed API integration", rationale: "Safer changes across dashboard and config modules" },
      { decision: "Agile iteration with product and design", rationale: "Features aligned with business priorities each sprint" },
    ],
    tradeoffs: [
      { chosen: "Structured dashboard modules over one-off screens", rationale: "Easier to extend as analytics needs evolved" },
      { chosen: "Incremental feature delivery", rationale: "Ship value while backend and product requirements changed" },
    ],
    performanceNotes: [
      "Dashboard views structured for maintainability as metrics grew",
      "Configuration flows kept consistent across player types",
    ],
    results: [
      { metric: "Dashboards", label: "video analytics" },
      { metric: "Player config", label: "management features" },
      { metric: "Agile", label: "cross-functional delivery" },
    ],
  },
  {
    id: "audiobook",
    num: "05",
    title: "Audiobook Application",
    type: "Client · Mobile",
    version: "React Native · iOS & Android",
    summary:
      "React Native audiobook app with audio playback, offline content storage in SQLite, and REST API integration for content sync and user management.",
    stack: ["React Native", "TypeScript", "SQLite", "REST API"],
    technicalPoints: [
      "Audio playback functionality for audiobook content",
      "Offline content storage using SQLite",
      "REST APIs for content synchronization and user management",
      "Bug fixing and stability improvements in production",
    ],
    context:
      "The audiobook app let users listen to content on mobile with offline access — a common pattern where playback and local storage both matter.",
    problem:
      "Users expect smooth playback and downloaded content without constant network access. The app needed reliable sync and stable audio handling.",
    solution:
      "Implemented playback and SQLite-backed offline storage in React Native, with REST APIs for sync and account management. Focused on stability through maintenance and bug fixes.",
    constraints: [
      "Playback must stay stable during background use",
      "Offline downloads need consistent storage management",
      "API sync must not corrupt local library state",
    ],
    architecture: [
      { decision: "SQLite for offline content", rationale: "Reliable local storage for downloaded audiobooks" },
      { decision: "REST APIs for sync and accounts", rationale: "Server-backed library and user management" },
      { decision: "React Native for iOS and Android", rationale: "Shared playback and storage logic across platforms" },
    ],
    tradeoffs: [
      { chosen: "Local SQLite over streaming-only", rationale: "Offline listening is core to the product" },
      { chosen: "Stability work over new features", rationale: "Playback reliability matters most for users" },
    ],
    performanceNotes: [
      "Improved application stability through targeted bug fixes",
      "Offline storage kept library access reliable without network",
    ],
    results: [
      { metric: "SQLite", label: "offline storage" },
      { metric: "REST", label: "content sync" },
      { metric: "Playback", label: "audio features" },
    ],
  },
  {
    id: "focusguard",
    num: "06",
    title: "FocusGuard",
    type: "Personal project · Mobile",
    version: "In development · iOS & Android",
    summary:
      "Focus and screen-time app in active development with Expo and React Native — Turbo Modules on Android for UsageStats access, local session storage, and Firebase for analytics.",
    stack: ["Expo", "React Native", "TypeScript", "Firebase", "Turbo Modules", "SQLite", "Jest"],
    technicalPoints: [
      "Expo and React Native for iOS and Android from one codebase",
      "Turbo Modules on Android for OS-level UsageStats and screen-time controls",
      "Firebase analytics and crash reporting for pre-release builds",
      "Local SQLite storage so sessions survive app restarts",
      "Jest unit tests for core session logic",
    ],
    context:
      "FocusGuard helps people stay focused on their phone — tracking sessions, monitoring app usage, and enforcing limits the user sets.",
    problem:
      "Screen-time features need platform APIs that JavaScript cannot access directly. Background reliability and accurate usage data are critical for trust.",
    solution:
      "React Native for most of the app, with Turbo Modules on Android where the OS requires native access to UsageStats. Session data is stored locally first; Firebase covers analytics during development.",
    constraints: [
      "Android UsageStats requires native integration",
      "Session data must survive app restarts",
      "Pre-release builds need crash and usage visibility",
    ],
    architecture: [
      { decision: "React Native + Turbo Modules", rationale: "Shared UI and logic; native access only where the OS requires it" },
      { decision: "SQLite for sessions", rationale: "Tracking keeps working when the network drops" },
      { decision: "Firebase for pre-release telemetry", rationale: "Crash and usage signals before store release" },
    ],
    tradeoffs: [
      { chosen: "Turbo Modules over pure JavaScript", rationale: "UsageStats and screen-time APIs are not exposed to JS" },
      { chosen: "Local-first session storage", rationale: "Focus data should not depend on network availability" },
    ],
    performanceNotes: [
      "Reduced unnecessary re-renders on the session dashboard",
      "Kept timers responsive during active focus sessions",
    ],
    results: [
      { metric: "Pre-release", label: "iOS & Android builds" },
      { metric: "Turbo Modules", label: "Android UsageStats" },
      { metric: "SQLite", label: "local session storage" },
    ],
  },
];
