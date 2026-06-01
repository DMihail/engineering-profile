/**
 * @jest-environment node
 */
import {
  listAllFcmDeviceRegistrations,
  listFcmDeviceRegistrations,
} from "@/lib/fcm-tokens";

const mockDevicesGet = jest.fn();
const mockLegacyGet = jest.fn();
const mockUserDocs = jest.fn();
const mockCollectionGroupGet = jest.fn();

jest.mock("firebase-admin/firestore", () => ({
  getFirestore: () => ({
    collection: (name: string) => {
      if (name !== "fcmTokens") throw new Error(`unexpected collection ${name}`);

      return {
        doc: () => ({
          get: mockLegacyGet,
          collection: (sub: string) => {
            if (sub !== "devices") throw new Error(`unexpected sub ${sub}`);
            return { get: mockDevicesGet };
          },
        }),
        get: mockUserDocs,
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
  mockUserDocs.mockResolvedValue({ docs: [] });
  mockCollectionGroupGet.mockResolvedValue({ forEach: () => undefined });
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
    expect(mockLegacyGet).not.toHaveBeenCalled();
  });

  it("falls back to legacy parent token doc", async () => {
    mockDevicesGet.mockResolvedValue({ forEach: () => undefined });
    mockLegacyGet.mockResolvedValue({
      data: () => ({ token: "legacy-token" }),
    });

    const regs = await listFcmDeviceRegistrations("user-1");
    expect(regs).toEqual([
      { uid: "user-1", deviceId: "__legacy__", token: "legacy-token" },
    ]);
  });
});

describe("listAllFcmDeviceRegistrations", () => {
  it("aggregates devices via collection group (no parent fcmTokens doc required)", async () => {
    mockCollectionGroupGet.mockResolvedValue({
      forEach: (fn: (doc: { id: string; data: () => object; ref: { parent: { parent: { id: string } } } }) => void) => {
        fn({
          id: "iphone",
          data: () => ({ token: "t1" }),
          ref: { parent: { parent: { id: "user-1" } } },
        });
      },
    });

    const regs = await listAllFcmDeviceRegistrations();
    expect(regs).toEqual([{ uid: "user-1", deviceId: "iphone", token: "t1" }]);
    expect(mockUserDocs).toHaveBeenCalled();
  });

  it("includes legacy parent token when collection group is empty", async () => {
    mockUserDocs.mockResolvedValue({
      docs: [
        {
          id: "user-legacy",
          data: () => ({ token: "legacy-only" }),
        },
      ],
    });

    const regs = await listAllFcmDeviceRegistrations();
    expect(regs).toEqual([
      { uid: "user-legacy", deviceId: "__legacy__", token: "legacy-only" },
    ]);
  });
});
