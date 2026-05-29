import { isLegacyIndexPage } from "@/lib/legacy-index-page";

describe("isLegacyIndexPage", () => {
  it.each([
    "/index.html",
    "/index.htm",
    "/index.php",
    "/index.asp",
    "/default.html",
    "/default.htm",
    "/home.html",
    "/home.htm",
    "/Index.html",
    "/INDEX.PHP",
    "/index.html/",
    "/home.htm/",
  ])("matches %s", (path) => {
    expect(isLegacyIndexPage(path)).toBe(true);
  });

  it.each([
    "/",
    "/resume",
    "/index",
    "/index.xml",
    "/my-index.html",
    "/folder/index.html",
    "/Mykhailo_Dzhezhelo_CV_Ireland.pdf",
  ])("does not match %s", (path) => {
    expect(isLegacyIndexPage(path)).toBe(false);
  });
});
