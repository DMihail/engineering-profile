/** Shared Cache Components tags — invalidate via POST /api/revalidate. */
export const CACHE_TAGS = {
  portfolio: "portfolio",
  siteJsonLd: "site-json-ld",
} as const;

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];

export const CACHE_TAG_LIST = Object.values(CACHE_TAGS);
