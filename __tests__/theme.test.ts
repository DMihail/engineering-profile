import {
  applySystemColorScheme,
  resolveSystemColorScheme,
  THEME_BOOTSTRAP_SCRIPT,
} from "@/lib/theme";

describe("system color scheme", () => {
  it("resolves light/dark from OS flag", () => {
    expect(resolveSystemColorScheme(true)).toBe("light");
    expect(resolveSystemColorScheme(false)).toBe("dark");
  });

  it("applies data-color-scheme and clears forced data-theme", () => {
    const root = document.createElement("html");
    root.setAttribute("data-theme", "dark");
    applySystemColorScheme(root, true);
    expect(root.hasAttribute("data-theme")).toBe(false);
    expect(root.getAttribute("data-color-scheme")).toBe("light");

    applySystemColorScheme(root, false);
    expect(root.getAttribute("data-color-scheme")).toBe("dark");
  });

  it("keeps a compact OS-only bootstrap", () => {
    expect(THEME_BOOTSTRAP_SCRIPT).toContain("prefers-color-scheme");
    expect(THEME_BOOTSTRAP_SCRIPT).toContain("data-color-scheme");
    expect(THEME_BOOTSTRAP_SCRIPT).toContain("removeItem");
    expect(THEME_BOOTSTRAP_SCRIPT).not.toContain("\n");
    expect(THEME_BOOTSTRAP_SCRIPT).not.toContain("localStorage.getItem");
  });
});
