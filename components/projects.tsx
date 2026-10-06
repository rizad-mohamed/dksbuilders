import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { Reveal } from "./motion";
import { ProjectGallery } from "./project-gallery";
import { DecodeText } from "./decode-text";
import { projectRecords } from "@/lib/listings";
export function Projects() {
  return (
    <section
      className="section wrap"
      id="projects"
      aria-labelledby="projects-title"
    >
      <div className="section-head technical-rule">
        <Reveal>
          <div className="eyebrow">
            <span>04 /</span> SELECTED WORK
          </div>
          <h2 id="projects-title">
            <DecodeText text="Places that matter." />
          </h2>
        </Reveal>
        <Link
          prefetch={false}
          href="/projects"
          className="button portfolio-button"
        >
          Project portfolio
          <ArrowRightIcon size={17} />
        </Link>
      </div>
      <p className="project-intro">
        From structure to finishing detail. A selection of DKS Builders’ work.
      </p>
      <ProjectGallery />
      <p className="archive-note">
        Supplied project photography. Images are not attributed to individual
        entries in the project register.
      </p>
      <div className="register">
        {projectRecords.map((item) => (
          <article key={item.title}>
            <div className="eyebrow">
              {item.category} / {item.area}
            </div>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
