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

jest.mock("firebase-admin/firestore", () => ({
  getFirestore: () => ({
    collection: (name: string) => {
      if (name !== "fcmTokens") throw new Error(`unexpected collection ${name}`);

      return {
        doc: (uid: string) => ({
          get: mockLegacyGet,
          collection: (sub: string) => {
            if (sub !== "devices") throw new Error(`unexpected sub ${sub}`);
            return { get: mockDevicesGet };
          },
        }),
        get: mockUserDocs,
      };
    },
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
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
  it("aggregates devices across users", async () => {
    mockUserDocs.mockResolvedValue({
      docs: [
        {
          id: "user-1",
          data: () => ({}),
          ref: {
            collection: () => ({
              get: jest.fn().mockResolvedValue({
                forEach: (fn: (doc: { id: string; data: () => object }) => void) => {
                  fn({ id: "iphone", data: () => ({ token: "t1" }) });
                },
              }),
            }),
          },
        },
      ],
    });

    const regs = await listAllFcmDeviceRegistrations();
    expect(regs).toEqual([{ uid: "user-1", deviceId: "iphone", token: "t1" }]);
  });
});
