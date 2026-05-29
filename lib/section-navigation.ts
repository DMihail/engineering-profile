export function getSectionIdFromHash(): string | null {
  const hash = window.location.hash.slice(1);
  return hash || null;
}
