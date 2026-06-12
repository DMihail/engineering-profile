export {
  SITE_URL,
  SITE_AUTHOR,
  SITE_EMAIL,
  SITE_ROLE,
  SITE_ROLE_SEO,
  SITE_LOCATION,
  SITE_HERO_INTRO,
  SITE_HERO_AVAILABILITY,
  SITE_DESCRIPTION,
  SITE_SHORT_DESCRIPTION,
  SITE_EDUCATION_FOCUS,
  CV_FILES,
  SITE_OG,
  mailtoUrl,
} from "@/lib/content/site";

export const SITE_CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";
export const SITE_OG_IMAGE_PATH = "/opengraph-image";
/** Square image for Person schema — defaults to apple-touch icon. Set `/profile.jpg` when a photo is in public/. */
export const SITE_PROFILE_IMAGE_PATH =
  process.env.NEXT_PUBLIC_PROFILE_IMAGE_PATH ?? "/apple-icon";
export const SITE_LAST_MODIFIED = process.env.SITE_LAST_MODIFIED ?? "2026-05-27";
