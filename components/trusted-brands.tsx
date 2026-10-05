import Image from "next/image";
import { partners } from "@/lib/content";
import { Reveal } from "./motion";
export function TrustedBrands() {
  return (
    <section
      className="trusted-section section wrap"
      aria-labelledby="trusted-title"
    >
      <div className="section-head technical-rule">
        <Reveal>
          <div className="eyebrow">
            <span>03 /</span> IN GOOD COMPANY
          </div>
          <h2 id="trusted-title">Trusted to build.</h2>
        </Reveal>
        <p>
          Across public institutions
          <br />
          and private enterprise.
        </p>
      </div>
      <div className="partner-grid">
        {partners.map((partner, i) => (
          <div className="partner-mark" key={partner}>
            <Image
              src={`/assets/trusted-brand-${i + 1}.webp`}
              width={106}
              height={79}
              alt={partner}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
