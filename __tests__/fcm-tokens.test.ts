/**
 * @jest-environment node
 */
import {
  listAllFcmDeviceRegistrations,
  listContactPushFcmRegistrations,
  listFcmDeviceRegistrations,
} from "@/lib/fcm-tokens";

const mockDevicesGet = jest.fn();
const mockCollectionGroupGet = jest.fn();

jest.mock("firebase-admin/firestore", () => ({
  getFirestore: () => ({
    collection: (name: string) => {
      if (name !== "fcmTokens") throw new Error(`unexpected collection ${name}`);

      return {
        doc: (uid: string) => ({
          collection: (sub: string) => {
            if (sub !== "devices") throw new Error(`unexpected sub ${sub}`);
            return {
              get: () => mockDevicesGet(uid),
            };
          },
        }),
      };
    },
    collectionGroup: (name: string) => {
      if (name !== "devices") throw new Error(`unexpected collection group ${name}`);
      return { get: mockCollectionGroupGet };
    },
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
  delete process.env.INBOX_ALLOWED_UIDS;
  mockCollectionGroupGet.mockResolvedValue({ forEach: () => undefined });
  mockDevicesGet.mockResolvedValue({ forEach: () => undefined });
});

describe("listFcmDeviceRegistrations", () => {
  it("reads devices subcollection", async () => {
    mockDevicesGet.mockResolvedValue({
      forEach: (fn: (doc: { id: string; data: () => object }) => void) => {
        fn({ id: "device-a", data: () => ({ token: "token-a" }) });
        fn({ id: "device-b", data: () => ({ token: "token-b" }) });
      },
    });

    const regs = await listFcmDeviceRegistrations("user-1");
    expect(regs).toEqual([
      { uid: "user-1", deviceId: "device-a", token: "token-a" },
      { uid: "user-1", deviceId: "device-b", token: "token-b" },
    ]);
  });

  it("returns empty when the operator has no device docs", async () => {
    mockDevicesGet.mockResolvedValue({ forEach: () => undefined });
    await expect(listFcmDeviceRegistrations("user-1")).resolves.toEqual([]);
  });
});

describe("listAllFcmDeviceRegistrations", () => {
  it("aggregates devices via collection group", async () => {
    mockCollectionGroupGet.mockResolvedValue({
      forEach: (fn: (doc: {
        id: string;
        data: () => object;
        ref: { parent: { parent: { id: string } } };
      }) => void) => {
        fn({
          id: "iphone",
          data: () => ({ token: "t1", platform: "ios" }),
          ref: { parent: { parent: { id: "user-1" } } },
        });
      },
    });

    const regs = await listAllFcmDeviceRegistrations();
    expect(regs).toEqual([
      { uid: "user-1", deviceId: "iphone", token: "t1", platform: "ios" },
    ]);
  });
});

describe("listContactPushFcmRegistrations", () => {
  it("enumerates only allowlisted UIDs", async () => {
    process.env.INBOX_ALLOWED_UIDS = "allowed-uid, other-uid";
    mockDevicesGet.mockImplementation(async (uid: string) => ({
      forEach: (fn: (doc: { id: string; data: () => object }) => void) => {
        if (uid === "allowed-uid") {
          fn({ id: "phone", data: () => ({ token: "tok-allowed", platform: "ios" }) });
        }
      },
    }));

    const regs = await listContactPushFcmRegistrations();
    expect(regs).toEqual([
      { uid: "allowed-uid", deviceId: "phone", token: "tok-allowed", platform: "ios" },
    ]);
    expect(mockCollectionGroupGet).not.toHaveBeenCalled();
  });

  it("refuses fan-out in production when allowlist is empty", async () => {
    const previous = process.env.NODE_ENV;
    Object.defineProperty(process.env, "NODE_ENV", { value: "production", configurable: true });
    try {
      await expect(listContactPushFcmRegistrations()).resolves.toEqual([]);
      expect(mockCollectionGroupGet).not.toHaveBeenCalled();
    } finally {
      Object.defineProperty(process.env, "NODE_ENV", { value: previous, configurable: true });
    }
  });
});
