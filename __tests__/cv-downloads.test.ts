import { CV_DOWNLOADS, CV_FILES, cvDownloadForRegion } from "@/lib/content/cv";

describe("cv downloads", () => {
  it("maps regions to the correct PDF assets", () => {
    expect(cvDownloadForRegion("intl")).toEqual(CV_DOWNLOADS.intl);
    expect(cvDownloadForRegion("ua")).toEqual(CV_DOWNLOADS.ua);
    expect(CV_DOWNLOADS.ua.file).toBe("/Mykhailo_Dzhezhelo_CV_UK.pdf");
    expect(CV_FILES).toEqual([CV_DOWNLOADS.intl.file, CV_DOWNLOADS.ua.file]);
  });
});
