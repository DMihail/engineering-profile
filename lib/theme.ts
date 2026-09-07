/** Theme preference — `system` follows `prefers-color-scheme`. */

export type ThemePreference = "system" | "light" | "dark";

export const THEME_STORAGE_KEY = "dev-theme-preference";

export const THEME_PREFERENCE_ORDER: ThemePreference[] = ["system", "light", "dark"];

export function isThemePreference(value: unknown): value is ThemePreference {
  return value === "system" || value === "light" || value === "dark";
}

/** Apply preference to `<html data-theme>`. `system` removes the attribute. */
export function applyThemePreference(preference: ThemePreference, root: HTMLElement = document.documentElement): void {
  if (preference === "system") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", preference);
  }
}

export function readStoredThemePreference(storage: Pick<Storage, "getItem"> | null): ThemePreference {
  if (!storage) return "system";
  try {
    const raw = storage.getItem(THEME_STORAGE_KEY);
    return isThemePreference(raw) ? raw : "system";
  } catch {
    return "system";
  }
}

export function writeStoredThemePreference(
  preference: ThemePreference,
  storage: Pick<Storage, "setItem" | "removeItem"> | null,
): void {
  if (!storage) return;
  try {
    if (preference === "system") storage.removeItem(THEME_STORAGE_KEY);
    else storage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    /* private mode / quota */
  }
}

export function nextThemePreference(current: ThemePreference): ThemePreference {
  const index = THEME_PREFERENCE_ORDER.indexOf(current);
  return THEME_PREFERENCE_ORDER[(index + 1) % THEME_PREFERENCE_ORDER.length] ?? "system";
}

export function resolveColorScheme(
  preference: ThemePreference,
  systemIsLight: boolean,
): "light" | "dark" {
  if (preference === "light") return "light";
  if (preference === "dark") return "dark";
  return systemIsLight ? "light" : "dark";
}

/**
 * Inline bootstrap for `app/layout` (dev only) — restores forced theme before paint.
 * Keep compact; no newlines (matches scroll-hash style).
 */
export const DEV_THEME_BOOTSTRAP_SCRIPT =
  `try{var k=${JSON.stringify(THEME_STORAGE_KEY)},v=sessionStorage.getItem(k);if(v==="light"||v==="dark")document.documentElement.setAttribute("data-theme",v)}catch(e){}`;
