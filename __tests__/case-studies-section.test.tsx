import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CaseStudiesSection } from "@/components/sections/case-studies-section";
import { projectFragmentId } from "@/lib/content/seo";

describe("CaseStudiesSection", () => {
  it("opens the Vitadrop case study by default", () => {
    render(<CaseStudiesSection />);

    const vitadrop = document.getElementById(projectFragmentId("vitadrop"));
    expect(vitadrop).toBeInstanceOf(HTMLDetailsElement);
    expect((vitadrop as HTMLDetailsElement).open).toBe(true);

    const otherPanels = Array.from(document.querySelectorAll("details.case-details")).filter(
      (el) => el !== vitadrop,
    );
    expect(otherPanels.length).toBeGreaterThan(0);
    expect(otherPanels.every((el) => !(el as HTMLDetailsElement).open)).toBe(true);

    expect(screen.getByRole("heading", { name: /vitadrop/i })).toBeInTheDocument();
  });
});
