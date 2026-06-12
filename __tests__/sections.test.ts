import { getVisibleSections } from "@/lib/content/sections";
import { TESTIMONIALS } from "@/lib/content/portfolio/testimonials";

describe("getVisibleSections", () => {
  it("omits testimonials and renumbers contact when testimonials are empty", () => {
    expect(TESTIMONIALS).toHaveLength(0);

    const sections = getVisibleSections();
    const ids = sections.map((section) => section.id);

    expect(ids).not.toContain("testimonials");
    expect(ids.at(-1)).toBe("contact");
    expect(sections.find((section) => section.id === "contact")?.n).toBe("06");
    expect(sections.find((section) => section.id === "education")?.n).toBe("05");
  });
});
