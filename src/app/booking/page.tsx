import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import BookingClient from "./booking-client";

export const metadata: Metadata = generatePageMetadata({
  title: "Book a Free Consultation",
  description:
    "Book a free consultation with Nova Webs. Tell us about your project and let's discuss how we can transform your digital presence.",
  path: "/booking",
  keywords: [
    "book consultation",
    "free web design consultation",
    "Lahore web agency booking",
  ],
});

export default function BookingPage() {
  return <BookingClient />;
}
