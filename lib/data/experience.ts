import type { XP, Education } from "@/lib/types";

export const EDUCATION: Education[] = [
  {
    institution: "Oles Honchar Dnipro National University",
    field: "Bachelor's degree in Systems Analysis",
    period: "2016 — 2020",
  },
  {
    institution: "Oles Honchar Dnipro National University",
    field: "Master's degree in Systems Analysis",
    period: "2020 — 2021",
  },
];

export const XP_ENTRIES: XP[] = [
  {
    company: "Elementica",
    role: "React Native & Web Developer",
    period: "03/2025 – 03/2026",
    location: "Uzhgorod, Ukraine",
    current: false,
    systems: "Expo · React Native · React · Material UI · Redux Toolkit · Firebase · Jest · Detox · App Store & Google Play",
    tags: ["Expo", "React Native", "React", "Material UI", "TypeScript", "Redux Toolkit", "Firebase", "Jest", "Detox", "App Store", "Google Play"],
    highlight: "Mobile and web in parallel — Expo/React Native for iOS and Android plus React web UIs with Material UI.",
    items: [
      "Built React web interfaces with Material UI alongside Expo and React Native mobile apps",
      "Shipped App Store and Google Play releases with post-launch hotfix turnaround",
      "Structured app state with Redux Toolkit and integrated REST APIs across mobile and web",
      "Set up Firebase Auth, analytics, Crashlytics, and push notifications; Jest and Detox on critical paths",
    ],
  },
  {
    company: "NetGame",
    role: "React Native Developer",
    period: "06/2024 – 01/2025",
    location: "Kiev · Remote",
    current: false,
    systems: "Expo · React Native · WebSockets · Firebase · Jest · TestFlight & Google Play",
    tags: ["Expo", "React Native", "WebSockets", "Firebase", "Jest", "TestFlight", "Google Play"],
    highlight: "Live auction features in a gaming product — WebSockets, Firebase, and store builds under peak load.",
    relatedCaseId: "waddingtons",
    relatedCaseTitle: "Waddington's Auctions",
    items: [
      "Built live bidding UI in Expo/React Native with WebSocket updates during high-traffic auction events",
      "Integrated Firebase analytics and crash reporting to trace production issues on iOS and Android",
      "Delivered TestFlight and Google Play builds with Jest coverage on auction and wallet logic",
      "Added reconnect handling so bid state recovered cleanly after mobile network drops",
    ],
  },
  {
    company: "Kultprosvet",
    role: "Full-Stack Developer",
    period: "03/2021 – 01/2023",
    location: "Dnepr office",
    current: false,
    systems: "React · React Native · Node.js (Express, NestJS) · GraphQL · Firebase",
    tags: ["React", "React Native", "Express.js", "NestJS", "GraphQL", "Node.js", "Firebase"],
    highlight: "Full-stack delivery — React Native and React clients backed by Node.js (Express/NestJS) and GraphQL.",
    items: [
      "Delivered React Native apps and React web products from shared API contracts with backend teams",
      "Built Node.js services in Express and NestJS consumed by mobile and admin clients",
      "Integrated GraphQL and Firebase across apps — auth, realtime data, and internal tooling",
      "Shipped admin panels that reduced manual ops work for product and support teams",
    ],
  },
  {
    company: "Devsteam.mobi",
    role: "React Native Developer",
    period: "03/2020 – 2021",
    location: "Remote",
    current: false,
    systems: "React Native · REST APIs · Postman",
    tags: ["React Native", "REST APIs", "Postman"],
    highlight: "Contract React Native work — feature delivery, API integration, and legacy refactors on client codebases.",
    items: [
      "Delivered new user-facing features on existing React Native apps for iOS and Android",
      "Refactored legacy modules to improve maintainability and cut regression risk before releases",
      "Debugged QA-reported issues across platforms and validated REST APIs with Postman during integration",
    ],
  },
  {
    company: "Absolutist",
    role: "JavaScript Developer",
    period: "09/2018 – 06/2019",
    location: "Dnepr office",
    current: false,
    systems: "Browser games · ActionScript → JavaScript/TypeScript",
    tags: ["JavaScript", "TypeScript", "ActionScript"],
    highlight: "First production role — migrated browser games from ActionScript to TypeScript.",
    items: [
      "Migrated browser games from ActionScript to JavaScript and TypeScript with measurable load-time gains",
      "Fixed production bugs and profiling hotspots affecting gameplay on older browsers",
    ],
  },
];
