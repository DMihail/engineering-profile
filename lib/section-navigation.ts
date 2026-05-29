export async function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function getSectionIdFromHash(): string | null {
  const hash = window.location.hash.slice(1);
  return hash || null;
}
