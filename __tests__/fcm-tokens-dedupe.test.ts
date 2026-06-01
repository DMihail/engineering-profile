/**
 * @jest-environment node
 */
import { dedupeFcmRegistrationsByToken } from "@/lib/fcm-tokens";

describe("dedupeFcmRegistrationsByToken", () => {
  it("keeps one registration per token", () => {
    const deduped = dedupeFcmRegistrationsByToken([
      { uid: "u1", deviceId: "a", token: "same-token" },
      { uid: "u1", deviceId: "b", token: "same-token" },
      { uid: "u1", deviceId: "c", token: "other-token" },
    ]);

    expect(deduped).toHaveLength(2);
    expect(deduped.map((r) => r.token).sort()).toEqual(["other-token", "same-token"]);
  });
});
