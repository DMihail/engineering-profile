/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { POST } from "@/app/api/revalidate/route";
import { CACHE_TAGS } from "@/lib/cache-tags";

jest.mock("next/cache", () => ({
  revalidateTag: jest.fn(),
}));

const mockRevalidateTag = revalidateTag as jest.MockedFunction<typeof revalidateTag>;

function requestWith(body: unknown, headers?: HeadersInit) {
  return new NextRequest("https://dzhezhelo.dev/api/revalidate", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/revalidate", () => {
  const previousSecret = process.env.REVALIDATE_SECRET;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.REVALIDATE_SECRET = "test-revalidate-secret";
  });

  afterAll(() => {
    if (previousSecret === undefined) delete process.env.REVALIDATE_SECRET;
    else process.env.REVALIDATE_SECRET = previousSecret;
  });

  it("rejects missing or invalid secret", async () => {
    const res = await POST(requestWith({ tag: CACHE_TAGS.portfolio }));
    expect(res.status).toBe(401);
    expect(mockRevalidateTag).not.toHaveBeenCalled();
  });

  it("rejects unknown tags", async () => {
    const res = await POST(
      requestWith(
        { tag: "nope" },
        { authorization: "Bearer test-revalidate-secret" },
      ),
    );
    expect(res.status).toBe(400);
    expect(mockRevalidateTag).not.toHaveBeenCalled();
  });

  it("revalidates a known tag", async () => {
    const res = await POST(
      requestWith(
        { tag: CACHE_TAGS.portfolio },
        { authorization: "Bearer test-revalidate-secret" },
      ),
    );
    expect(res.status).toBe(200);
    expect(mockRevalidateTag).toHaveBeenCalledWith(CACHE_TAGS.portfolio, "max");
  });

  it("returns 503 when secret is not configured", async () => {
    delete process.env.REVALIDATE_SECRET;
    const res = await POST(
      requestWith(
        { tag: CACHE_TAGS.portfolio },
        { authorization: "Bearer anything" },
      ),
    );
    expect(res.status).toBe(503);
    process.env.REVALIDATE_SECRET = "test-revalidate-secret";
  });
});
