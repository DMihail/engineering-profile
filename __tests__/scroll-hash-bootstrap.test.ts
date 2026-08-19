import { SCROLL_HASH_BOOTSTRAP_SCRIPT } from "@/lib/scroll-hash-bootstrap";

describe("scroll hash bootstrap", () => {
  it("keeps a compact inline body for early hash scroll reset", () => {
    expect(SCROLL_HASH_BOOTSTRAP_SCRIPT).toMatch(/^if\(location\.hash\)\{/);
    expect(SCROLL_HASH_BOOTSTRAP_SCRIPT).toContain("scrollRestoration");
    expect(SCROLL_HASH_BOOTSTRAP_SCRIPT).not.toContain("\n");
  });
});
