import {
  Smartphone, Layers, Eye, Code2, Cpu, Activity,
  Globe, Monitor, Wind, GitBranch, Zap,
  Server, Shield, Database, Wifi, Boxes,
  Workflow, RefreshCw, Package,
  PenTool, Wrench, Bug, CircleCheck,
} from "lucide-react";
import type { SkillLayer } from "@/lib/types";

export const SKILL_LAYERS: SkillLayer[] = [
  {
    id: "mobile", layer: "Mobile · Expo & React Native", desc: "iOS and Android — UI, offline storage, Firebase, App Store & Google Play",
    projectRefs: "FocusGuard · Waddingtons · Vitadrop",
    skills: [
      { name: "React Native", primary: true,  icon: Smartphone },
      { name: "Expo",         primary: true,  icon: Layers     },
      { name: "TypeScript",   primary: true,  icon: Code2      },
      { name: "Firebase",     primary: true,  icon: Shield     },
      { name: "Reanimated",   primary: false, icon: Activity   },
      { name: "Vision Camera",primary: false, icon: Eye        },
      { name: "MMKV",         primary: false, icon: Database   },
    ],
  },
  {
    id: "frontend", layer: "Web · React & Next.js", desc: "Websites, admin panels, PWAs — responsive UI from Figma to production",
    projectRefs: "Developer Inbox · Kultprosvet · this portfolio",
    skills: [
      { name: "React",        primary: true,  icon: Globe     },
      { name: "Next.js",      primary: true,  icon: Monitor   },
      { name: "TypeScript",   primary: true,  icon: Code2     },
      { name: "Vite",         primary: false, icon: Zap       },
      { name: "PWA",          primary: false, icon: Package   },
      { name: "React Router", primary: false, icon: GitBranch },
      { name: "GraphQL",      primary: false, icon: GitBranch },
      { name: "Tailwind CSS", primary: false, icon: Wind      },
      { name: "Figma",        primary: false, icon: PenTool   },
      { name: "Postman",      primary: false, icon: Wrench    },
    ],
  },
  {
    id: "realtime", layer: "Backend · Node.js & APIs", desc: "REST, GraphQL, WebSockets, Firebase — server logic for mobile and web clients",
    projectRefs: "Kultprosvet · Developer Inbox · Waddingtons",
    skills: [
      { name: "Node.js",           primary: true,  icon: Server   },
      { name: "Express.js",        primary: true,  icon: Server   },
      { name: "WebSockets",        primary: true,  icon: Wifi     },
      { name: "Firebase",          primary: true,  icon: Shield   },
      { name: "NestJS",            primary: false, icon: Server   },
      { name: "GraphQL",           primary: false, icon: GitBranch },
      { name: "PostgreSQL",        primary: false, icon: Database },
      { name: "MySQL",             primary: false, icon: Database },
      { name: "MongoDB",           primary: false, icon: Database },
    ],
  },
  {
    id: "native", layer: "Native · Swift & Kotlin", desc: "Platform modules for iOS and Android when React Native needs OS-level access",
    projectRefs: "FocusGuard · Vitadrop",
    skills: [
      { name: "Swift",           primary: true,  icon: Cpu      },
      { name: "Kotlin",          primary: true,  icon: Cpu      },
      { name: "Native bridge",   primary: true,  icon: Boxes    },
      { name: "TurboModules",    primary: false, icon: Layers   },
      { name: "BGTaskScheduler", primary: false, icon: Activity },
      { name: "SQLite",          primary: false, icon: Database },
    ],
  },
  {
    id: "perf", layer: "Testing & performance", desc: "Jest and Detox, Firebase Crashlytics, profiling, bundle size, startup time",
    projectRefs: "FocusGuard · Waddingtons · contract work",
    skills: [
      { name: "Jest",                   primary: true,  icon: CircleCheck },
      { name: "Detox",                  primary: true,  icon: Bug         },
      { name: "Firebase Crashlytics",   primary: true,  icon: Shield      },
      { name: "Flipper",                primary: false, icon: Activity    },
      { name: "Hermes Profiler",        primary: false, icon: Zap         },
      { name: "Metro Bundler",          primary: false, icon: Package     },
    ],
  },
  {
    id: "state", layer: "App state", desc: "Redux, RTK Query, Zustand — keeping data in sync with the server",
    projectRefs: "Developer Inbox · Vitadrop · Waddingtons",
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
