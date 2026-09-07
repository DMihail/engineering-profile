"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import {
  applyThemePreference,
  nextThemePreference,
  readStoredThemePreference,
  type ThemePreference,
  writeStoredThemePreference,
} from "@/lib/theme";
import { UI_LABELS } from "@/lib/content/ui-labels";

const THEME_TRANSITION_MS = 420;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Smooth light↔dark via `@property` color interpolation on `<html>`.
 * Double-rAF ensures transition declarations paint before tokens flip.
 */
function runWithThemeTransition(update: () => void): void {
  const root = document.documentElement;

  if (prefersReducedMotion()) {
    update();
    return;
  }

  root.classList.add("theme-animating");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      update();
      window.setTimeout(() => root.classList.remove("theme-animating"), THEME_TRANSITION_MS);
    });
  });
}

const THEME_ICONS = {
  system: Monitor,
  light: Sun,
  dark: Moon,
} as const;

/**
 * Dev-only control: cycles system → light → dark.
 * Production builds tree-shake this via `process.env.NODE_ENV === "development"`.
 */
export function DevThemeToggle() {
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [preference, setPreference] = useState<ThemePreference>("system");

  useEffect(() => {
    const stored = readStoredThemePreference(sessionStorage);
    setPreference(stored);
    applyThemePreference(stored);
  }, []);

  const cycle = useCallback(() => {
    const next = nextThemePreference(preference);
    runWithThemeTransition(() => {
      applyThemePreference(next);
      writeStoredThemePreference(next, sessionStorage);
    });
    setPreference(next);
  }, [preference]);

  if (!isClient) return null;

  const Icon = THEME_ICONS[preference];
  const label = UI_LABELS.nav.devTheme[preference];

  return (
    <button
      type="button"
      onClick={cycle}
      className="hidden sm:inline-flex items-center justify-center size-9 rounded-md border border-border bg-surface-subtle text-muted-foreground hover:text-primary hover:border-border-primary-muted transition-colors cursor-pointer"
      aria-label={UI_LABELS.nav.devTheme.toggle(label)}
      title={`Theme: ${label} (dev)`}
    >
      <Icon size={16} aria-hidden />
    </button>
  );
}
