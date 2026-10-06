import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { ListingBrowser } from "@/components/listing-browser";
import { ProjectGallery } from "@/components/project-gallery";
import { projectRecords } from "@/lib/listings";
export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore the DKS Builders project register by sector and location, alongside supplied construction photography.",
  ...(process.env.NEXT_PUBLIC_SITE_URL
    ? { alternates: { canonical: "/projects" } }
    : {}),
};
export default function ProjectsPage() {
  return (
    <main id="main" className="wrap directory-page">
      <PageIntro
        label="PROJECT PORTFOLIO"
        title="Our work, in focus."
        copy="Buildings for enterprise, education and public service. Explore selected project records and the details that shape our work."
      />
      <ListingBrowser records={projectRecords} kind="projects" />
      <section className="archive-section" aria-labelledby="archive-title">
        <div className="eyebrow">FROM THE ARCHIVE</div>
        <h2 id="archive-title">From structure to detail.</h2>
        <p className="archive-note">
          Supplied project photography. Images are not attributed to individual
          entries in the project register.
        </p>
        <ProjectGallery />
      </section>
    </main>
  );
}
