/**
 * @jest-environment jsdom
 */
import { PAGE_SECTION_IDS } from "@/lib/section-ids";
import { getActiveSectionFromScroll } from "@/lib/section-navigation";

function mockSectionTops(tops: Record<string, number>) {
  for (const id of PAGE_SECTION_IDS) {
    const top = tops[id];
    const el = document.getElementById(id) ?? document.createElement("section");
    el.id = id;
    if (!document.getElementById(id)) {
      document.body.appendChild(el);
    }
    el.getBoundingClientRect = () =>
      ({
        top,
        bottom: top + 400,
        left: 0,
        right: 0,
        width: 0,
        height: 400,
        x: 0,
        y: top,
        toJSON: () => ({}),
      }) as DOMRect;
  }
}

describe("getActiveSectionFromScroll", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("returns contact when contact section is at the scroll anchor", () => {
    mockSectionTops({
      hero: -2000,
      impact: -1600,
      projects: -1200,
      skills: -800,
      experience: -400,
      education: -100,
      contact: 64,
    });

    expect(getActiveSectionFromScroll(PAGE_SECTION_IDS, 72)).toBe("contact");
  });

  it("returns skills when skills crosses the anchor and contact is below", () => {
    mockSectionTops({
      hero: -1200,
      impact: -900,
      projects: -600,
      skills: 72,
      experience: 500,
      education: 900,
      contact: 1300,
    });

    expect(getActiveSectionFromScroll(PAGE_SECTION_IDS, 72)).toBe("skills");
  });

  it("returns contact near the bottom of the page even if the anchor line is higher", () => {
    mockSectionTops({
      hero: -5000,
      impact: -4600,
      projects: -4200,
      skills: -3800,
      experience: -3400,
      education: -3000,
      contact: 120,
    });

    Object.defineProperty(window, "scrollY", { value: 4800, configurable: true });
    Object.defineProperty(window, "innerHeight", { value: 800, configurable: true });
    Object.defineProperty(document.documentElement, "scrollHeight", { value: 5600, configurable: true });

    expect(getActiveSectionFromScroll(PAGE_SECTION_IDS, 72)).toBe("contact");
  });
});
