import type { CSSProperties, ComponentType } from "react";

export type ContentIconComponent = ComponentType<{
  size?: number;
  className?: string;
  style?: CSSProperties;
  "aria-hidden"?: boolean | "true" | "false";
}>;
