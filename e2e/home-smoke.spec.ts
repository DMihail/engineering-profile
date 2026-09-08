import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("homepage smoke", () => {
  test("skip link targets main content", async ({ page }) => {
    await page.goto("/");
    const skip = page.getByRole("link", { name: /skip to content/i });
    await skip.focus();
    await expect(skip).toBeVisible();
    await expect(skip).toHaveAttribute("href", /#main-content/);
  });

  test("color scheme follows the device preference", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-color-scheme", "light");
    await expect(page.getByTestId("theme-toggle")).toHaveCount(0);

    await page.emulateMedia({ colorScheme: "dark" });
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
