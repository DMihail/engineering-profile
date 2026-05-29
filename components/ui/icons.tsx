import type { SVGProps } from "react";

interface MDLogoProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  bg?: string;
  tile?: boolean;
}

export function MDLogo({
  size = 32,
  color = "#38BDF8",
  bg = "#0B0F17",
  tile = false,
  className,
  "aria-hidden": ariaHidden,
  "aria-label": ariaLabel,
  ...props
}: MDLogoProps) {
  const decorative = ariaHidden === true || ariaHidden === "true";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : (ariaLabel ?? "MD monogram")}
      {...props}
    >
      {tile && (
        <rect width="100" height="100" rx="22" fill={bg} />
      )}
      <path
        d="M 50,16 A 40,40 0 1 1 11,46 C 13,38 14,17 14,16 C 14,17 25,57 34,64 C 38,68 50,29 50,16"
        stroke={color}
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line
        x1="50" y1="16"
        x2="50" y2="96"
        stroke={color}
        strokeWidth={6}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function GithubIcon({ size = 24, className, style }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function LinkedinIcon({ size = 24, className, style }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
