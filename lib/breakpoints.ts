/** Canonical layout breakpoints — keep CSS `width` queries in sync. */
export const BP_SM_PX = 640;
export const BP_LG_PX = 1024;

/** Modern media queries (CSS `width` range syntax). */
export const MQ_SM_UP = `(width >= ${BP_SM_PX}px)`;
export const MQ_LG_UP = `(width >= ${BP_LG_PX}px)`;
export const MQ_BELOW_LG = `(width < ${BP_LG_PX}px)`;
