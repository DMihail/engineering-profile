import {
  checkRateLimit,
  clientIpFromHeaders,
  resetRateLimitStore,
} from "@/lib/rate-limit";

describe("rate-limit", () => {
  beforeEach(() => {
    resetRateLimitStore();
  });

  it("allows requests under the limit and then blocks", () => {
    const now = 1_000_000;
    const options = { limit: 2, windowMs: 60_000, now: () => now };

    expect(checkRateLimit("ip:1", options).ok).toBe(true);
    expect(checkRateLimit("ip:1", options).ok).toBe(true);

    const blocked = checkRateLimit("ip:1", options);
    expect(blocked.ok).toBe(false);
    if (!blocked.ok) {
      expect(blocked.retryAfterSec).toBeGreaterThan(0);
    }
  });

  it("isolates keys and expires the window", () => {
    let now = 1_000_000;
    const options = { limit: 1, windowMs: 1_000, now: () => now };

    expect(checkRateLimit("a", options).ok).toBe(true);
    expect(checkRateLimit("b", options).ok).toBe(true);
    expect(checkRateLimit("a", options).ok).toBe(false);

    now += 1_001;
    expect(checkRateLimit("a", options).ok).toBe(true);
  });

  it("reads client ip from forwarded headers", () => {
    const headers = new Headers({
      "x-forwarded-for": "203.0.113.9, 10.0.0.1",
    });
    expect(clientIpFromHeaders(headers)).toBe("203.0.113.9");
  });
});
