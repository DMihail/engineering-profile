import { maskFcmTokenForLog } from "@/lib/fcm-log";

describe("maskFcmTokenForLog", () => {
  it("masks tokens for server logs", () => {
    const masked = maskFcmTokenForLog("abcdefghijklmnopqrstuvwxyz");
    expect(masked).toContain("…");
    expect(masked.length).toBeLessThan(30);
  });
});
