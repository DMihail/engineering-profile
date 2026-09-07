import type { CSSProperties } from "react";
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
import type { ContentIconId } from "@/lib/content/icon-ids";
import type { ContentIconComponent } from "@/components/ui/content-icon-types";
import { SocialContentIcon, type SocialContentIconId } from "@/components/ui/social-icons";

export type { ContentIconComponent } from "@/components/ui/content-icon-types";

const CONTENT_ICONS: Partial<Record<ContentIconId, ContentIconComponent>> = {
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
};

function isSocialIconId(id: ContentIconId): id is SocialContentIconId {
  return id === "github" || id === "linkedin" || id === "mail";
}

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
  if (isSocialIconId(id)) {
    return (
      <SocialContentIcon id={id} size={size} className={className} style={style} aria-hidden={ariaHidden} />
    );
  }

  const Icon = CONTENT_ICONS[id];
  if (!Icon) return null;
  return <Icon size={size} className={className} style={style} aria-hidden={ariaHidden} />;
}
