import sitemap from "@/app/sitemap";
import { CV_FILES, SITE_URL } from "@/lib/config";

describe("sitemap", () => {
  it("lists home, resume, and CV PDFs", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(3 + CV_FILES.length);
    expect(entries[0]?.url).toBe(SITE_URL);
    expect(entries[0]?.priority).toBe(1);
    expect(entries[1]?.url).toBe(`${SITE_URL}/resume`);
    expect(entries[2]?.url).toBe(`${SITE_URL}/privacy`);
  });

  it("does not include API or asset routes", () => {
    const urls = sitemap().map((e) => e.url);
    for (const url of urls) {
      expect(url).not.toMatch(/\/api\//);
      expect(url).not.toMatch(/opengraph-image|profile-image|apple-icon/);
    }
  });

  it("includes both CV files with valid URLs", () => {
    const urls = sitemap().map((e) => e.url);
    for (const path of CV_FILES) {
      expect(urls).toContain(`${SITE_URL}${path}`);
    }
  });
});
