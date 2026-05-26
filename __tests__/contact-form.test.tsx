import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { ContactSection } from "@/components/sections/contact-section";

jest.mock("@/lib/hooks", () => ({
  useFadeIn: () => ({
    ref: { current: null },
    fade: {},
  }),
}));

jest.mock("@/lib/data", () => ({
  SOCIAL_LINKS: [],
}));

const mockFetch = jest.fn();
global.fetch = mockFetch;

const mockExecute = jest.fn().mockResolvedValue("mock-recaptcha-token");
Object.defineProperty(window, "grecaptcha", {
  value: {
    ready: (cb: () => void) => cb(),
    execute: mockExecute,
  },
  writable: true,
});

let fakeTime = 100_000;
const realDateNow = Date.now;

beforeEach(() => {
  jest.clearAllMocks();
  fakeTime += 20_000;
  jest.spyOn(Date, "now").mockImplementation(() => fakeTime);
  mockFetch.mockResolvedValue({
    ok: true,
    json: async () => ({ success: true }),
  });
});

afterAll(() => {
  Date.now = realDateNow;
});

describe("ContactSection form", () => {
  it("renders all form fields", () => {
    render(<ContactSection />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
  });

  it("shows validation error for short name", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    await user.type(screen.getByLabelText(/name/i), "A");
    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/message/i), "This is a long enough message for validation");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();
    });
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("shows validation error for invalid email (short TLD)", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "user@domain.x");
    await user.type(screen.getByLabelText(/message/i), "This is a long enough message for validation");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument();
    });
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("shows validation error for disposable email", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "test@mailinator.com");
    await user.type(screen.getByLabelText(/message/i), "This is a long enough message for validation");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/disposable email/i)).toBeInTheDocument();
    });
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("shows validation error for short message", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/message/i), "Short");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/too short/i)).toBeInTheDocument();
    });
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("submits form successfully and shows success state", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/message/i), "Hello, I have a project for you. Let's talk about it!");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument();
    });

    expect(mockExecute).toHaveBeenCalledWith(
      undefined,
      { action: "contact_submit" }
    );
    expect(mockFetch).toHaveBeenCalledWith("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: expect.stringContaining("john@example.com"),
    });
  });

  it("shows error when API returns non-ok response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Captcha verification failed" }),
    });

    const user = userEvent.setup();
    render(<ContactSection />);

    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/message/i), "Hello, I have a project for you. Let's talk about it!");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/failed to send/i)).toBeInTheDocument();
    });
  });

  it("has maxLength attributes on inputs", () => {
    render(<ContactSection />);
    expect(screen.getByLabelText(/name/i)).toHaveAttribute("maxlength", "100");
    expect(screen.getByLabelText(/email/i)).toHaveAttribute("maxlength", "254");
    expect(screen.getByLabelText(/message/i)).toHaveAttribute("maxlength", "2000");
  });
});
