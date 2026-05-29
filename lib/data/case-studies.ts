import type { CaseStudy } from "@/lib/types";

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "focusguard",
    num: "01",
    title: "FocusGuard",
    type: "Personal project · Mobile",
    version: "In development · iOS & Android",
    summary:
      "Focus and screen-time app in active development with Expo — background tracking, native modules, and Detox-tested flows on both platforms. Not yet published to the stores.",
    stack: ["Expo", "React Native", "TypeScript", "Firebase", "Swift", "Kotlin", "SQLite", "Jest", "Detox"],
    technicalPoints: [
      "Expo and React Native for iOS and Android from one codebase",
      "Firebase analytics and crash reporting wired for pre-release builds",
      "Jest unit tests and Detox E2E flows on both platforms",
      "Background tracking on Android with foreground services",
      "Native modules for OS-level screen-time controls",
      "Local database so sessions survive app restarts",
    ],
    context:
      "I'm building FocusGuard to help people stay focused on their phone. It tracks focus sessions, monitors app usage, and enforces limits the user sets.",
    problem:
      "Focus apps live or die on background reliability. iOS and Android limit how long an app can run unseen, and users notice immediately if timers drift or the UI stutters.",
    solution:
      "React Native for most of the app, with native Android code where the OS requires it. Session data is stored locally first, then synced. The UI stays responsive even while tracking runs.",
    constraints: [
      "Background time is limited on both platforms",
      "Tracking must stay accurate without draining the battery",
      "Some features need native code, not JavaScript alone",
    ],
    architecture: [
      { decision: "React Native + native modules", rationale: "Shared UI and logic; native code only where the OS demands it" },
      { decision: "Local database for sessions", rationale: "Tracking keeps working when the network drops" },
      { decision: "Foreground service on Android", rationale: "Stable tracking during active focus sessions" },
    ],
    tradeoffs: [
      { chosen: "Native code over pure JavaScript", rationale: "Background tracking simply does not work reliably without it" },
      { chosen: "Less frequent sync", rationale: "Better battery life on mid-range phones" },
    ],
    performanceNotes: [
      "Cut unnecessary re-renders on the session dashboard",
      "Kept timers smooth during long focus sessions",
    ],
    results: [
      { metric: "Pre-release", label: "App Store & Google Play" },
      { metric: "Detox E2E", label: "iOS & Android flows" },
      { metric: "Native", label: "Swift & Kotlin modules" },
    ],
  },
  {
    id: "waddingtons",
    num: "02",
    title: "Waddington's Auctions",
    type: "Client · Production",
    version: "Expo · iOS & Android",
    summary:
      "Production auction app with live WebSocket bidding — integrated with Invaluable, built for peak traffic during live sales on iOS and Android.",
    stack: ["Expo", "React Native", "TypeScript", "WebSockets", "Redux Toolkit", "RTK Query", "Firebase", "Jest"],
    technicalPoints: [
      "Expo-based React Native app for iOS and Android",
      "Live bid updates over WebSockets",
      "Firebase analytics and crash reporting",
      "Jest tests for auction and bidding logic",
      "Redux Toolkit for auction and lot state",
      "Reconnect logic when mobile networks drop",
    ],
    context:
      "Waddington's needed a mobile app for their auction house, integrated with Invaluable so collectors could bid from their phone during live sales.",
    problem:
      "During a live auction, a delayed bid confirmation is a serious problem. Users need instant feedback, and the app must stay correct even with thousands of people online at once.",
    solution:
      "Built with Expo and React Native. Live updates come through WebSockets; the server is the source of truth for every bid. Redux keeps lot lists, detail screens, and bid panels in sync.",
    constraints: [
      "Thousands of users can be online during a single sale",
      "Bids must be confirmed by the server, not guessed on the client",
      "Mobile networks drop often during long sessions",
    ],
    architecture: [
      { decision: "WebSockets for live updates", rationale: "Faster than polling when hundreds of lots change at once" },
      { decision: "Centralized state in Redux", rationale: "Same lot data everywhere in the app" },
      { decision: "Server confirms every bid", rationale: "No duplicate or rejected bids from optimistic UI" },
    ],
    tradeoffs: [
      { chosen: "WebSockets over REST polling", rationale: "Lower delay during peak bidding" },
      { chosen: "Structured state over ad-hoc props", rationale: "Easier to extend as auction flows grew" },
    ],
    performanceNotes: [
      "Bid confirmation dropped from ~800 ms to ~80 ms",
      "Stable list scrolling during busy live events",
      "Graceful reconnect after network interruptions",
    ],
    results: [
      { metric: "800→80 ms", label: "bid confirmation time" },
      { metric: "0", label: "duplicate bids after launch" },
      { metric: "2,000+", label: "users online during live sales" },
    ],
  },
  {
    id: "vitadrop",
    num: "03",
    title: "Vitadrop",
    type: "Client project · Not publicly released",
    version: "iOS / Android · Confidential",
    summary:
      "Healthcare mobile app that analyzes test samples through the phone camera. Heavy image processing runs on the device, not in the cloud.",
    stack: ["React Native", "Expo", "TypeScript", "Vision Camera", "OpenCV", "Swift", "Kotlin"],
    technicalPoints: [
      "Camera capture with VisionCamera",
      "OpenCV image processing on the device",
      "Native modules for performance-critical steps",
      "Consistent behavior on both iOS and Android",
    ],
    context:
      "Vitadrop was a confidential healthcare project. The app guides the user through a test, captures images, and analyzes them on the phone.",
    problem:
      "Sending camera frames to a server adds delay and fails offline. The analysis pipeline had to run locally and still feel instant on average phones.",
    solution:
      "React Native for the UI, with native Swift/Kotlin modules and OpenCV for frame processing. Each step was tuned for mid-range Android hardware, not just flagship devices.",
    constraints: [
      "Camera processing must fit within phone CPU/GPU limits",
      "Results need to appear quickly during live capture",
      "iOS and Android had to behave the same for users",
    ],
    architecture: [
      { decision: "VisionCamera + native processing", rationale: "Direct access to camera frames without extra delay" },
      { decision: "OpenCV on the device", rationale: "No round-trip to a server during capture" },
      { decision: "Separate native modules per platform", rationale: "Each OS gets the fastest path available" },
    ],
    tradeoffs: [
      { chosen: "On-device processing over cloud API", rationale: "Faster and works without internet" },
      { chosen: "Native modules over JavaScript vision", rationale: "JavaScript cannot keep up with camera frame rates" },
    ],
    performanceNotes: [
      "Tuned pipelines for mid-tier Android devices",
      "Kept UI responsive while analysis runs",
    ],
    results: [
      { metric: "98%", label: "successful test runs in QA" },
      { metric: "<100 ms", label: "target per-frame processing" },
      { metric: "0", label: "data-loss incidents in testing" },
    ],
  },
  {
    id: "developer-inbox",
    num: "04",
    title: "Developer Inbox",
    type: "Full-stack project · Web",
    version: "React PWA + Next.js API",
    summary:
      "Full-stack contact pipeline: this Next.js site collects messages, a React PWA manages the inbox, and a Node.js API handles email replies with push notifications.",
    stack: ["React 19", "Next.js", "Node.js", "TypeScript", "Vite 8", "Firebase", "Zustand", "Tailwind CSS 4"],
    technicalPoints: [
      "Next.js contact API with reCAPTCHA and Firestore storage",
      "React PWA with live Firestore sync and push notifications",
      "Authenticated reply endpoint with nodemailer on the server",
      "Installable on phone and desktop; search, filters, and archive",
    ],
    context:
      "I built a complete contact workflow for this portfolio: public form on the Next.js site, private React inbox app, and server-side email replies — a practical full-stack setup I use daily.",
    problem:
      "A contact form alone sends everything to a generic inbox with no structure, no mobile alerts, and no way to reply in context without exposing admin tools on the public site.",
    solution:
      "Three parts working together: Next.js API on this site for intake and outbound email, a Vite + React PWA for reading and managing messages, and Firebase for auth, storage, and live sync.",
    constraints: [
      "Single-owner access — not a multi-user SaaS product",
      "Shared Firebase project between the portfolio and inbox app",
      "Push notification behavior varies by browser and PWA install mode",
    ],
    architecture: [
      { decision: "Next.js API for contact and replies", rationale: "Keeps SMTP credentials and validation on the server" },
      { decision: "Separate React PWA for the inbox", rationale: "Private admin experience without public routes" },
      { decision: "Firestore for live message sync", rationale: "Instant updates on mobile without polling" },
    ],
    tradeoffs: [
      { chosen: "Dedicated inbox app over embedded admin", rationale: "Clear security boundary and better mobile UX" },
      { chosen: "Server-sent email over client-side SMTP", rationale: "Credentials never exposed to the browser" },
    ],
    performanceNotes: [
      "Memoized Zustand selectors keep filtered lists fast",
      "Responsive layouts split mobile and desktop shell code",
    ],
    results: [
      { metric: "Full-stack", label: "form → inbox → reply" },
      { metric: "Installable", label: "PWA on phone & desktop" },
      { metric: "Live sync", label: "Firestore updates" },
    ],
  },
];
