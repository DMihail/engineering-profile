import { buildSiteJsonLd } from "@/lib/json-ld";
import { CASE_STUDIES } from "@/lib/data";

describe("buildSiteJsonLd", () => {
  it("includes WebSite, Person, and ItemList in @graph", () => {
    const data = buildSiteJsonLd();
    expect(data["@graph"]).toHaveLength(3);
    const types = data["@graph"].map((node) => node["@type"]);
    expect(types).toContain("WebSite");
    expect(types).toContain("Person");
    expect(types).toContain("ItemList");
  });

  it("uses square profile image for Person", () => {
    const person = buildSiteJsonLd()["@graph"].find((node) => node["@type"] === "Person");
    expect(person?.image).toMatch(/profile-image$/);
    expect(person?.address).toMatchObject({
      addressLocality: "Dublin",
      addressCountry: "IE",
    });
    expect(person?.workLocation).toMatchObject({
      "@type": "Place",
      name: expect.stringContaining("Dublin"),
    });
  });

  it("lists all case studies in ItemList", () => {
    const list = buildSiteJsonLd()["@graph"].find((node) => node["@type"] === "ItemList");
    expect(list?.itemListElement).toHaveLength(CASE_STUDIES.length);
    expect(list?.itemListElement[0]?.item?.name).toBe(CASE_STUDIES[0]?.title);
  });
});
