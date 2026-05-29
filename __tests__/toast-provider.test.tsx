/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { ToastProvider, useToast } from "@/components/ui/toast/toast-provider";

function ToastHarness() {
  const toast = useToast();

  return (
    <button
      type="button"
      onClick={() => {
        toast.error("First message", "First");
        toast.success("Second message", "Second");
      }}
    >
      Show two
    </button>
  );
}

describe("ToastProvider", () => {
  it("exits the previous toast when a new one appears", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <ToastHarness />
      </ToastProvider>,
    );

    await user.click(screen.getByRole("button", { name: /show two/i }));

    await waitFor(() => {
      expect(screen.getByText("Second message")).toBeInTheDocument();
    });

    expect(screen.queryByText("First message")).not.toBeInTheDocument();
  });
});
