/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { proxy } from "@/proxy";
import { withNodeEnv } from "./helpers/with-node-env";

function requestFor(path: string) {
  return new NextRequest(`https://dzhezhelo.dev${path}`);
}

describe("proxy", () => {
  it("allows canonical home", () => {
    const res = proxy(requestFor("/"));
    expect(res.status).toBe(200);
  });

  it("sets a per-request CSP with nonce on allowed routes in production", () => {
    withNodeEnv("production", () => {
      const res = proxy(requestFor("/"));
      const csp = res.headers.get("Content-Security-Policy");
      expect(csp).toBeTruthy();
      const nonce = csp?.match(/'nonce-([^']+)'/)?.[1];
      expect(nonce).toBeTruthy();
      const scriptSrc = csp?.split(";").find((part) => part.trim().startsWith("script-src")) ?? "";
      expect(scriptSrc).toContain(`'nonce-${nonce}'`);
      expect(scriptSrc).not.toContain("'unsafe-inline'");
    });
  });

  it("allows resume page", () => {
    const res = proxy(requestFor("/resume"));
    expect(res.status).toBe(200);
  });

  it("allows static files with extensions (e.g. CV PDFs)", () => {
    const res = proxy(requestFor("/Mykhailo_Dzhezhelo_CV_Ireland.pdf"));
    expect(res.status).toBe(200);
  });

  it("passes unknown paths through for app 404 handling", () => {
    const res = proxy(requestFor("/not-a-real-page"));
    expect(res.status).toBe(200);
    expect(res.headers.get("location")).toBeNull();
  });

  it("passes nested unknown paths through for app 404 handling", () => {
    const res = proxy(requestFor("/projects/not-real"));
    expect(res.status).toBe(200);
    expect(res.headers.get("location")).toBeNull();
  });

  it.each([
    "/index.html",
    "/index.htm",
    "/index.php",
    "/index.asp",
    "/default.html",
    "/home.html",
    "/Index.html",
    "/INDEX.PHP",
    "/index.html/",
    "/index.php/",
  ])("redirects legacy index page %s to canonical home", (path) => {
    const res = proxy(requestFor(path));
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
