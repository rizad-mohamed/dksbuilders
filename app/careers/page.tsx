import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";
export const metadata: Metadata = {
  title: "Careers",
  description:
    "Career opportunities at DKS Builders. Our careers page is coming soon.",
  ...(process.env.NEXT_PUBLIC_SITE_URL
    ? { alternates: { canonical: "/careers" } }
    : {}),
};
export default function CareersPage() {
  return (
    <ComingSoon
      title="Build your next chapter."
      copy="Our careers page is coming soon. For information about current opportunities in civil, interior, electrical and mechanical disciplines, email our team."
    />
  );
}
