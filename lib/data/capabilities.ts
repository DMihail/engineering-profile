import { Smartphone, Monitor, Server, Network, Terminal, Gauge } from "lucide-react";
import type { Capability } from "@/lib/types";

export const CAPABILITIES: Capability[] = [
  {
    id: "mobile", kpi: "iOS + Android", kpiSub: "React Native",
    icon: Smartphone,
    title: "React Native mobile apps",
    desc: "Expo and React Native for iOS and Android — UI, state, native modules, and releases to App Store and Google Play.",
    tags: ["expo", "react-native", "typescript", "ios", "android"],
    appliedIn: "FocusGuard · Waddingtons · 5+ clients",
  },
  {
    id: "web", kpi: "React + Next.js", kpiSub: "web apps",
    icon: Monitor,
    title: "Web development",
    desc: "Production websites and web applications with React and Next.js — responsive UI, forms, admin panels, and installable PWAs.",
    tags: ["react", "next.js", "vite", "tailwind", "pwa"],
    appliedIn: "Developer Inbox · Kultprosvet · this site",
  },
  {
    id: "backend", kpi: "Node.js", kpiSub: "APIs & services",
    icon: Server,
    title: "Backend & APIs",
    desc: "Server-side logic with Node.js (Express, NestJS), REST and GraphQL APIs, Firebase, and database integration — connected to mobile and web clients.",
    tags: ["node.js", "express", "nestjs", "graphql", "firebase"],
    appliedIn: "Kultprosvet · Developer Inbox · portfolio API",
  },
  {
    id: "rt", kpi: "< 100 ms", kpiSub: "live updates",
    icon: Network,
    title: "Live features",
    desc: "WebSockets for live bidding, push notifications, and real-time sync. Camera processing with OpenCV when analysis must run on the device.",
    tags: ["websockets", "fcm", "opencv", "vision-camera"],
    appliedIn: "Waddingtons · Vitadrop · Developer Inbox",
  },
  {
    id: "native", kpi: "Swift + Kotlin", kpiSub: "when needed",
    icon: Terminal,
    title: "Native iOS & Android",
    desc: "Swift and Kotlin modules for platform features JavaScript cannot reach — biometrics, background tasks, screen-time controls, and camera pipelines.",
    tags: ["swift", "kotlin", "native-bridge", "turbomodules"],
    appliedIn: "FocusGuard · Vitadrop · 4 clients",
  },
  {
    id: "perf", kpi: "60 fps", kpiSub: "production quality",
    icon: Gauge,
    title: "Testing & reliability",
    desc: "Jest unit tests and Detox E2E on iOS and Android, Firebase analytics and crash reporting, profiling on real devices, and stable UI under load.",
    tags: ["jest", "detox", "crashlytics", "hermes", "flipper"],
    appliedIn: "FocusGuard · Waddingtons · all projects",
  },
];
