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

  it("wires route-specific Open Graph and Twitter images", () => {
    const metadata = buildRouteMetadata({
      title: titledPage("Resume", " — "),
      description: "Resume page",
      path: "/resume",
      ogImagePath: "/resume/opengraph-image",
    });

    const ogImages = metadata.openGraph?.images;
    expect(Array.isArray(ogImages) ? ogImages[0] : ogImages).toMatchObject({
      url: "/resume/opengraph-image",
    });
    expect(metadata.twitter?.images).toEqual(["/resume/opengraph-image"]);
  });
});
