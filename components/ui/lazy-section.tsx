"use client";

import { Activity, useEffect, useState, type ReactNode } from "react";
import { SECTION_REVEAL_ALL_EVENT, SECTION_REVEAL_EVENT } from "@/lib/section-navigation";

interface LazySectionProps {
  children: ReactNode;
  id: string;
  className?: string;
  minHeight?: string;
  preloadMargin?: string;
}

type Phase = "idle" | "preload" | "visible";

export function LazySection({
  children,
  id,
  className,
  minHeight = "60vh",
  preloadMargin = "300px",
}: LazySectionProps) {
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    const reveal = () => setPhase("visible");
    const revealOne = (event: Event) => {
      const sectionId = (event as CustomEvent<{ id: string }>).detail?.id;
      if (sectionId === id) setPhase("visible");
    };

    window.addEventListener(SECTION_REVEAL_ALL_EVENT, reveal);
    window.addEventListener(SECTION_REVEAL_EVENT, revealOne);
    return () => {
      window.removeEventListener(SECTION_REVEAL_ALL_EVENT, reveal);
      window.removeEventListener(SECTION_REVEAL_EVENT, revealOne);
    };
  }, [id]);

  const sectionRef = (el: HTMLElement | null) => {
    if (!el || phase === "visible") return;

    const preloadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase((current) => (current === "idle" ? "preload" : current));
        }
      },
      { rootMargin: preloadMargin },
    );

    const visibleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("visible");
          preloadObserver.disconnect();
          visibleObserver.disconnect();
        }
      },
      { threshold: 0.05 },
    );

    preloadObserver.observe(el);
    visibleObserver.observe(el);

    return () => {
      preloadObserver.disconnect();
      visibleObserver.disconnect();
    };
  };

  if (phase === "visible") {
    return <Activity mode="visible">{children}</Activity>;
  }

  return (
    <>
      <section
        ref={sectionRef}
        id={phase === "idle" ? id : undefined}
        data-section-id={id}
        className={phase === "idle" ? className : undefined}
        style={
          phase === "idle"
            ? { minHeight }
            : {
                position: "absolute",
                width: 1,
                height: 1,
                overflow: "hidden",
                opacity: 0,
                pointerEvents: "none",
              }
        }
        aria-hidden={phase === "preload"}
      />
      {phase === "preload" && (
        <Activity mode="hidden">{children}</Activity>
      )}
    </>
  );
}
