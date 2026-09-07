"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import {
  applyThemePreference,
  getServerThemePreferenceSnapshot,
  getStoredThemePreferenceSnapshot,
  nextThemePreference,
  notifyThemePreferenceChange,
  resolveColorScheme,
  subscribeThemePreference,
  writeStoredThemePreference,
} from "@/lib/theme";
import { UI_LABELS } from "@/lib/content/ui-labels";

const THEME_TRANSITION_MS = 420;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

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

function themeStorage(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function systemPrefersLight(): boolean {
  if (typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(prefers-color-scheme: light)").matches;
}

/** Cycles system → light → dark. Preference persists in localStorage. */
export function ThemeToggle() {
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const preference = useSyncExternalStore(
    subscribeThemePreference,
    getStoredThemePreferenceSnapshot,
    getServerThemePreferenceSnapshot,
  );

  // Align DOM with storage after hydrate (bootstrap usually already did this).
  useEffect(() => {
    if (!isClient) return;
    applyThemePreference(
      getStoredThemePreferenceSnapshot(),
      document.documentElement,
      systemPrefersLight(),
    );
  }, [isClient]);

  // Keep resolved scheme in sync when OS preference changes under `system`
  useEffect(() => {
    if (!isClient) return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      if (getStoredThemePreferenceSnapshot() !== "system") return;
      applyThemePreference("system", document.documentElement, mq.matches);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [isClient]);

  const cycle = useCallback(() => {
    const next = nextThemePreference(preference);
    writeStoredThemePreference(next, themeStorage());
    notifyThemePreferenceChange();
    runWithThemeTransition(() => {
      applyThemePreference(next, document.documentElement, systemPrefersLight());
    });
  }, [preference]);

  if (!isClient) return null;

  const Icon = THEME_ICONS[preference];
  const label = UI_LABELS.nav.theme[preference];
  const scheme = resolveColorScheme(preference, systemPrefersLight());

  return (
    <button
      type="button"
      onClick={cycle}
      className="inline-flex items-center justify-center size-9 rounded-md border border-border bg-surface-subtle text-muted-foreground hover:text-primary hover:border-border-primary-muted transition-colors cursor-pointer"
      aria-label={UI_LABELS.nav.theme.toggle(label)}
      title={`Theme: ${label}`}
      data-color-scheme={scheme}
    >
      <Icon size={16} aria-hidden />
    </button>
  );
}
