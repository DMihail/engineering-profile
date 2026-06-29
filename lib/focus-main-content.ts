import { getSectionScrollBehavior } from "@/lib/section-navigation";

/** Move keyboard focus to a landmark and scroll it into view (skip-link pattern). */
export function focusMainContent(targetId: string): void {
  const target = document.getElementById(targetId);
  if (!(target instanceof HTMLElement)) return;

  target.focus({ preventScroll: true });
  target.scrollIntoView({ behavior: getSectionScrollBehavior(), block: "start" });
}

/** True when the user intends a modified navigation (new tab, etc.). */
export function isModifiedNavigation(event: Pick<MouseEvent, "metaKey" | "ctrlKey" | "shiftKey" | "altKey">): boolean {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}
