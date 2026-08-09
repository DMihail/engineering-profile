import { buildOpenGraph, buildTwitter, DEFAULT_OG_IMAGE } from "@/lib/site-metadata";
import { SITE_AUTHOR, SITE_URL } from "@/lib/config";

describe("site metadata", () => {
  it("builds default Open Graph with image dimensions and locale", () => {
    const og = buildOpenGraph();
    expect(og?.locale).toBe("en_IE");
    expect(og?.siteName).toBe(SITE_AUTHOR);
    expect(og?.url).toBe(SITE_URL);
    expect(og?.images).toEqual([DEFAULT_OG_IMAGE]);
  });

  it("merges Open Graph overrides for nested routes", () => {
    const og = buildOpenGraph({
      url: `${SITE_URL}/resume`,
      title: "Resume",
    });
    expect(og?.url).toBe(`${SITE_URL}/resume`);
    expect(og?.title).toBe("Resume");
    expect(og?.images).toEqual([DEFAULT_OG_IMAGE]);
  });

  it("builds Twitter card metadata with image", () => {
    const twitter = buildTwitter({ title: "Resume" });
    expect(twitter).toMatchObject({
      card: "summary_large_image",
      title: "Resume",
    });
    expect(twitter && "images" in twitter ? twitter.images : undefined).toEqual(
      expect.arrayContaining([expect.anything()]),
    );
  });
});
