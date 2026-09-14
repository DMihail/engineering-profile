import { isModifiedNavigation } from "@/lib/is-modified-navigation";

describe("isModifiedNavigation", () => {
  it("detects modifier keys", () => {
    expect(isModifiedNavigation({ metaKey: true, ctrlKey: false, shiftKey: false, altKey: false })).toBe(true);
    expect(isModifiedNavigation({ metaKey: false, ctrlKey: false, shiftKey: false, altKey: false })).toBe(false);
  });
});
