/** Runs before paint when the URL has a hash — prevents wrong scroll restoration. */
export const SCROLL_HASH_BOOTSTRAP_SCRIPT =
  "if(location.hash){history.scrollRestoration='manual';window.scrollTo(0,0);}";

/** CSP hash for the inline bootstrap script (avoids nonce hydration mismatch on <script>). */
export const SCROLL_HASH_BOOTSTRAP_CSP_HASH =
  "sha256-X+cqLjDXD0SKG/vWQcoBZHRP9D0klJOylNOXkSFBhis=";
