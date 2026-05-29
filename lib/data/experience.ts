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
    company: "Elementica", role: "React Native Developer",
    period: "03/2025 – 03/2026", location: "Uzhgorod, Ukraine", current: false,
    systems: "Expo · React Native · Redux Toolkit · Firebase · Jest · Detox · App Store & Google Play",
    tags: ["Expo", "React Native", "TypeScript", "Redux Toolkit", "Firebase", "Jest", "Detox", "App Store", "Google Play"],
    highlight: "Expo/React Native apps with Firebase, automated testing, and both store releases",
    items: [
      "Developed and maintained Expo and React Native apps for iOS and Android",
      "Structured app state with Redux Toolkit and integrated REST APIs",
      "Set up Firebase auth, analytics, crash reporting, and push notifications",
      "Wrote Jest unit tests and Detox E2E flows for critical user paths",
      "Managed App Store and Google Play releases and post-launch updates",
    ],
  },
  {
    company: "NetGame", role: "React Native Developer",
    period: "06/2024 – 01/2025", location: "Kiev · Remote", current: false,
    systems: "Expo · React Native · WebSockets · Firebase · Jest · TestFlight & Google Play",
    tags: ["Expo", "React Native", "WebSockets", "Firebase", "Jest", "TestFlight", "Google Play"],
    highlight: "Expo/React Native in gaming — live features, Firebase, and store releases",
    relatedCaseId: "waddingtons",
    items: [
      "Built Expo and React Native features for iOS and Android in a gaming product",
      "Implemented live updates via WebSockets connected to backend services",
      "Integrated Firebase analytics, crash reporting, and third-party APIs",
      "Delivered TestFlight and Google Play builds with Jest test coverage",
    ],
  },
  {
    company: "Kultprosvet", role: "Full-Stack Developer",
    period: "03/2021 – 01/2023", location: "Dnepr office", current: false,
    systems: "React · React Native · Node.js (Express, NestJS) · GraphQL · Firebase",
    tags: ["React", "React Native", "Express.js", "NestJS", "GraphQL", "Node.js", "Firebase"],
    highlight: "Full-stack role — React Native, React web apps, and Node.js backends",
    items: [
      "Delivered mobile apps with React Native and web apps with React",
      "Built backend services in Node.js using Express and NestJS",
      "Integrated GraphQL APIs and Firebase across client applications",
      "Developed admin panels and internal tools for product teams",
    ],
  },
  {
    company: "Devsteam.mobi", role: "React Native Developer",
    period: "03/2020 – 2021", location: "Remote", current: false,
    systems: "React Native · REST APIs · Postman",
    tags: ["React Native", "REST APIs", "Postman"],
    highlight: "Contract React Native work — features, API integration, and refactors",
    items: [
      "Delivered new features on existing React Native codebases",
      "Refactored legacy modules and improved maintainability",
      "Debugged QA-reported issues across iOS and Android builds",
      "Validated REST APIs with Postman during integration work",
    ],
  },
  {
    company: "Absolutist", role: "JavaScript Developer",
    period: "09/2018 – 06/2019", location: "Dnepr office", current: false,
    systems: "Browser games · ActionScript → JavaScript/TypeScript",
    tags: ["JavaScript", "TypeScript", "ActionScript"],
    highlight: "Entry into professional development — browser games in TypeScript",
    items: [
      "Migrated browser games from ActionScript to JavaScript and TypeScript",
      "Fixed production bugs and improved runtime performance",
    ],
  },
];
