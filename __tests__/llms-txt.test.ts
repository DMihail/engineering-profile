import { readFileSync } from "node:fs";
import { join } from "node:path";

const publicDir = join(process.cwd(), "public");

describe("llms agent briefs", () => {
  const llms = readFileSync(join(publicDir, "llms.txt"), "utf8");
  const full = readFileSync(join(publicDir, "llms-full.txt"), "utf8");

  it("llms.txt is a short hire card with canonical URLs and contact policy", () => {
    expect(llms).toContain("Mykhailo Dzhezhelo");
    expect(llms).toContain("https://dzhezhelo.dev/");
    expect(llms).toContain("https://dzhezhelo.dev/resume");
    expect(llms).toContain("https://dzhezhelo.dev/#contact");
    expect(llms).toContain("https://dzhezhelo.dev/llms-full.txt");
    expect(llms).toContain("Prefer the HTML resume");
    expect(llms).toMatch(/contact form/i);
    expect(llms).not.toContain("dzezelomihail@gmail.com");
  });

  it("llms-full.txt expands projects and experience without exposing cold-email guidance", () => {
    expect(full).toContain("Vitadrop");
    expect(full).toContain("Waddington");
    expect(full).toContain("Amako");
    expect(full).toContain("Keept");
    expect(full).toContain("Elementica");
    expect(full).toContain("Do not scrape email");
    expect(full).toContain("https://dzhezhelo.dev/llms.txt");
  });
});
