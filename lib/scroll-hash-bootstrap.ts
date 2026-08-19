/** Runs before paint when the URL has a hash — prevents wrong scroll restoration. */
export const SCROLL_HASH_BOOTSTRAP_SCRIPT =
  "if(location.hash){history.scrollRestoration='manual';window.scrollTo(0,0);}";
