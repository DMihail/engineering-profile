/**
 * Lightweight in-memory sliding-window rate limiter for Node route handlers.
 * On Vercel Fluid Compute instances are reused, so this catches burst abuse.
 * Not a substitute for edge/WAF limits on high-traffic APIs.
 */

export type RateLimitResult =
  | { ok: true; remaining: number }
  | { ok: false; retryAfterSec: number };

type Bucket = {
  timestamps: number[];
};

const buckets = new Map<string, Bucket>();

export type RateLimitOptions = {
  /** Max requests allowed in the window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
  /** Optional now() override for tests. */
  now?: () => number;
};

function prune(bucket: Bucket, windowStart: number): void {
  while (bucket.timestamps.length > 0 && bucket.timestamps[0]! < windowStart) {
    bucket.timestamps.shift();
  }
}

export function checkRateLimit(key: string, options: RateLimitOptions): RateLimitResult {
  const now = options.now?.() ?? Date.now();
  const windowStart = now - options.windowMs;
  let bucket = buckets.get(key);

  if (!bucket) {
    bucket = { timestamps: [] };
    buckets.set(key, bucket);
  }

  prune(bucket, windowStart);

  if (bucket.timestamps.length >= options.limit) {
    const oldest = bucket.timestamps[0] ?? now;
    const retryAfterSec = Math.max(1, Math.ceil((oldest + options.windowMs - now) / 1000));
    return { ok: false, retryAfterSec };
  }

  bucket.timestamps.push(now);
  return { ok: true, remaining: options.limit - bucket.timestamps.length };
}

/** Test helper — clears all buckets. */
export function resetRateLimitStore(): void {
  buckets.clear();
}

/** Prefer leftmost public IP from proxy headers. */
export function clientIpFromHeaders(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  return "unknown";
}
