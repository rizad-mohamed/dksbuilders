import { EngineeringDrawing } from "./engineering-drawing";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { Parallax } from "./parallax";
import { Reveal } from "./motion";
import { ImageReveal } from "./image-reveal";
export function Careers() {
  return (
    <section
      className="wrap career-banner"
      aria-labelledby="career-title"
      data-glare=""
    >
      <EngineeringDrawing />
      <Reveal className="career-copy">
        <EngineeringDrawing />
        <div className="eyebrow">
          <span>05 /</span> OUR PEOPLE
        </div>
        <h2 id="career-title">
          Build your career
          <br />
          with DKS.
        </h2>
        <p>
          Different skills. A shared purpose.
          <br />
          Join a team that brings ideas into reality.
        </p>
        <Link prefetch={false} className="button" href="/careers">
          View career opportunities
          <ArrowRightIcon size={17} />
        </Link>
      </Reveal>
      <ImageReveal>
        <Parallax className="career-image">
          <Image
            src="/assets/engineering-team-1280.webp"
            fill
            sizes="(max-width: 767px) 100vw, 45vw"
            alt="Illustrative engineers reviewing construction plans"
          />
          <span className="image-credit">
            Illustrative imagery · not DKS staff
          </span>
        </Parallax>
      </ImageReveal>
    </section>
  );
}
