import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { SkipLink } from "@/components/layout/skip-link";
import { focusMainContent } from "@/lib/focus-main-content";
import { MAIN_CONTENT_ID } from "@/lib/section-ids";
import { UI_LABELS } from "@/lib/content/ui-labels";

describe("SkipLink", () => {
  it("targets main content for keyboard users", () => {
    render(<SkipLink home />);
    const link = screen.getByRole("link", { name: UI_LABELS.skipToContent });
    expect(link).toHaveAttribute("href", `/#${MAIN_CONTENT_ID}`);
    expect(link.className).toContain("skip-link");
  });

  it("can move focus onto main via focusMainContent", async () => {
    const user = userEvent.setup();
    const main = document.createElement("main");
    main.id = MAIN_CONTENT_ID;
    main.tabIndex = -1;
    main.focus = jest.fn();
    main.scrollIntoView = jest.fn();
    document.body.appendChild(main);

    render(<SkipLink />);
    const link = screen.getByRole("link", { name: UI_LABELS.skipToContent });
    await user.click(link);
    focusMainContent(MAIN_CONTENT_ID);

    expect(main.focus).toHaveBeenCalled();
  });
});
