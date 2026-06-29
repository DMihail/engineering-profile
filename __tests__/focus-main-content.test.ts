import { focusMainContent, isModifiedNavigation } from "@/lib/focus-main-content";

describe("focusMainContent", () => {
  it("focuses and scrolls the target element", () => {
    const main = document.createElement("main");
    main.id = "main-content";
    main.tabIndex = -1;
    main.focus = jest.fn();
    main.scrollIntoView = jest.fn();
    document.body.appendChild(main);

    focusMainContent("main-content");

    expect(main.focus).toHaveBeenCalledWith({ preventScroll: true });
    expect(main.scrollIntoView).toHaveBeenCalledWith(
      expect.objectContaining({ block: "start" }),
    );
  });
});

describe("isModifiedNavigation", () => {
  it("detects modifier keys", () => {
    expect(isModifiedNavigation({ metaKey: true, ctrlKey: false, shiftKey: false, altKey: false })).toBe(true);
    expect(isModifiedNavigation({ metaKey: false, ctrlKey: false, shiftKey: false, altKey: false })).toBe(false);
  });
});
