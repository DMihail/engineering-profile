import { getClientCvLink, getServerCvLink } from "@/lib/contact-cv";

describe("contact-cv", () => {
  const originalCookie = Object.getOwnPropertyDescriptor(Document.prototype, "cookie");

  afterEach(() => {
    if (originalCookie) {
      Object.defineProperty(document, "cookie", originalCookie);
    }
    jest.restoreAllMocks();
  });

  it("returns Ireland CV on the server snapshot", () => {
    expect(getServerCvLink().file).toContain("Ireland");
  });

  it("uses the contact-region cookie for the client CV", () => {
    Object.defineProperty(document, "cookie", {
      configurable: true,
      get: () => "contact-region=ua",
    });
    expect(getClientCvLink().file).toContain("UK");
    expect(getClientCvLink().label).toMatch(/UA/i);
  });
});
