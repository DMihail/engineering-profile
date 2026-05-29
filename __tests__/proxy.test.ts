/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { proxy } from "@/proxy";

function requestFor(path: string) {
  return new NextRequest(`https://dzhezhelo.dev${path}`);
}

describe("proxy index aliases", () => {
  it.each(["/index.html", "/index.php", "/INDEX.HTML"])(
    "redirects %s to / with 301",
    (path) => {
      const res = proxy(requestFor(path));
      expect(res.status).toBe(301);
      expect(res.headers.get("location")).toBe("https://dzhezhelo.dev/");
    },
  );

  it("allows canonical home", () => {
    const res = proxy(requestFor("/"));
    expect(res.status).toBe(200);
  });
});
