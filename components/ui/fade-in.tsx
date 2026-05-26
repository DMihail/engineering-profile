"use client";

import { useFadeIn } from "@/lib/hooks";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  const { ref, fade } = useFadeIn(delay);
  return (
    <div ref={ref} className={className} style={fade}>
      {children}
    </div>
  );
}
