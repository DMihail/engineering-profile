/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { proxy } from "@/proxy";

function requestFor(path: string) {
  return new NextRequest(`https://dzhezhelo.dev${path}`);
}

describe("proxy", () => {
  it("allows canonical home", () => {
    const res = proxy(requestFor("/"));
    expect(res.status).toBe(200);
  });

  it("allows static files with extensions (e.g. CV PDFs)", () => {
    const res = proxy(requestFor("/Mykhailo_Dzhezhelo_CV_Ireland.pdf"));
    expect(res.status).toBe(200);
  });

  it("redirects unknown paths to home with 308", () => {
    const res = proxy(requestFor("/not-a-real-page"));
    expect(res.status).toBe(308);
    expect(res.headers.get("location")).toBe("https://dzhezhelo.dev/");
  });

  it("redirects section paths to home hash", () => {
    const res = proxy(requestFor("/projects"));
    expect(res.status).toBe(308);
    expect(res.headers.get("location")).toBe("https://dzhezhelo.dev/#projects");
  });

  it("redirects education path to home hash", () => {
    const res = proxy(requestFor("/education"));
    expect(res.status).toBe(308);
    expect(res.headers.get("location")).toBe("https://dzhezhelo.dev/#education");
  });
});
