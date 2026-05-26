export type Icon = React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;

export interface SkillItem  { name: string; primary: boolean; icon: Icon }
export interface SkillLayer { id: string; layer: string; desc: string; scope: string; projectRefs: string; skills: SkillItem[] }
export interface Capability { id: string; mod: string; title: string; desc: string; kpi: string; kpiSub: string; tags: string[]; appliedIn: string; icon: Icon }
export interface ArchDecision { decision: string; rationale: string }
export interface TradeOff     { chosen: string; rationale: string }
export interface Result       { metric: string; label: string }
export interface CaseStudy {
  id: string; num: string; title: string; type: string; archType: string; version: string;
  summary: string; archSig: string; stack: string[];
  context: string; problem: string; constraints: string[];
  approach: string; architecture: ArchDecision[];
  tradeoffs: TradeOff[]; results: Result[];
}
export interface XP { company: string; role: string; period: string; location: string; current: boolean; systems: string; items: string[] }
