import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SkipLink } from "@/components/layout/skip-link";
import { MAIN_CONTENT_ID } from "@/lib/section-ids";
import { UI_LABELS } from "@/lib/content/ui-labels";

describe("SkipLink", () => {
  it("targets main content for keyboard users", () => {
    render(<SkipLink home />);
    const link = screen.getByRole("link", { name: UI_LABELS.skipToContent });
    expect(link).toHaveAttribute("href", `/#${MAIN_CONTENT_ID}`);
    expect(link.className).toContain("skip-link");
  });

  it("uses in-page hash on subpages", () => {
    render(<SkipLink />);
    const link = screen.getByRole("link", { name: UI_LABELS.skipToContent });
    expect(link).toHaveAttribute("href", `#${MAIN_CONTENT_ID}`);
  });
});
