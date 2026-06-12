import {
  CAREER_EDUCATION,
  CAREER_EXPERIENCE,
} from "@/lib/content/career/data";
import { toPortfolioEducation, toXpEntries } from "@/lib/content/career/adapters";

export const EDUCATION = toPortfolioEducation(CAREER_EDUCATION);
export const XP_ENTRIES = toXpEntries(CAREER_EXPERIENCE);
