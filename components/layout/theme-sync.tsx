"use client";

import { useEffect } from "react";
import { applySystemColorScheme } from "@/lib/theme";

/** Keeps `data-color-scheme` in sync when the OS theme changes. Renders nothing. */
export function ThemeSync() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const sync = () => applySystemColorScheme(document.documentElement, mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return null;
}
