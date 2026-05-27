export const SECTION_REVEAL_EVENT = "section:reveal";
export const SECTION_REVEAL_ALL_EVENT = "section:reveal-all";

export function revealAllSections() {
  window.dispatchEvent(new Event(SECTION_REVEAL_ALL_EVENT));
}

export function revealSection(id: string) {
  window.dispatchEvent(new CustomEvent(SECTION_REVEAL_EVENT, { detail: { id } }));
}

export async function scrollToSection(id: string) {
  revealAllSections();
  revealSection(id);

  const scroll = () => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  for (let i = 0; i < 30; i++) {
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    const el = document.getElementById(id);
    if (el && el.offsetHeight > 200) {
      scroll();
      return;
    }
  }

  scroll();
}

export function getSectionIdFromHash(): string | null {
  const hash = window.location.hash.slice(1);
  return hash || null;
}
