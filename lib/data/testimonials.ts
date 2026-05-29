export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
}

/** Add real LinkedIn recommendations or client quotes here. Section hidden when empty. */
export const TESTIMONIALS: Testimonial[] = [];
