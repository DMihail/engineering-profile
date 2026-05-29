"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";

function subscribeReducedMotion(onChange: () => void): () => void {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [intersected, setIntersected] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );

  useEffect(() => {
    if (reducedMotion) return;

    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setIntersected(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.04, rootMargin: "80px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, reducedMotion]);

  const vis = reducedMotion || intersected;

  return {
    ref,
    fade: {
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(16px)",
      transition: vis
        ? `opacity 560ms ease ${delay}ms, transform 560ms cubic-bezier(0.2,0.8,0.2,1) ${delay}ms`
        : undefined,
    } as React.CSSProperties,
  };
}
