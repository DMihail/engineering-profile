/** Theme preference — `system` follows `prefers-color-scheme`. */

export type ThemePreference = "system" | "light" | "dark";

export type ColorScheme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme-preference";

export const THEME_PREFERENCE_ORDER: ThemePreference[] = ["system", "light", "dark"];

export function isThemePreference(value: unknown): value is ThemePreference {
  return value === "system" || value === "light" || value === "dark";
}

export function resolveColorScheme(
  preference: ThemePreference,
  systemIsLight: boolean,
): ColorScheme {
  if (preference === "light") return "light";
  if (preference === "dark") return "dark";
  return systemIsLight ? "light" : "dark";
}

/** Apply preference + resolved scheme on `<html>`. */
export function applyThemePreference(
  preference: ThemePreference,
  root: HTMLElement = document.documentElement,
  systemIsLight: boolean = typeof window !== "undefined"
    ? window.matchMedia("(prefers-color-scheme: light)").matches
    : false,
): void {
  if (preference === "system") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", preference);
  }
  root.setAttribute("data-color-scheme", resolveColorScheme(preference, systemIsLight));
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

/** Same-tab notification after `writeStoredThemePreference` (storage event is cross-tab only). */
export const THEME_PREFERENCE_CHANGE_EVENT = "theme-preference-change";

export function notifyThemePreferenceChange(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(THEME_PREFERENCE_CHANGE_EVENT));
}

export function subscribeThemePreference(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY || event.key === null) onStoreChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(THEME_PREFERENCE_CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(THEME_PREFERENCE_CHANGE_EVENT, onStoreChange);
  };
}

export function getStoredThemePreferenceSnapshot(): ThemePreference {
  try {
    return readStoredThemePreference(window.localStorage);
  } catch {
    return "system";
  }
}

export function getServerThemePreferenceSnapshot(): ThemePreference {
  return "system";
}

/**
 * Inline bootstrap — restores preference and sets `data-color-scheme` before paint.
 * Keep compact; no newlines.
 */
export const THEME_BOOTSTRAP_SCRIPT =
  `try{var k=${JSON.stringify(THEME_STORAGE_KEY)},v=localStorage.getItem(k),r=document.documentElement,l=matchMedia("(prefers-color-scheme: light)").matches,s=v==="light"||v==="dark"?v:(l?"light":"dark");if(v==="light"||v==="dark")r.setAttribute("data-theme",v);else r.removeAttribute("data-theme");r.setAttribute("data-color-scheme",s)}catch(e){}`;
