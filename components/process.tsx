import Image from "next/image";
import { Reveal } from "./motion";
import { Parallax } from "./parallax";
import { ProcessFlow } from "./process-flow";
import { DecodeText } from "./decode-text";
export function Process() {
  return (
    <>
      <section
        id="approach"
        className="section process-section"
        aria-labelledby="process-title"
      >
        <div className="wrap">
          <div className="process-grid">
            <Reveal className="process-intro">
              <div className="eyebrow">
                <span>07 /</span> OUR APPROACH
              </div>
              <h2 id="process-title">
                <DecodeText text="Thought through." />
                <br />
                Built together.
              </h2>
              <p>
                A clear path from your first conversation
                <br />
                to the work on site.
              </p>
              <Parallax className="process-photo">
                <Image
                  src="/assets/craft-detail-1280.webp"
                  fill
                  sizes="(max-width: 767px) 100vw, 45vw"
                  alt="Illustrative reinforcement and concrete formwork detail"
                />
                <span className="image-credit">
                  Illustrative construction detail
                </span>
              </Parallax>
            </Reveal>
            <ProcessFlow>
              {[
                {
                  title: "Understand your vision.",
                  copy: "Discuss your requirements, site and priorities with our team.",
                },
                {
                  title: "Make the plan clear.",
                  copy: "Develop 2D and 3D plans to communicate the proposed work.",
                },
                {
                  title: "Define the scope.",
                  copy: "Prepare a detailed estimate so you can assess construction requirements.",
                },
                {
                  title: "Bring it into reality.",
                  copy: "Move from planning into construction with a coordinated team.",
                },
              ].map((item, i) => (
                <li key={item.title}>
                  <span className="process-number">0{i + 1}</span>
                  <Reveal delay={i * 0.05}>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </Reveal>
                </li>
              ))}
            </ProcessFlow>
          </div>
        </div>
      </section>
    </>
  );
}
