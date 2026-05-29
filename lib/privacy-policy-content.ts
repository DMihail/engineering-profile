import { SITE_AUTHOR, SITE_EMAIL, SITE_URL } from "@/lib/config";

export const PRIVACY_POLICY_LAST_UPDATED = "27 May 2026";

export type PrivacyListItem = string | { term: string; detail: string };

export type PrivacySection = {
  id: string;
  title: string;
  paragraphs: string[];
  list?: PrivacyListItem[];
};

export const PRIVACY_POLICY_INTRO = {
  title: "Privacy Policy",
  summary:
    "This policy explains how personal data is collected, used, and protected when you visit dzhezhelo.dev — the portfolio website of Mykhailo Dzhezhelo.",
  lastUpdated: PRIVACY_POLICY_LAST_UPDATED,
  siteUrl: SITE_URL,
  controller: SITE_AUTHOR,
  contactEmail: SITE_EMAIL,
};

export const PRIVACY_POLICY_SECTIONS: PrivacySection[] = [
  {
    id: "controller",
    title: "1. Who is responsible for your data",
    paragraphs: [
      `${SITE_AUTHOR} operates ${SITE_URL} (the “Site”) as a personal portfolio and contact channel.`,
      "For the purposes of the EU General Data Protection Regulation (GDPR) and applicable Irish data-protection law, the data controller is:",
      `${SITE_AUTHOR}\nEmail: ${SITE_EMAIL}`,
    ],
  },
  {
    id: "scope",
    title: "2. Scope",
    paragraphs: [
      "This Privacy Policy applies to your use of the Site. It does not apply to third-party websites or services that you reach through links on the Site (for example GitHub, LinkedIn, Telegram, or Calendly). Those services have their own privacy policies.",
    ],
  },
  {
    id: "data-collected",
    title: "3. Personal data we process",
    paragraphs: ["Depending on how you use the Site, we may process the following categories of data:"],
    list: [
      {
        term: "Contact form submissions",
        detail:
          "If you send a message through the contact form, we collect your name, email address, optional company name, and message content.",
      },
      {
        term: "Preference cookie",
        detail:
          "We set a first-party cookie named contact-region with a value of ua or intl so the Site can show the appropriate phone number and CV variant. It is based on your approximate country (from hosting headers) and expires after 30 days.",
      },
      {
        term: "Technical and security data",
        detail:
          "Our hosting provider (Vercel) and security tools may process IP address, browser type, request timestamps, and similar server log data when you load pages or submit the contact form.",
      },
      {
        term: "reCAPTCHA data",
        detail:
          "When you use the contact form, Google reCAPTCHA v3 may collect device and interaction signals to assess whether the submission is automated. The reCAPTCHA script is loaded only after you interact with the form, not on initial page load.",
      },
    ],
  },
  {
    id: "sources",
    title: "4. Where the data comes from",
    paragraphs: [
      "Most data is provided directly by you (for example when you complete the contact form).",
      "The contact-region cookie is set automatically by the Site using country information supplied by the hosting platform (for example x-vercel-ip-country). On the client, timezone and browser language may be used only as a fallback to choose contact details before or without a cookie.",
      "We do not use advertising trackers, social-media pixels, or third-party analytics scripts on the Site.",
    ],
  },
  {
    id: "purposes",
    title: "5. Why we use your data",
    paragraphs: ["We process personal data for the following purposes:"],
    list: [
      "To receive and respond to enquiries submitted through the contact form.",
      "To store contact messages securely in our backend database (Google Firebase Firestore).",
      "To notify the site owner of new messages through a private inbox application (Firebase Cloud Messaging).",
      "To protect the Site and contact form against spam and abuse (Google reCAPTCHA v3).",
      "To remember your regional contact preference (contact-region cookie).",
      "To operate, secure, and maintain the Site (hosting logs and error diagnostics).",
    ],
  },
  {
    id: "legal-basis",
    title: "6. Legal basis (GDPR)",
    paragraphs: ["Where GDPR applies, we rely on the following legal bases:"],
    list: [
      {
        term: "Legitimate interests",
        detail:
          "Operating a professional portfolio, responding to business enquiries, securing the Site, and remembering a functional regional preference. We balance these interests against your rights and keep processing proportionate.",
      },
      {
        term: "Steps at your request before a contract",
        detail: "Processing contact-form data when you ask about work, contracts, or collaboration.",
      },
      {
        term: "Consent",
        detail:
          "Where required for optional browser features (for example desktop notifications after form submission, if you grant permission in your browser).",
      },
    ],
  },
  {
    id: "processors",
    title: "7. Service providers and recipients",
    paragraphs: ["We use trusted providers to run the Site. They process data on our instructions:"],
    list: [
      {
        term: "Vercel",
        detail: "Website hosting, edge delivery, and infrastructure logs.",
      },
      {
        term: "Google Firebase (Firestore & Cloud Messaging)",
        detail: "Storage of contact messages and delivery of owner notifications for the private inbox app.",
      },
      {
        term: "Google reCAPTCHA",
        detail: "Bot and abuse detection for the contact form.",
      },
      {
        term: "Calendly (optional)",
        detail:
          "If a “Book a call” link is shown, clicking it takes you to Calendly, which processes data under its own terms.",
      },
    ],
  },
  {
    id: "transfers",
    title: "8. International transfers",
    paragraphs: [
      "Some providers listed above may process data outside the European Economic Area (EEA), including in the United States.",
      "Where required, we rely on appropriate safeguards such as the EU Standard Contractual Clauses or equivalent mechanisms offered by those providers.",
    ],
  },
  {
    id: "retention",
    title: "9. How long we keep data",
    paragraphs: [
      "Contact-form messages are kept for as long as needed to handle your enquiry and maintain a reasonable business record, unless you ask us to delete them sooner.",
      "The contact-region cookie expires automatically after 30 days.",
      "Server logs are retained according to our hosting provider’s default periods and operational needs.",
      "reCAPTCHA-related data is handled according to Google’s retention practices.",
    ],
  },
  {
    id: "security",
    title: "10. Security",
    paragraphs: [
      "We use HTTPS, security headers (including Content Security Policy), input validation, and reCAPTCHA scoring to protect the Site and submitted data.",
      "No method of transmission or storage is completely secure; we work to apply reasonable technical and organisational measures appropriate to a personal portfolio site.",
    ],
  },
  {
    id: "rights",
    title: "11. Your rights",
    paragraphs: [
      "If GDPR applies to you, you may have the right to access, rectify, erase, restrict, or object to processing of your personal data, and to data portability where applicable.",
      "You may also withdraw consent at any time where processing is based on consent, without affecting the lawfulness of earlier processing.",
      "You can lodge a complaint with the Data Protection Commission (DPC) in Ireland: https://www.dataprotection.ie",
      `To exercise your rights, contact ${SITE_EMAIL}. We may need to verify your identity before responding.`,
    ],
  },
  {
    id: "cookies",
    title: "12. Cookies and similar technologies",
    paragraphs: [
      "The Site uses one functional first-party cookie (contact-region). It is not used for advertising or cross-site tracking.",
      "You can block or delete cookies in your browser settings. Blocking this cookie may affect which phone number or CV variant is shown.",
      "The contact form loads Google reCAPTCHA only when needed; reCAPTCHA may set its own cookies or use similar storage as described in Google’s privacy policy.",
    ],
  },
  {
    id: "children",
    title: "13. Children",
    paragraphs: [
      "The Site is intended for professional and business use. It is not directed at children under 16, and we do not knowingly collect their personal data.",
    ],
  },
  {
    id: "changes",
    title: "14. Changes to this policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. The “Last updated” date at the top of this page will change when we do.",
      "Material changes will be reflected on this page. Continued use of the Site after an update means you accept the revised policy.",
    ],
  },
  {
    id: "contact",
    title: "15. Contact",
    paragraphs: [
      `Questions about this Privacy Policy or your personal data: ${SITE_EMAIL}`,
    ],
  },
];
