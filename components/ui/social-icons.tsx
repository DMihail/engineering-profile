import type { CSSProperties } from "react";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import type { ContentIconComponent } from "@/components/ui/content-icon-types";

const SOCIAL_ICONS = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: Mail,
} as const;

export type SocialContentIconId = keyof typeof SOCIAL_ICONS;

export function SocialContentIcon({
  id,
  size,
  className,
  style,
  "aria-hidden": ariaHidden = true,
}: {
  id: SocialContentIconId;
  size?: number;
  className?: string;
  style?: CSSProperties;
  "aria-hidden"?: boolean | "true" | "false";
}) {
  const Icon: ContentIconComponent = SOCIAL_ICONS[id];
  return <Icon size={size} className={className} style={style} aria-hidden={ariaHidden} />;
}
