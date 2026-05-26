"use client";

import { useState, type ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  id: string;
  className?: string;
  minHeight?: string;
}

export function LazySection({ children, id, className, minHeight = "60vh" }: LazySectionProps) {
  const [show, setShow] = useState(false);

  const sectionRef = (el: HTMLElement | null) => {
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          obs.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  };

  if (show) return <>{children}</>;
  return <section ref={sectionRef} id={id} className={className} style={{ minHeight }} />;
}
