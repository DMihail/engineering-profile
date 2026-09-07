import {
  applyThemePreference,
  DEV_THEME_BOOTSTRAP_SCRIPT,
  isThemePreference,
  nextThemePreference,
  readStoredThemePreference,
  resolveColorScheme,
  THEME_STORAGE_KEY,
  writeStoredThemePreference,
} from "@/lib/theme";

describe("theme preference", () => {
  it("cycles system → light → dark → system", () => {
    expect(nextThemePreference("system")).toBe("light");
    expect(nextThemePreference("light")).toBe("dark");
    expect(nextThemePreference("dark")).toBe("system");
  });

  it("resolves effective color scheme from preference + OS", () => {
    expect(resolveColorScheme("system", true)).toBe("light");
    expect(resolveColorScheme("system", false)).toBe("dark");
    expect(resolveColorScheme("light", false)).toBe("light");
    expect(resolveColorScheme("dark", true)).toBe("dark");
  });

  it("narrows stored values", () => {
    expect(isThemePreference("light")).toBe(true);
    expect(isThemePreference("nope")).toBe(false);
  });

  it("applies and clears data-theme on the root", () => {
    const root = document.createElement("html");
    applyThemePreference("light", root);
    expect(root.getAttribute("data-theme")).toBe("light");
    applyThemePreference("system", root);
    expect(root.hasAttribute("data-theme")).toBe(false);
  });

  it("persists forced themes in session storage", () => {
    const store = new Map<string, string>();
    const storage = {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => {
        store.set(key, value);
      },
      removeItem: (key: string) => {
        store.delete(key);
      },
    };

    writeStoredThemePreference("dark", storage);
    expect(store.get(THEME_STORAGE_KEY)).toBe("dark");
    expect(readStoredThemePreference(storage)).toBe("dark");

    writeStoredThemePreference("system", storage);
    expect(store.has(THEME_STORAGE_KEY)).toBe(false);
    expect(readStoredThemePreference(storage)).toBe("system");
  });

  it("keeps a compact inline bootstrap for early data-theme restore", () => {
    expect(DEV_THEME_BOOTSTRAP_SCRIPT).toContain(THEME_STORAGE_KEY);
    expect(DEV_THEME_BOOTSTRAP_SCRIPT).toContain("sessionStorage");
    expect(DEV_THEME_BOOTSTRAP_SCRIPT).toContain("data-theme");
    expect(DEV_THEME_BOOTSTRAP_SCRIPT).not.toContain("\n");
  });
});
