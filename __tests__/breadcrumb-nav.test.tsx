import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BreadcrumbNav } from "@/components/layout/breadcrumb-nav";

describe("BreadcrumbNav", () => {
  it("renders linked ancestors and marks the current page", () => {
    render(
      <BreadcrumbNav
        items={[
          { name: "Home", path: "/" },
          { name: "Resume", path: "/resume" },
        ]}
      />,
    );

    const nav = screen.getByRole("navigation", { name: /breadcrumb/i });
    expect(nav).toBeInTheDocument();

    const home = screen.getByRole("link", { name: "Home" });
    expect(home).toHaveAttribute("href", "/");

    const current = screen.getByText("Resume");
    expect(current).toHaveAttribute("aria-current", "page");
    expect(screen.queryByRole("link", { name: "Resume" })).not.toBeInTheDocument();
  });

  it("renders nothing when items are empty", () => {
    const { container } = render(<BreadcrumbNav items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
