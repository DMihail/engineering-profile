import { buildBreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { SITE_URL } from "@/lib/config";

describe("buildBreadcrumbJsonLd", () => {
  it("builds ordered breadcrumb items with absolute URLs", () => {
    const data = buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Resume", path: "/resume" },
    ]);

    expect(data["@type"]).toBe("BreadcrumbList");
    expect(data.itemListElement).toHaveLength(2);
    expect(data.itemListElement[0]).toMatchObject({
      position: 1,
      name: "Home",
      item: `${SITE_URL}/`,
    });
    expect(data.itemListElement[1]).toMatchObject({
      position: 2,
      name: "Resume",
      item: `${SITE_URL}/resume`,
    });
  });
});
