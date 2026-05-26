import { validateEmail } from "@/lib/validate-email";

describe("validateEmail", () => {
  it("accepts valid emails", () => {
    expect(validateEmail("user@example.com")).toBeNull();
    expect(validateEmail("john.doe@company.co.uk")).toBeNull();
    expect(validateEmail("  User@Gmail.COM  ")).toBeNull();
  });

  it("rejects emails without @", () => {
    expect(validateEmail("invalid")).not.toBeNull();
    expect(validateEmail("user.example.com")).not.toBeNull();
  });

  it("rejects emails with spaces", () => {
    expect(validateEmail("user @example.com")).not.toBeNull();
    expect(validateEmail("user@ example.com")).not.toBeNull();
  });

  it("rejects empty string", () => {
    expect(validateEmail("")).not.toBeNull();
  });

  it("rejects domains shorter than 4 chars", () => {
    expect(validateEmail("a@b.c")).not.toBeNull();
  });

  it("rejects numeric TLDs", () => {
    expect(validateEmail("user@domain.123")).not.toBeNull();
  });

  it("rejects single-char TLDs", () => {
    expect(validateEmail("user@domain.x")).not.toBeNull();
  });

  it("rejects disposable email domains", () => {
    const disposable = [
      "mailinator.com",
      "guerrillamail.com",
      "yopmail.com",
      "tempmail.com",
      "10minutemail.com",
      "maildrop.cc",
      "burnermail.io",
    ];

    for (const domain of disposable) {
      const result = validateEmail(`test@${domain}`);
      expect(result).toBe(
        "Disposable email addresses are not accepted. Please use a real email."
      );
    }
  });

  it("accepts legitimate domains that resemble disposable ones", () => {
    expect(validateEmail("user@gmail.com")).toBeNull();
    expect(validateEmail("user@outlook.com")).toBeNull();
    expect(validateEmail("user@protonmail.com")).toBeNull();
  });

  it("is case-insensitive", () => {
    expect(validateEmail("User@MAILINATOR.COM")).toBe(
      "Disposable email addresses are not accepted. Please use a real email."
    );
  });
});
