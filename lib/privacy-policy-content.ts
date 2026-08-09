import { SITE_AUTHOR, SITE_EMAIL, SITE_URL } from "@/lib/config";

export const PRIVACY_POLICY_LAST_UPDATED = "9 August 2026";

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
      "This Privacy Policy applies to your use of the Site, including the contact form and related owner notifications.",
      "It does not apply to third-party websites or services that you reach through outbound links on the Site (for example GitHub, LinkedIn, a public Telegram profile, or Calendly). Those services have their own privacy policies. Telegram is also used as a notification channel for new contact messages — that use is described below.",
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
          "If you send a message through the contact form, we collect your name, email address, optional company name, and message content. We also record that you confirmed you have read this Privacy Policy (timestamped acknowledgement).",
      },
      {
        term: "Preference cookie",
        detail:
          "When you visit the homepage, we set a first-party cookie named contact-region with a value of ua or intl so the Site can show the appropriate phone number and CV download. It is based on your approximate country (from hosting headers) and expires after 30 days. Resume language/content variants are chosen only via an explicit URL query (?variant=ua), not by this cookie.",
      },
      {
        term: "Technical and security data",
        detail:
          "Our hosting provider (Vercel) and security tools may process IP address, browser type, request timestamps, and similar server log data when you load pages or submit the contact form (including for rate limiting).",
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
      "The contact-region cookie is set on homepage responses using country information supplied by the hosting platform (for example x-vercel-ip-country). On the client, timezone and browser language may be used only as a fallback to choose contact details before or without a cookie.",
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
      "To notify the site owner of new messages through a private inbox application (Firebase Cloud Messaging), including a short preview of the enquiry.",
      "To notify the site owner of new messages via Telegram Bot API (name, email, optional company, and message content).",
      "To reply to your enquiry by email when the site owner responds (SMTP email delivery).",
      "To protect the Site and contact form against spam and abuse (Google reCAPTCHA v3 and rate limiting).",
      "To remember your regional contact preference (contact-region cookie).",
      "To operate, secure, and maintain the Site (hosting logs and error diagnostics).",
    ],
  },
  {
    id: "legal-basis",
    title: "6. Legal basis (GDPR)",
    paragraphs: [
      "Where GDPR applies, we rely on the following legal bases:",
      "The contact-form checkbox is an acknowledgement that you have read this policy. It is not the GDPR legal basis for processing your enquiry — that processing relies on the bases below.",
    ],
    list: [
      {
        term: "Legitimate interests",
        detail:
          "Operating a professional portfolio, responding to business enquiries, securing the Site (including spam protection), notifying the owner of new messages, and remembering a functional regional preference. We balance these interests against your rights and keep processing proportionate.",
      },
      {
        term: "Steps at your request before a contract",
        detail: "Processing contact-form data when you ask about work, contracts, or collaboration.",
      },
    ],
  },
  {
    id: "processors",
    title: "7. Service providers and recipients",
    paragraphs: [
      "We use trusted providers to run the Site. They process data on our instructions or as independent services where noted:",
    ],
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
        term: "Telegram Bot API",
        detail:
          "Delivery of new-contact notifications to the site owner. Message content may include your name, email address, optional company name, and the message you submitted.",
      },
      {
        term: "Email delivery (SMTP)",
        detail:
          "When the site owner replies to your enquiry, your email address and the reply content are sent through a configured SMTP provider so the message can reach your inbox.",
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
      "Some providers listed above may process data outside the European Economic Area (EEA), including in the United States or other countries where those services operate.",
      "Where required, we rely on appropriate safeguards such as the EU Standard Contractual Clauses or equivalent mechanisms offered by those providers.",
    ],
  },
  {
    id: "retention",
    title: "9. How long we keep data",
    paragraphs: [
      "Contact-form messages in Firestore are kept for as long as needed to handle your enquiry and maintain a reasonable business record, unless you ask us to delete them sooner.",
      "Owner notification copies delivered through Firebase Cloud Messaging or Telegram are retained according to those services’ practices and the owner’s device or chat history until deleted.",
      "Email replies and related SMTP logs are retained according to the mail provider’s practices and ordinary mailbox retention.",
      "The contact-region cookie expires automatically after 30 days.",
      "Server logs are retained according to our hosting provider’s default periods and operational needs.",
      "reCAPTCHA-related data is handled according to Google’s retention practices.",
    ],
  },
  {
    id: "security",
    title: "10. Security",
    paragraphs: [
      "We use HTTPS, security headers (including Content Security Policy), input validation, rate limiting, and reCAPTCHA scoring to protect the Site and submitted data.",
      "No method of transmission or storage is completely secure; we work to apply reasonable technical and organisational measures appropriate to a personal portfolio site.",
    ],
  },
  {
    id: "rights",
    title: "11. Your rights",
    paragraphs: [
      "If GDPR applies to you, you may have the right to access, rectify, erase, restrict, or object to processing of your personal data, and to data portability where applicable.",
      "You can lodge a complaint with the Data Protection Commission (DPC) in Ireland: https://www.dataprotection.ie",
      `To exercise your rights, contact ${SITE_EMAIL}. We may need to verify your identity before responding.`,
    ],
  },
  {
    id: "cookies",
    title: "12. Cookies and similar technologies",
    paragraphs: [
      "The Site uses one functional first-party cookie (contact-region), set on homepage responses. It is not used for advertising or cross-site tracking, and it does not choose the resume variant.",
      "You can block or delete cookies in your browser settings. Blocking this cookie may affect which phone number or CV download is shown on the contact section.",
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
      `If you encounter an accessibility barrier on the Site, please email ${SITE_EMAIL} with the subject “Accessibility feedback”.`,
    ],
  },
];
