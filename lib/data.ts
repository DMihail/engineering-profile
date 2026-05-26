import {
  Smartphone, Layers, Eye, Code2, Cpu, Activity,
  Globe, Monitor, Wind, GitBranch, Zap, Mail,
  Server, Shield, Database, Wifi, Boxes,
  Gauge, Network, Terminal, Workflow, RefreshCw, Package, BarChart2,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { SITE_EMAIL } from "@/lib/config";
import type { Capability, SkillLayer, CaseStudy, XP, SocialLink } from "@/lib/types";

export const NAV = ["impact", "projects", "skills", "experience", "contact"];

export const CAPABILITIES: Capability[] = [
  {
    id: "perf", mod: "sys.mobile.performance", kpi: "< 16ms", kpiSub: "frame budget",
    icon: Gauge,
    title: "Mobile Performance Engineering",
    desc: "Frame-level profiling and re-render elimination for sustained 60fps on constrained hardware. JS thread optimization, Hermes engine tuning, TTI reduction, and Metro bundle audits.",
    tags: ["react-native", "hermes", "flipper", "60fps"],
    appliedIn: "FocusGuard · 3 client React Native productions",
  },
  {
    id: "rt", mod: "sys.realtime.camera", kpi: "< 100ms", kpiSub: "frame latency",
    icon: Network,
    title: "Real-time Camera & Frame Processing",
    desc: "Vision Camera frame pipelines with OpenCV for on-device computer vision. WebSocket pub-sub architectures for competitive bidding and live location tracking at 2,000+ concurrent sessions.",
    tags: ["vision-camera", "opencv", "websocket", "redis"],
    appliedIn: "Waddingtons bidding engine · Vitadrop location tracking",
  },
  {
    id: "native", mod: "sys.native.integration", kpi: "zero-copy", kpiSub: "JSI bridge",
    icon: Terminal,
    title: "Native Module Integration",
    desc: "Swift and Kotlin modules bridged via JSI and TurboModules for OS-level capabilities — DeviceActivity, BGTaskScheduler, screen-time enforcement, biometric auth, and file system access.",
    tags: ["swift", "kotlin", "jsi", "turbomodules"],
    appliedIn: "FocusGuard (Swift JSI) · Vitadrop · 4 client codebases",
  },
  {
    id: "arch", mod: "sys.platform.architecture", kpi: "iOS + Android", kpiSub: "+ Web shared",
    icon: Layers,
    title: "Cross-platform Architecture",
    desc: "Offline-first systems with local-first persistence and async sync queues. Shared component layers across iOS, Android, and web with full platform idiom preservation and code-sharing strategies.",
    tags: ["mmkv", "offline-first", "monorepo", "ios", "android"],
    appliedIn: "Vitadrop · client monorepo work",
  },
  {
    id: "state", mod: "sys.state.architecture", kpi: "normalized", kpiSub: "entity cache",
    icon: Workflow,
    title: "State Management Architecture",
    desc: "Redux Toolkit entity adapters with normalized caches, RTK Query for server state, and Zustand for feature-scoped state. Designed for predictable data flow in complex multi-screen mobile applications.",
    tags: ["redux-toolkit", "rtk-query", "zustand", "react-query"],
    appliedIn: "Waddingtons · Vitadrop · all client work",
  },
];

export const SKILL_LAYERS: SkillLayer[] = [
  {
    id: "mobile", layer: "Mobile Systems Engineering", desc: "Core runtime, animation, device capabilities",
    scope: "primary platform layer", projectRefs: "FocusGuard · Vitadrop",
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
    id: "realtime", layer: "Real-time Processing Systems", desc: "Streaming, messaging, event pipelines",
    scope: "data flow & pub-sub", projectRefs: "Waddingtons · Vitadrop",
    skills: [
      { name: "WebSockets",  primary: true,  icon: Wifi     },
      { name: "Firebase",    primary: true,  icon: Shield   },
      { name: "Node.js",     primary: true,  icon: Server   },
      { name: "Redis",       primary: false, icon: Boxes    },
      { name: "PostgreSQL",  primary: false, icon: Database },
      { name: "OpenCV",      primary: false, icon: Eye      },
    ],
  },
  {
    id: "frontend", layer: "Frontend Architecture Systems", desc: "Web interfaces, rendering, component systems",
    scope: "web surface layer", projectRefs: "Waddingtons · client work",
    skills: [
      { name: "React",        primary: true,  icon: Globe     },
      { name: "Next.js",      primary: true,  icon: Monitor   },
      { name: "TypeScript",   primary: true,  icon: Code2     },
      { name: "GraphQL",      primary: false, icon: GitBranch },
      { name: "Tailwind CSS", primary: false, icon: Wind      },
      { name: "Vite",         primary: false, icon: Zap       },
    ],
  },
  {
    id: "native", layer: "Native Integration Layer", desc: "OS bridges, platform APIs, binary modules",
    scope: "platform boundary", projectRefs: "FocusGuard · Vitadrop",
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
    id: "perf", layer: "Performance Optimization Systems", desc: "Profiling, instrumentation, bundle analysis",
    scope: "runtime & build audit", projectRefs: "FocusGuard · contract work",
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
    id: "state", layer: "State Management Architecture", desc: "Global state, server cache, reactive patterns",
    scope: "application data layer", projectRefs: "Vitadrop · Waddingtons",
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
    id: "focusguard", num: "01", title: "FocusGuard",
    type: "Pet Project", archType: "native-bridge", version: "v1.4 · iOS",
    summary: "iOS screen-time enforcement without a public API — native Swift extension bridged to React Native via JSI.",
    archSig: "DeviceActivityMonitor extension → JSI bridge → RN state layer → SQLite schedule store",
    stack: ["React Native", "Expo", "TypeScript", "Swift", "SQLite", "BGTaskScheduler"],
    context: "Solo-built iOS productivity app exploring the limits of React Native at the OS boundary. Built to validate a native bridging approach for screen-time enforcement — a capability Apple has never exposed through any public API.",
    problem: "iOS provides no public API for programmatic screen-time enforcement. Blocking apps requires native extensions operating entirely outside the React Native surface area — impossible through the JS layer alone, with no documentation for extension↔host communication patterns.",
    constraints: [
      "DeviceActivityMonitor requires entitlements unavailable to standard developer accounts",
      "iOS strictly limits background execution time for all app extensions",
      "App Store guidelines prohibit Screen Time API misuse — strict policy compliance required",
      "No community documentation exists for extension↔React Native bridge architecture",
    ],
    approach: "Implemented a native Swift DeviceActivityMonitor extension with a bidirectional JSI-compatible bridge. Built a scheduling system using BGTaskScheduler within iOS's strict execution budget, plus a custom entitlement negotiation flow for App Store compliance.",
    architecture: [
      { decision: "DeviceActivityMonitor (not AppTracker)",  rationale: "Direct OS-level control — no polling, instant enforcement at block time" },
      { decision: "JSI bridge (not legacy NativeModules)",   rationale: "Eliminates JSON serialization overhead on high-frequency schedule callbacks" },
      { decision: "SQLite (not AsyncStorage)",               rationale: "Relational queries required for overlapping time-block schedule logic" },
      { decision: "BGTaskScheduler (not polling)",           rationale: "Stays within iOS execution budget with no private API violations" },
    ],
    tradeoffs: [
      { chosen: "JSI over NativeModules",          rationale: "Synchronous, zero-copy native access — NativeModules serialize all args through JSON" },
      { chosen: "SQLite over Realm",               rationale: "Smaller footprint, no licensing overhead — Realm adds ~2 MB to bundle for a solo app" },
      { chosen: "BGTaskScheduler over persistent", rationale: "Stays within App Store policy at the cost of reduced real-time enforcement granularity" },
    ],
    results: [
      { metric: "2,400+",      label: "downloads"            },
      { metric: "4.8★",        label: "App Store rating"     },
      { metric: "−47 min/day", label: "avg. screen time cut" },
    ],
  },
  {
    id: "waddingtons", num: "02", title: "Waddingtons",
    type: "Client · Production", archType: "event-driven", version: "v3.1 · Web",
    summary: "Real-time competitive bidding engine for a UK auction house — sub-100ms state propagation at 2,000+ concurrent sessions.",
    archSig: "PG optimistic lock → Redis pub/sub fan-out → WebSocket broadcast → client bid queue + exponential backoff",
    stack: ["React", "Next.js", "TypeScript", "WebSockets", "PostgreSQL", "Redis"],
    context: "UK heritage auction house processing antique and fine-art lots. Existing REST system could not support competitive bidding at scale — race conditions caused disputed lot outcomes requiring manual resolution after every major event.",
    problem: "REST polling introduced race conditions where two users could submit winning bids within the same polling window. Financial accuracy requirements made optimistic UI impermissible — every confirmation required authoritative server truth before display.",
    constraints: [
      "Financial accuracy: optimistic UI for bid confirmations is not permissible",
      "UK consumer protection law requires full immutable audit trails for every bid",
      "Peak concurrency: 2,000+ simultaneous bidders during major auction events",
      "Network interruptions must not silently discard queued client bids",
    ],
    approach: "Redesigned the bid engine with PostgreSQL optimistic locking to eliminate race conditions at the database layer. Replaced polling with Redis pub/sub broadcasting authoritative state to all clients via WebSocket. Implemented client-side bid queuing with exponential-backoff reconnection and server-side event replay.",
    architecture: [
      { decision: "Redis pub/sub (not PG NOTIFY)",        rationale: "Decoupled fan-out to 2k+ clients without load on the primary database" },
      { decision: "Optimistic locking (not pessimistic)", rationale: "Prevents race conditions without table-level locks in the hot bid path" },
      { decision: "Server-authoritative state",           rationale: "Financial accuracy requires confirmed server truth before any client confirmation" },
      { decision: "Exponential backoff on WS reconnect",  rationale: "Prevents thundering-herd storms during network partition recovery" },
    ],
    tradeoffs: [
      { chosen: "Redis over PG NOTIFY",             rationale: "NOTIFY ties broadcast throughput to primary DB capacity — Redis scales independently" },
      { chosen: "WebSocket over Server-Sent Events", rationale: "Bidirectional channel required for client bid queue — SSE is receive-only" },
      { chosen: "Optimistic over pessimistic locks", rationale: "Higher read throughput — pessimistic locks block all concurrent readers" },
    ],
    results: [
      { metric: "0",        label: "duplicate bids post-launch" },
      { metric: "800→80ms", label: "bid confirmation latency"   },
      { metric: "£2M+",     label: "auction volume processed"   },
    ],
  },
  {
    id: "vitadrop", num: "03", title: "Vitadrop",
    type: "Client · Production (Confidential)", archType: "offline-first", version: "v2.0 · iOS / Android",
    summary: "Offline-resilient medical intake forms with 40+ conditional branches — local-first architecture for IV therapy compliance.",
    archSig: "MMKV local state → bg sync queue → Firebase conflict resolver → server-side medical validation gate",
    stack: ["React Native", "Expo", "TypeScript", "Firebase", "MMKV", "Google Maps"],
    context: "On-demand IV vitamin therapy startup, London. Nurses visit clients at home. App replaced a broken web booking flow and added real-time nurse location tracking. Medical intake requires UK health data compliance.",
    problem: "Medical intake forms with 40+ conditional branches needed to operate on unreliable connections. Connectivity loss mid-form was silently corrupting incomplete health declarations — creating legal exposure and clinical safety risks for IV therapy administration.",
    constraints: [
      "GDPR compliance required for all health data storage and transmission",
      "No booking confirmation until full server-side medical validation passes",
      "40+ conditional branches dependent on prior answer state throughout the form",
      "Sync must resolve conflicts accurately after reconnection — zero data loss permitted",
    ],
    approach: "Built a JSON-schema-driven declarative form engine with local-first persistence via MMKV, enabling full form completion offline. Implemented a background sync queue with Firebase conflict resolution, per-submission integrity checksums, and a medical validation gate on sync completion.",
    architecture: [
      { decision: "MMKV (not AsyncStorage)",              rationale: "Synchronous reads required for the real-time conditional form state machine" },
      { decision: "JSON Schema (not hardcoded logic)",    rationale: "Product team updates form branches without a new app release" },
      { decision: "Local-first then sync",                rationale: "Mobile connectivity unreliable in home healthcare field contexts" },
      { decision: "Firebase Firestore (not custom sync)", rationale: "Built-in real-time conflict resolution — saves building retry ordering from scratch" },
    ],
    tradeoffs: [
      { chosen: "MMKV over Realm",                  rationale: "Smaller footprint, synchronous API, no licensing — Realm overhead is wasteful for flat form state" },
      { chosen: "JSON Schema over React Hook Form", rationale: "RHF has no conditional logic engine — schema enables form updates without app deploys" },
      { chosen: "Firebase over custom REST sync",   rationale: "Custom sync requires retry ordering and conflict resolution built from scratch" },
    ],
    results: [
      { metric: "3×",  label: "booking completion vs. web" },
      { metric: "98%", label: "intake form completion rate" },
      { metric: "0",   label: "data-loss incidents in prod." },
    ],
  },
];

export const XP_ENTRIES: XP[] = [
  {
    company: "Freelance / Contract", role: "Senior React Native Developer",
    period: "2022 – Present", location: "Remote · EU", current: true,
    systems: "Waddingtons bidding engine · Vitadrop medical forms · FocusGuard iOS native bridge",
    items: [
      "Delivered Waddingtons real-time bidding engine end-to-end — £2M+ in processed auction volume",
      "Built Vitadrop cross-platform mobile app — offline-first medical intake, 3× booking conversion improvement",
      "Authored native Swift & Kotlin modules via JSI across 4 production codebases — DeviceActivity, biometric, file system",
      "Implemented Redux Toolkit entity adapters reducing client-side fetch overhead by 40% across 2 client apps",
      "Architected shared RN component libraries adopted across 3 client monorepos",
    ],
  },
  {
    company: "Digital Agency", role: "Frontend Developer",
    period: "2020 – 2022", location: "Kyiv, Ukraine", current: false,
    systems: "6 React Native products · Metro bundle optimization · Flipper performance profiling",
    items: [
      "Led mobile development for 6 shipped React Native products from spec to App Store",
      "Reduced JS bundle size 34% via Metro code-splitting and tree-shaking audit",
      "Profiled and eliminated 60fps rendering regressions in 3 production apps using Flipper",
      "Mentored 2 junior engineers on RN performance patterns and native bridge architecture",
      "Established lint, testing, and CI/CD standards via GitHub Actions and Fastlane",
    ],
  },
  {
    company: "Startup", role: "Junior Frontend Developer",
    period: "2018 – 2020", location: "Kyiv, Ukraine", current: false,
    systems: "React component library · WebSocket trading dashboard · CI/CD pipeline",
    items: [
      "Built React component library serving 40k daily active users",
      "Integrated WebSocket feeds with sub-100ms display latency on live trading dashboard",
      "Implemented CI/CD pipeline reducing deploy cycle from 45 to 22 minutes",
    ],
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub",   hint: "github.com/mykhailo-dzhezhelo",     icon: GithubIcon,   href: "https://github.com" },
  { label: "LinkedIn", hint: "linkedin.com/in/mykhailo-dzhezhelo", icon: LinkedinIcon, href: "https://linkedin.com" },
  { label: "Email",    hint: SITE_EMAIL,                           icon: Mail,         href: `mailto:${SITE_EMAIL}` },
];

export const TRACK_RECORD = [
  {
    label: "iOS screen-time enforcement without a public API",
    sub:    "Swift DeviceActivity · JSI bridge · BGTaskScheduler",
    metric: "4.8★ · 2,400+ DL",
  },
  {
    label: "Real-time auction bidding at 2k+ concurrency",
    sub:    "WebSocket · Redis pub/sub · PG optimistic locking",
    metric: "£2M+ · 0 race conditions",
  },
  {
    label: "Offline medical intake for field healthcare",
    sub:    "MMKV · Firebase sync queue · JSON Schema engine",
    metric: "98% completion · 0 data loss",
  },
  {
    label: "React Native bundle reduction of 34% via audit",
    sub:    "Metro · Hermes profiler · tree-shaking · Flipper",
    metric: "60fps maintained",
  },
];
