import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/page-intro";
import { ListingBrowser } from "@/components/listing-browser";
import { careerInterests } from "@/lib/listings";
export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore engineering disciplines at DKS Builders and send a career expression of interest to our team.",
  ...(process.env.NEXT_PUBLIC_SITE_URL
    ? { alternates: { canonical: "/careers" } }
    : {}),
};
export default function CareersPage() {
  return (
    <main id="main" className="wrap directory-page">
      <div className="careers-page-hero">
        <PageIntro
          label="CAREERS"
          title="Build your next chapter."
          copy="Different skills. A shared purpose. Introduce yourself to a team that brings civil, interior, electrical and mechanical expertise together."
        />
        <figure className="careers-page-photo">
          <Image
            src="/assets/engineering-team-1280.webp"
            fill
            sizes="(max-width: 900px) 100vw, 40vw"
            alt="Illustrative engineers reviewing construction plans"
          />
          <figcaption className="image-credit">
            Illustrative imagery · not DKS staff
          </figcaption>
        </figure>
      </div>
      <aside className="career-notice" aria-label="Application information">
        <h2>Start a conversation.</h2>
        <p>
          These are expressions of interest, rather than advertised vacancies.
          Email your CV, discipline, preferred location and availability to{" "}
          <a href="mailto:dksbuilders@gmail.com">dksbuilders@gmail.com</a>. Our
          team can advise on current opportunities.
        </p>
      </aside>
      <ListingBrowser records={careerInterests} kind="careers" />
    </main>
  );
}
