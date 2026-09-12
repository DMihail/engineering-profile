import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("homepage smoke", () => {
  test("theme toggle cycles resolved color scheme", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "dark" });
    await page.addInitScript(() => {
      try {
        localStorage.removeItem("theme-preference");
      } catch {
        /* ignore */
      }
    });
    await page.goto("/");
    const toggle = page.getByTestId("theme-toggle");
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-label", /System/i);

    await toggle.click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("theme-preference")))
      .toBe("light");
    await expect(toggle).toHaveAttribute("aria-label", /Light/i);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await expect(page.locator("html")).toHaveAttribute("data-color-scheme", "light");

    await toggle.click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("theme-preference")))
      .toBe("dark");
    await expect(toggle).toHaveAttribute("aria-label", /Dark/i);
    await expect(page.locator("html")).toHaveAttribute("data-color-scheme", "dark");
  });

  test("hero keeps actions in one group with Let's talk first", async ({ page }) => {
    await page.goto("/");
    const primary = page.getByRole("group", { name: /primary actions/i });
    const links = primary.getByRole("link");
    await expect(links).toHaveCount(4);
    await expect(links.nth(0)).toContainText(/let's talk/i);
    await expect(links.nth(1)).toContainText(/view resume/i);
    await expect(links.nth(2)).toContainText(/github/i);
    await expect(links.nth(3)).toContainText(/linkedin/i);
  });
});

test.describe("contrast", () => {
  for (const scheme of ["dark", "light"] as const) {
    test(`home has no serious contrast issues in ${scheme}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme });
      await page.addInitScript(() => {
        try {
          localStorage.removeItem("theme-preference");
        } catch {
          /* ignore */
        }
      });
      await page.goto("/");
      await expect(page.locator("html")).toHaveAttribute("data-color-scheme", scheme);

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa"])
        .include("main")
        .analyze();

      const contrast = results.violations.filter((v) => v.id === "color-contrast");
      expect(contrast, JSON.stringify(contrast, null, 2)).toEqual([]);
    });
  }
});
