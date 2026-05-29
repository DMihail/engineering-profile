import { escapeHtml, sanitizeEmailHeaderValue } from "@/lib/escape-html";

describe("escapeHtml", () => {
  it("escapes HTML special characters", () => {
    const payload = "\u003cimg src=x onerror=\"alert(1)\">";
    expect(escapeHtml(payload)).toBe(
      "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;",
    );
    expect(escapeHtml("Tom & Jerry")).toBe("Tom &amp; Jerry");
    expect(escapeHtml("it's fine")).toBe("it&#39;s fine");
  });

  it("preserves newlines for downstream br conversion", () => {
    expect(escapeHtml("line1\nline2")).toBe("line1\nline2");
  });
});

describe("sanitizeEmailHeaderValue", () => {
  it("removes CRLF injection characters", () => {
    expect(sanitizeEmailHeaderValue("Acme\r\nBcc: evil@example.com")).toBe(
      "Acme  Bcc: evil@example.com",
    );
  });

  it("trims surrounding whitespace", () => {
    expect(sanitizeEmailHeaderValue("  Hello  ")).toBe("Hello");
  });
});
