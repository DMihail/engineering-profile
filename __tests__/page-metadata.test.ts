import { buildRouteMetadata, titledPage } from "@/lib/page-metadata";
import { SITE_AUTHOR, SITE_URL } from "@/lib/config";

describe("page metadata", () => {
  it("builds absolute titles without duplicating the layout template", () => {
    const metadata = buildRouteMetadata({
      title: titledPage("Privacy Policy"),
      description: "Privacy details",
      path: "/privacy",
    });

    expect(metadata.title).toEqual({
      absolute: `Privacy Policy | ${SITE_AUTHOR}`,
    });
    expect(metadata.alternates?.canonical).toBe(`${SITE_URL}/privacy`);
  });

  it("supports em dash resume titles", () => {
    expect(titledPage("Resume", " — ")).toBe(`Resume — ${SITE_AUTHOR}`);
  });
});
