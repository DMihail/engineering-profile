import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { ContactSection } from "@/components/sections/contact-section";

jest.mock("@/lib/content/portfolio/social-links", () => ({
  SOCIAL_LINKS: [],
}));

jest.mock("@/lib/recaptcha-client", () => ({
  ensureRecaptchaLoaded: jest.fn().mockResolvedValue(undefined),
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
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY = "test-site-key";
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

function renderContactSection() {
  return render(<ContactSection />);
}

async function acceptPrivacyConsent(user: ReturnType<typeof userEvent.setup>) {
  await user.click(
    screen.getByRole("checkbox", { name: /privacy policy/i }),
  );
}

async function expectFormError(pattern: RegExp) {
  await waitFor(() => {
    expect(screen.getByRole("alert")).toHaveTextContent(pattern);
  });
}

describe("ContactSection form", () => {
  it("renders all form fields", () => {
    renderContactSection();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: /privacy policy/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
  });

  it("shows validation error when privacy consent is missing", async () => {
    const user = userEvent.setup();
    renderContactSection();

    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/message/i), "Hello, I have a project for you. Let's talk about it!");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await expectFormError(/confirm you have read the privacy policy/i);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("shows validation error for short name", async () => {
    const user = userEvent.setup();
    renderContactSection();

    await user.type(screen.getByLabelText(/name/i), "A");
    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/message/i), "This is a long enough message for validation");
    await acceptPrivacyConsent(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await expectFormError(/please enter your name/i);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("shows validation error for invalid email (short TLD)", async () => {
    const user = userEvent.setup();
    renderContactSection();

    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "user@domain.x");
    await user.type(screen.getByLabelText(/message/i), "This is a long enough message for validation");
    await acceptPrivacyConsent(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await expectFormError(/valid email/i);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("shows validation error for disposable email", async () => {
    const user = userEvent.setup();
    renderContactSection();

    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "test@mailinator.com");
    await user.type(screen.getByLabelText(/message/i), "This is a long enough message for validation");
    await acceptPrivacyConsent(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await expectFormError(/disposable email/i);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("shows validation error for short message", async () => {
    const user = userEvent.setup();
    renderContactSection();

    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/message/i), "Short");
    await acceptPrivacyConsent(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await expectFormError(/too short/i);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("submits form successfully and shows success state", async () => {
    const user = userEvent.setup();
    renderContactSection();

    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/message/i), "Hello, I have a project for you. Let's talk about it!");
    await acceptPrivacyConsent(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /^message sent$/i })).toBeInTheDocument();
      expect(screen.getByText(/get back to you within 24 hours/i)).toBeInTheDocument();
    });

    // Success copy lives in the toast, not the form <output>.
    expect(document.querySelector("form output")).toBeNull();
    expect(mockExecute).toHaveBeenCalledWith(
      "test-site-key",
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
    renderContactSection();

    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/message/i), "Hello, I have a project for you. Let's talk about it!");
    await acceptPrivacyConsent(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await expectFormError(/captcha verification failed/i);

    expect(screen.getByLabelText(/name/i)).toHaveValue("John Doe");
    expect(screen.getByLabelText(/email/i)).toHaveValue("john@example.com");
    expect(screen.getByLabelText(/message/i)).toHaveValue(
      "Hello, I have a project for you. Let's talk about it!",
    );
  });

  it("keeps field values after validation errors", async () => {
    const user = userEvent.setup();
    renderContactSection();

    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/message/i), "Short");
    await acceptPrivacyConsent(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await expectFormError(/too short/i);

    expect(screen.getByLabelText(/name/i)).toHaveValue("John Doe");
    expect(screen.getByLabelText(/email/i)).toHaveValue("john@example.com");
    expect(screen.getByLabelText(/message/i)).toHaveValue("Short");
  });

  it("has maxLength attributes on inputs", () => {
    renderContactSection();
    expect(screen.getByLabelText(/name/i)).toHaveAttribute("maxlength", "100");
    expect(screen.getByLabelText(/name/i)).toHaveAttribute("minlength", "2");
    expect(screen.getByLabelText(/email/i)).toHaveAttribute("maxlength", "254");
    expect(screen.getByLabelText(/message/i)).toHaveAttribute("maxlength", "2000");
    expect(screen.getByLabelText(/message/i)).toHaveAttribute("minlength", "10");
  });

  it("does not call the API when HTML validation fails on empty submit", async () => {
    const user = userEvent.setup();
    renderContactSection();

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(mockFetch).not.toHaveBeenCalled();
    expect(mockExecute).not.toHaveBeenCalled();
  });

  it("exposes field hints below inputs with aria-describedby on validation failure", async () => {
    const user = userEvent.setup();
    renderContactSection();

    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      const nameInput = screen.getByLabelText(/^name$/i);
      expect(nameInput).toHaveAttribute("aria-invalid", "true");
      expect(nameInput).toHaveAttribute("aria-describedby", "contact-name-error");
      expect(document.getElementById("contact-name-error")).toHaveTextContent(/please enter your name/i);
    });
  });
});
