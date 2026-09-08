import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { HeroSection } from "@/components/sections/hero-section";
import { HERO_CTA } from "@/lib/content/hero";
import { UI_LABELS } from "@/lib/content/ui-labels";

describe("HeroSection CTA hierarchy", () => {
  it("keeps Let's talk first, then resume + profiles in one action row", () => {
    render(<HeroSection />);

    const primary = screen.getByRole("group", { name: UI_LABELS.hero.primaryActions });
    const primaryLinks = within(primary).getAllByRole("link");

    expect(primaryLinks).toHaveLength(4);
    expect(primaryLinks[0]).toHaveTextContent(UI_LABELS.hero.contact);
    expect(primaryLinks[0]).toHaveAttribute("href", HERO_CTA.contact);
    expect(primaryLinks[0].className).toMatch(/btn-primary/);

    expect(primaryLinks[1]).toHaveTextContent(UI_LABELS.hero.viewResume);
    expect(primaryLinks[1]).toHaveAttribute("href", HERO_CTA.resume);
    expect(primaryLinks[2]).toHaveTextContent(UI_LABELS.hero.github);
    expect(primaryLinks[2]).toHaveAttribute("href", HERO_CTA.github);
    expect(primaryLinks[3]).toHaveTextContent(UI_LABELS.hero.linkedin);
    expect(primaryLinks[3]).toHaveAttribute("href", HERO_CTA.linkedin);

    for (const link of primaryLinks.slice(1)) {
      expect(link.className).toMatch(/btn-outline/);
    }
  });
});
