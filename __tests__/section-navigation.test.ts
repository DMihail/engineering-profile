/**
 * @jest-environment jsdom
 */
import { PAGE_SECTION_IDS } from "@/lib/section-ids";
import {
  getActiveSectionFromScroll,
  navigateToSection,
  scrollToSectionWhenReady,
} from "@/lib/section-navigation";

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

describe("scrollToSectionWhenReady", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 8000,
      configurable: true,
    });
    window.scrollTo = jest.fn();
    Element.prototype.scrollIntoView = jest.fn();
  });

  it("waits for layout height to stabilize before scrolling", async () => {
    let height = 2000;
    Object.defineProperty(document.documentElement, "scrollHeight", {
      get: () => height,
      configurable: true,
    });

    const contact = document.createElement("section");
    contact.id = "contact";
    contact.className = "section-cv-auto";
    contact.getBoundingClientRect = () =>
      ({
        top: 120,
        bottom: 520,
        left: 0,
        right: 0,
        width: 0,
        height: 400,
        x: 0,
        y: 120,
        toJSON: () => ({}),
      }) as DOMRect;
    document.body.appendChild(contact);

    const scrollPromise = scrollToSectionWhenReady("contact");

    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    height = 8000;
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    contact.getBoundingClientRect = () =>
      ({
        top: 72,
        bottom: 472,
        left: 0,
        right: 0,
        width: 0,
        height: 400,
        x: 0,
        y: 72,
        toJSON: () => ({}),
      }) as DOMRect;

    await expect(scrollPromise).resolves.toBe(true);
    expect(contact.scrollIntoView).toHaveBeenCalled();
    expect(contact.style.contentVisibility).toBe("visible");
  });

  it("treats contact as aligned near the bottom when the page cannot scroll further", async () => {
    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 900,
      configurable: true,
    });
    Object.defineProperty(window, "innerHeight", { value: 800, configurable: true });
    Object.defineProperty(window, "scrollY", { value: 100, configurable: true, writable: true });

    const contact = document.createElement("section");
    contact.id = "contact";
    contact.className = "section-cv-auto";
    contact.getBoundingClientRect = () =>
      ({
        top: 64,
        bottom: 500,
        left: 0,
        right: 0,
        width: 0,
        height: 436,
        x: 0,
        y: 64,
        toJSON: () => ({}),
      }) as DOMRect;
    document.body.appendChild(contact);

    await expect(scrollToSectionWhenReady("contact")).resolves.toBe(true);
    expect(contact.scrollIntoView).toHaveBeenCalled();
  });
});

describe("navigateToSection", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 3000,
      configurable: true,
    });
    window.scrollTo = jest.fn();
    Element.prototype.scrollIntoView = jest.fn();
    window.history.pushState = jest.fn();
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
  });

  it("updates the hash, unlocks scroll, and scrolls to the section", async () => {
    const contact = document.createElement("section");
    contact.id = "contact";
    contact.className = "section-cv-auto";
    contact.getBoundingClientRect = () =>
      ({
        top: 72,
        bottom: 472,
        left: 0,
        right: 0,
        width: 0,
        height: 400,
        x: 0,
        y: 72,
        toJSON: () => ({}),
      }) as DOMRect;
    document.body.appendChild(contact);

    await expect(navigateToSection("contact")).resolves.toBe(true);
    expect(window.history.pushState).toHaveBeenCalledWith(null, "", "/#contact");
    expect(document.body.style.overflow).toBe("");
    expect(document.body.style.touchAction).toBe("");
    expect(contact.scrollIntoView).toHaveBeenCalled();
  });
});
