import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";
export const metadata: Metadata = {
  title: "Projects",
  description: "The DKS Builders project portfolio is coming soon.",
  ...(process.env.NEXT_PUBLIC_SITE_URL
    ? { alternates: { canonical: "/projects" } }
    : {}),
};
export default function ProjectsPage() {
  return (
    <ComingSoon
      title="Our work, in focus."
      copy="Our detailed project portfolio is coming soon. Explore selected work on the homepage, or email our team to discuss your construction requirements."
    />
  );
}
