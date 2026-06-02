import {
  SCROLL_HASH_BOOTSTRAP_CSP_HASH,
  SCROLL_HASH_BOOTSTRAP_SCRIPT,
} from "@/lib/scroll-hash-bootstrap";
import { createHash } from "node:crypto";

describe("scroll hash bootstrap", () => {
  it("keeps CSP hash in sync with the inline script body", () => {
    const hash = `sha256-${createHash("sha256").update(SCROLL_HASH_BOOTSTRAP_SCRIPT).digest("base64")}`;
    expect(hash).toBe(SCROLL_HASH_BOOTSTRAP_CSP_HASH);
  });
});
