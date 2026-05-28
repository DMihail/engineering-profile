import { normalizePrivateKey } from "@/lib/firebase-admin";

const BEGIN = "-----BEGIN PRIVATE KEY-----";
const END = "-----END PRIVATE KEY-----";
const BODY = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC";

describe("normalizePrivateKey", () => {
  it("converts literal \\n to newlines", () => {
    const raw = `${BEGIN}\\n${BODY}\\n${END}\\n`;
    const key = normalizePrivateKey(raw);
    expect(key).toContain("\n");
    expect(key).toContain(BEGIN);
    expect(key).not.toContain("\\n");
  });

  it("reformats single-line PEM", () => {
    const raw = `${BEGIN}${BODY}${END}`;
    const key = normalizePrivateKey(raw)!;
    expect(key.split("\n").length).toBeGreaterThan(2);
    expect(key).toMatch(/-----BEGIN PRIVATE KEY-----\n/);
  });

  it("strips surrounding quotes", () => {
    const raw = `"${BEGIN}\\n${BODY}\\n${END}\\n"`;
    const key = normalizePrivateKey(raw);
    expect(key?.startsWith(BEGIN)).toBe(true);
  });
});
