import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { SITE_EMAIL, mailtoUrl } from "@/lib/config";
import type { SocialLink } from "@/lib/types";

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", hint: "github.com/mykhailo-dzhezhelo", icon: GithubIcon, href: "https://github.com/DMihail" },
  {
    label: "LinkedIn",
    hint: "linkedin.com/in/mykhailo-dzhezhelo",
    icon: LinkedinIcon,
    href: "https://www.linkedin.com/in/mihail-dzhezhelo-27a41114a/",
  },
  { label: "Email", hint: SITE_EMAIL, icon: Mail, href: mailtoUrl() },
];
