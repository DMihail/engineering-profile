import sitemap from "@/app/sitemap";
import { CV_FILES, SITE_URL } from "@/lib/config";

describe("sitemap", () => {
  it("lists home, resume, and privacy only", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(3);
    expect(entries[0]?.url).toBe(SITE_URL);
    expect(entries[0]?.priority).toBe(1);
    expect(entries[1]?.url).toBe(`${SITE_URL}/resume`);
    expect(entries[2]?.url).toBe(`${SITE_URL}/privacy`);
    expect(entries.some((entry) => entry.url.includes("/projects/"))).toBe(false);
  });

  it("does not include API, asset, or PDF routes", () => {
    const urls = sitemap().map((e) => e.url);
    for (const url of urls) {
      expect(url).not.toMatch(/\/api\//);
      expect(url).not.toMatch(/opengraph-image|profile-image|apple-icon/);
      expect(url).not.toMatch(/\.pdf$/i);
    }
    for (const path of CV_FILES) {
      expect(urls).not.toContain(`${SITE_URL}${path}`);
    }
  });
});
