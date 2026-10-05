import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { Reveal } from "./motion";
import { StructuralStudy } from "./structural-study";
export function Company() {
  return (
    <section
      className="section wrap"
      id="company"
      aria-labelledby="company-title"
    >
      <div className="company-grid">
        <Reveal className="company-copy">
          <div className="eyebrow">
            <span>06 /</span> THE COMPANY
          </div>
          <h2 id="company-title">
            A clear vision.
            <br />A considered build.
          </h2>
          <p>
            Based in Elpitiya, DKS Builders provides turnkey construction across
            Sri Lanka. We bring civil, interior, electrical and mechanical
            expertise together for residential, commercial, industrial and
            public-sector projects.
          </p>
          <div className="disciplines">
            <span>Civil</span>
            <span>Interior</span>
            <span>Electrical</span>
            <span>Mechanical</span>
          </div>
          <a className="text-link" href="#approach">
            Our approach
            <ArrowRightIcon size={17} />
          </a>
        </Reveal>
        <StructuralStudy />
      </div>
      <div className="principles">
        {[
          {
            label: "OUR MISSION",
            title: "Deliver with care.",
            copy: "Provide reliable construction services that meet customer needs and applicable legal requirements.",
          },
          {
            label: "OUR VISION",
            title: "Build beyond today.",
            copy: "Grow our contribution to Sri Lankan construction, with a long-term ambition to reach international markets.",
          },
          {
            label: "OUR VALUES",
            title: "Quality. Innovation. Trust.",
            copy: "Keep workmanship, thoughtful solutions and customer satisfaction at the centre of our work.",
          },
        ].map((item, i) => (
          <Reveal key={item.label} delay={i * 0.08}>
            <article>
              <div className="eyebrow">{item.label}</div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
