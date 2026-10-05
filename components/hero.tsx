import {
  ArrowRightIcon,
  ArrowDownIcon,
  HouseLineIcon,
  BuildingsIcon,
  BridgeIcon,
} from "@phosphor-icons/react/ssr";
import { HeroMedia } from "./hero-media";
export function Hero() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">
              <span>01 /</span> BUILDING BETTER SPACES
            </div>
            <h1 id="hero-title">
              Built with
              <br />
              purpose.
            </h1>
            <p>
              Construction expertise. Clear communication. Thoughtful execution,
              from first idea to built reality.
            </p>
            <div className="hero-actions">
              <a className="button" href="#projects">
                Explore our work
                <ArrowRightIcon size={18} />
              </a>
              <a className="button outline" href="#contact">
                Discuss a project
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <HeroMedia />
            <div className="drawing-mark" aria-hidden="true">
              <span>A</span>
              <span>CONCEPT ELEVATION</span>
              <span>B</span>
            </div>
            <div className="drawing-vertical" aria-hidden="true" />
            <div className="visual-caption">
              <span>ELEVATION A / CONSTRUCTION STUDY</span>
              <span>Illustrative imagery</span>
            </div>
          </div>
        </div>
        <div className="hero-bottom">
          <div className="wrap hero-bottom-inner">
            <a href="#company">
              <ArrowDownIcon size={14} /> Scroll to discover
            </a>
            <span>ELPITIYA, SRI LANKA · BUILDINGS & INFRASTRUCTURE</span>
          </div>
        </div>
      </section>
      <div className="wrap sector-strip">
        {[
          {
            Icon: HouseLineIcon,
            title: "Residential",
            copy: "Thoughtful spaces for everyday living.",
          },
          {
            Icon: BuildingsIcon,
            title: "Commercial",
            copy: "Buildings shaped around your business.",
          },
          {
            Icon: BridgeIcon,
            title: "Infrastructure",
            copy: "Engineering connections that matter.",
          },
        ].map(({ Icon, title, copy }) => (
          <a className="sector" href="#services" key={title}>
            <Icon size={34} weight="light" />
            <div>
              <p className="sector-title">{title}</p>
              <p>{copy}</p>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
