declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

type Icon = React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;

interface SkillItem  { name: string; primary: boolean; icon: Icon }
export interface SkillLayer { id: string; layer: string; desc: string; projectRefs: string; skills: SkillItem[] }
export interface Capability { id: string; title: string; desc: string; kpi: string; kpiSub: string; tags: string[]; appliedIn: string; icon: Icon }
interface ArchDecision { decision: string; rationale: string }
interface TradeOff     { chosen: string; rationale: string }
interface Result       { metric: string; label: string }
export interface CaseStudy {
  id: string; num: string; title: string; type: string; version: string;
  summary: string; stack: string[]; technicalPoints: string[];
  context: string; problem: string; solution: string;
  constraints: string[]; architecture: ArchDecision[];
  tradeoffs: TradeOff[]; performanceNotes: string[]; results: Result[];
}
export interface Education { institution: string; field: string; period?: string }
export interface XP {
  company: string;
  role: string;
  period: string;
  location: string;
  current: boolean;
  systems: string;
  items: string[];
  tags: string[];
  highlight: string;
  relatedCaseId?: string;
}
export interface SocialLink { label: string; hint: string; icon: Icon; href: string }
