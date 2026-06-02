export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
}

export const TESTIMONIALS_SECTION = {
  n: "07",
  label: "Endorsements",
  heading: "What collaborators say",
} as const;

/** Add real LinkedIn recommendations or client quotes here. Section hidden when empty. */
export const TESTIMONIALS: Testimonial[] = [];
