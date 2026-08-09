"use client";

import { useServerInsertedHTML } from "next/navigation";
import { SCROLL_HASH_BOOTSTRAP_SCRIPT } from "@/lib/scroll-hash-bootstrap";

/**
 * Injects the hash-scroll bootstrap into the SSR HTML stream outside the
 * hydrated React tree — avoids React 19's "script tag while rendering" warning
 * while still running before paint (CSP hash covers the inline body).
 */
export function ScrollHashBootstrap() {
  useServerInsertedHTML(() => (
    <script
      dangerouslySetInnerHTML={{ __html: SCROLL_HASH_BOOTSTRAP_SCRIPT }}
    />
  ));

  return null;
}
