import { getVisibleSections, getSectionMeta, SECTIONS } from "@/lib/content/sections";
import { NAV } from "@/lib/content/nav";

describe("sections", () => {
  it("exposes a stable ordered section list without testimonials", () => {
    const ids = getVisibleSections().map((section) => section.id);

    expect(ids).toEqual([
      "impact",
      "projects",
      "skills",
      "experience",
      "education",
      "contact",
    ]);
    expect(ids).not.toContain("testimonials");
    expect(getSectionMeta("contact").n).toBe("06");
    expect(NAV).toEqual(ids);
    expect(SECTIONS).toHaveLength(6);
  });
});
