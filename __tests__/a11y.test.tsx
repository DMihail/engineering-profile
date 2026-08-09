import React from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { ContactSection } from "@/components/sections/contact-section";
import { PrivacyPolicyDocument } from "@/components/legal/privacy-policy-document";
import { ResumeDocument } from "@/components/resume/resume-document";
import { ResumeToolbar } from "@/components/resume/resume-toolbar";
import { Footer } from "@/components/layout/footer";
import { SkipLink } from "@/components/layout/skip-link";

expect.extend(toHaveNoViolations);

jest.mock("@/lib/content/portfolio/social-links", () => ({
  SOCIAL_LINKS: [],
}));

jest.mock("@/lib/recaptcha-client", () => ({
  ensureRecaptchaLoaded: jest.fn().mockResolvedValue(undefined),
}));

/** CSS modules are mocked — skip computed color-contrast in jsdom. */
const axeOptions = {
  rules: {
    "color-contrast": { enabled: false },
  },
};

describe("accessibility smoke (axe)", () => {
  it("contact section has no serious violations", async () => {
    const { container } = render(<ContactSection />);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("privacy policy document has no serious violations", async () => {
    const { container } = render(<PrivacyPolicyDocument />);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("resume document and toolbar have no serious violations", async () => {
    const { container } = render(
      <>
        <ResumeToolbar variant="ireland" />
        <ResumeDocument variant="ireland" />
      </>,
    );
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("footer and skip link have no serious violations", async () => {
    const { container } = render(
      <>
        <SkipLink home />
        <Footer />
      </>,
    );
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
