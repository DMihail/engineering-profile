import { SITE_EMAIL, mailtoUrl } from "@/lib/config";
import type { SocialLink } from "@/lib/types";

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", hint: "github.com/mykhailo-dzhezhelo", icon: "github", href: "https://github.com/DMihail" },
  {
    label: "LinkedIn",
    hint: "linkedin.com/in/mykhailo-dzhezhelo",
    icon: "linkedin",
    href: "https://www.linkedin.com/in/mihail-dzhezhelo-27a41114a/",
  },
  { label: "Email", hint: SITE_EMAIL, icon: "mail", href: mailtoUrl() },
];
