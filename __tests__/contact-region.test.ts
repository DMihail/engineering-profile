import { phoneForRegion, PHONE_UA, PHONE_INTL } from "@/lib/contact-region";

describe("contact-region", () => {
  it("returns UA phone for ua region", () => {
    expect(phoneForRegion("ua")).toEqual(PHONE_UA);
  });

  it("returns international phone for intl region", () => {
    expect(phoneForRegion("intl")).toEqual(PHONE_INTL);
  });
});
