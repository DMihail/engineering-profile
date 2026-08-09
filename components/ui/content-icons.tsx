import type { CSSProperties, ComponentType } from "react";
import {
  Boxes,
  CircleCheck,
  Code2,
  Cpu,
  Database,
  Eye,
  Gauge,
  GitBranch,
  Globe,
  Layers,
  Mail,
  Monitor,
  Network,
  Package,
  RefreshCw,
  Server,
  Shield,
  Smartphone,
  Terminal,
  Wifi,
  Workflow,
  Wrench,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import type { ContentIconId } from "@/lib/content/icon-ids";

export type ContentIconComponent = ComponentType<{
  size?: number;
  className?: string;
  style?: CSSProperties;
  "aria-hidden"?: boolean | "true" | "false";
}>;

const CONTENT_ICONS: Record<ContentIconId, ContentIconComponent> = {
  smartphone: Smartphone,
  layers: Layers,
  eye: Eye,
  code: Code2,
  cpu: Cpu,
  globe: Globe,
  "git-branch": GitBranch,
  server: Server,
  shield: Shield,
  database: Database,
  wifi: Wifi,
  boxes: Boxes,
  workflow: Workflow,
  refresh: RefreshCw,
  package: Package,
  wrench: Wrench,
  check: CircleCheck,
  monitor: Monitor,
  network: Network,
  terminal: Terminal,
  gauge: Gauge,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: Mail,
};

export function ContentIcon({
  id,
  size,
  className,
  style,
  "aria-hidden": ariaHidden = true,
}: {
  id: ContentIconId;
  size?: number;
  className?: string;
  style?: CSSProperties;
  "aria-hidden"?: boolean | "true" | "false";
}) {
  const Icon = CONTENT_ICONS[id];
  return <Icon size={size} className={className} style={style} aria-hidden={ariaHidden} />;
}
