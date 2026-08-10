import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { CACHE_TAG_LIST, type CacheTag } from "@/lib/cache-tags";

function isCacheTag(value: unknown): value is CacheTag {
  return typeof value === "string" && (CACHE_TAG_LIST as string[]).includes(value);
}

function authorize(request: NextRequest, secret: string): boolean {
  const header = request.headers.get("authorization");
  if (header === `Bearer ${secret}`) return true;

  const bodyToken = request.headers.get("x-revalidate-secret");
  return bodyToken === secret;
}

/**
 * On-demand Cache Components invalidation.
 *
 * POST /api/revalidate
 * Authorization: Bearer $REVALIDATE_SECRET
 * Body: { "tag": "portfolio" | "site-json-ld" }
 */
export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET?.trim();
  if (!secret) {
    return NextResponse.json(
      { error: "REVALIDATE_SECRET is not configured" },
      { status: 503 },
    );
  }

  if (!authorize(request, secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const tag =
    body && typeof body === "object" && "tag" in body
      ? (body as { tag: unknown }).tag
      : undefined;

  if (!isCacheTag(tag)) {
    return NextResponse.json(
      { error: `Unknown tag. Allowed: ${CACHE_TAG_LIST.join(", ")}` },
      { status: 400 },
    );
  }

  revalidateTag(tag, "max");
  return NextResponse.json({ revalidated: true, tag });
}
