import { buildSiteJsonLd } from "@/lib/json-ld";

describe("buildSiteJsonLd", () => {
  it("includes WebSite and Person in @graph", () => {
    const data = buildSiteJsonLd();
    expect(data["@graph"]).toHaveLength(2);
    const types = data["@graph"].map((node) => node["@type"]);
    expect(types).toContain("WebSite");
    expect(types).toContain("Person");
  });

  it("links Person image and Dublin address", () => {
    const person = buildSiteJsonLd()["@graph"].find((node) => node["@type"] === "Person");
    expect(person?.image).toMatch(/opengraph-image$/);
    expect(person?.address).toMatchObject({
      addressLocality: "Dublin",
      addressCountry: "IE",
    });
    expect(person?.workLocation).toMatchObject({
      "@type": "Place",
      name: expect.stringContaining("Dublin"),
    });
  });
});
