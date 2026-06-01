import { buildInboxFcmMulticastFields } from "@/lib/build-inbox-fcm-message";

describe("buildInboxFcmMulticastFields", () => {
  it("uses absolute inbox URL and APNs alert for iOS web push", () => {
    const fields = buildInboxFcmMulticastFields("https://inbox.example.com/", {
      title: "Message from Ada",
      body: "Ada · ada@example.com",
      messageId: "abc",
      preview: "Hello",
      senderName: "Ada",
      senderEmail: "ada@example.com",
    });

    expect(fields.data).toEqual(
      expect.objectContaining({ url: "https://inbox.example.com" }),
    );
    expect(fields.webpush?.fcmOptions?.link).toBe("https://inbox.example.com");
    expect(fields.apns?.payload?.aps?.alert).toEqual({
      title: "Message from Ada",
      body: "Ada · ada@example.com",
    });
    expect(fields.webpush).not.toHaveProperty("notification");
  });

  it("falls back to / when inbox URL is not absolute", () => {
    const fields = buildInboxFcmMulticastFields("", {
      title: "T",
      body: "B",
      messageId: "1",
      preview: "P",
      senderName: "N",
      senderEmail: "e@e.com",
    });

    expect(fields.data).toEqual(expect.objectContaining({ url: "/" }));
    expect(fields.webpush?.fcmOptions).toBeUndefined();
  });
});
