import { cookies } from "next/headers";
import { CONTACT_REGION_COOKIE, type ContactRegion } from "@/lib/contact-region";

export async function getContactRegionFromCookies(): Promise<ContactRegion> {
  const cookieStore = await cookies();
  const value = cookieStore.get(CONTACT_REGION_COOKIE)?.value;
  if (value === "ua" || value === "intl") return value;
  return "intl";
}
