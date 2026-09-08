/** System color scheme — follows `prefers-color-scheme` only (no user override). */

export type ColorScheme = "light" | "dark";

export function resolveSystemColorScheme(systemIsLight: boolean): ColorScheme {
  return systemIsLight ? "light" : "dark";
}

/** Sync resolved scheme onto `<html>` for token selectors. */
export function applySystemColorScheme(
  root: HTMLElement = document.documentElement,
  systemIsLight: boolean = typeof window !== "undefined"
    ? window.matchMedia("(prefers-color-scheme: light)").matches
    : false,
): void {
  root.removeAttribute("data-theme");
  root.setAttribute("data-color-scheme", resolveSystemColorScheme(systemIsLight));
}

/**
 * Inline bootstrap — sets `data-color-scheme` from OS before paint.
 * Clears any legacy forced `theme-preference` / `data-theme`.
 * Keep compact; no newlines.
 */
export const THEME_BOOTSTRAP_SCRIPT =
  `try{var r=document.documentElement,l=matchMedia("(prefers-color-scheme: light)").matches;r.removeAttribute("data-theme");r.setAttribute("data-color-scheme",l?"light":"dark");localStorage.removeItem("theme-preference")}catch(e){}`;
