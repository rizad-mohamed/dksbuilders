import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { Reveal } from "./motion";
import { ProjectCarousel } from "./project-carousel";
export function Projects() {
  return (
    <section
      className="section wrap"
      id="projects"
      aria-labelledby="projects-title"
    >
      <div className="section-head">
        <Reveal>
          <div className="eyebrow">
            <span>04 /</span> SELECTED WORK
          </div>
          <h2 id="projects-title">Completed projects.</h2>
        </Reveal>
        <Link prefetch={false} href="/projects" className="text-link">
          Project portfolio
          <ArrowRightIcon size={17} />
        </Link>
      </div>
      <ProjectCarousel />
      <p className="archive-note">
        Supplied project photography. Images are not attributed to individual
        entries in the project register.
      </p>
      <div className="register">
        {[
          {
            type: "INSTITUTIONAL / MORATUWA",
            name: "Faculty of Engineering Multipurpose Building",
            copy: "Completion of balance work involving prefabricated steel, University of Moratuwa.",
          },
          {
            type: "COMMERCIAL / WARIYAPOLA",
            name: "Bank of Ceylon Branch Building",
            copy: "Construction of a new branch building at Wariyapola.",
          },
          {
            type: "GOVERNMENT / HATTON",
            name: "Labour Office",
            copy: "Construction of the proposed Labour Office at Hatton.",
          },
        ].map((item) => (
          <article key={item.name}>
            <div className="eyebrow">{item.type}</div>
            <h3>{item.name}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
