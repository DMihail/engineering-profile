/** True when the user intends a modified navigation (new tab, etc.). */
export function isModifiedNavigation(
  event: Pick<MouseEvent, "metaKey" | "ctrlKey" | "shiftKey" | "altKey">,
): boolean {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}
