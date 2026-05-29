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

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          timeoutId = setTimeout(() => setIntersected(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.04, rootMargin: "80px 0px" },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [delay, reducedMotion]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("fade-in-target");
    if (reducedMotion || intersected) {
      el.classList.add("is-visible");
    } else {
      el.classList.remove("is-visible");
    }
  }, [intersected, reducedMotion]);

  return {
    ref,
    fade: intersected || reducedMotion ? { transitionDelay: `${delay}ms` } : undefined,
  };
}
