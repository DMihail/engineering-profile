/** Legacy index filenames that must redirect to the site root (case-insensitive, optional trailing slash). */
const LEGACY_INDEX_PAGE = /^\/(?:index|default|home)\.(?:html|htm|php|asp)\/?$/i;

export function isLegacyIndexPage(pathname: string): boolean {
  return LEGACY_INDEX_PAGE.test(pathname);
}
