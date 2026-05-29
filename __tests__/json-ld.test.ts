import { buildSiteJsonLd, type JsonLdPerson, type JsonLdItemList } from "@/lib/json-ld";
import { CASE_STUDIES } from "@/lib/data/case-studies";
import { SITE_LOCATION } from "@/lib/config";

function isPersonNode(node: { "@type": string }): node is JsonLdPerson {
  return node["@type"] === "Person";
}

function isItemListNode(node: { "@type": string }): node is JsonLdItemList {
  return node["@type"] === "ItemList";
}

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
    const person = buildSiteJsonLd()["@graph"].find(isPersonNode);
    expect(person?.image).toMatch(/profile-image$/);
    expect(person?.address).toMatchObject({
      addressLocality: "Dublin",
      addressCountry: "IE",
    });
    expect(person?.workLocation).toMatchObject({
      "@type": "Place",
      name: SITE_LOCATION,
    });
  });

  it("lists all case studies in ItemList with per-project URLs", () => {
    const list = buildSiteJsonLd()["@graph"].find(isItemListNode);
    expect(list?.itemListElement).toHaveLength(CASE_STUDIES.length);
    expect(list?.itemListElement[0]?.item?.name).toBe(CASE_STUDIES[0]?.title);
    expect(list?.itemListElement[0]?.item?.url).toBe(
      `https://dzhezhelo.dev/#project-${CASE_STUDIES[0]?.id}`,
    );
  });
});
