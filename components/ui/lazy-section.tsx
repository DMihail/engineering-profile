"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  id: string;
  className?: string;
  minHeight?: string;
}

export function LazySection({ children, id, className, minHeight = "60vh" }: LazySectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
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
  }, []);

  if (show) return <>{children}</>;
  return <section ref={ref} id={id} className={className} style={{ minHeight }} />;
}
