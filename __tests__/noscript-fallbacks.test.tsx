import { renderToStaticMarkup } from "react-dom/server";
import { NavBarNoScript } from "@/components/layout/nav-bar-noscript";
import { ContactNoScriptFallback } from "@/components/contact/contact-noscript-fallback";
import { SITE_EMAIL } from "@/lib/config";
import { UI_LABELS } from "@/lib/content/ui-labels";

describe("NavBarNoScript", () => {
  it("renders section links inside noscript markup", () => {
    const html = renderToStaticMarkup(<NavBarNoScript />);

    expect(html).toContain("<noscript>");
    expect(html).toContain(`aria-label="${UI_LABELS.nav.noScript}"`);
    expect(html).toContain('href="/#');
  });
});

describe("ContactNoScriptFallback", () => {
  it("renders mailto fallback inside noscript markup", () => {
    const html = renderToStaticMarkup(<ContactNoScriptFallback />);

    expect(html).toContain("<noscript>");
    expect(html).toContain(UI_LABELS.contact.noScriptMessage);
    expect(html).toContain(`mailto:${SITE_EMAIL}`);
    expect(html).toContain("Portfolio%20inquiry");
    expect(html).toContain("display:none!important");
  });
});
