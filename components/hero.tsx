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
    <section className="hero" aria-labelledby="hero-title">
      <HeroMedia />
      <div className="hero-shade" />
      <div className="hero-copy">
        <div className="eyebrow">
          <span>01 /</span> BUILDING WITH PURPOSE · SRI LANKA
        </div>
        <h1 id="hero-title">
          Engineering
          <br />
          what comes <em>next.</em>
        </h1>
        <p>
          Making dreams come to life.
          <br />
          From your first idea to built reality.
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
      <div className="hero-note">
        <span>BUILDINGS / INFRASTRUCTURE</span>
        <p>
          Construction expertise.
          <br />
          One connected team.
        </p>
      </div>
      <div className="hero-bottom">
        <a href="#highlights">
          <ArrowDownIcon size={14} /> Scroll to discover
        </a>
        <span>ELPITIYA, SRI LANKA</span>
        <span>Illustrative cinematic imagery</span>
      </div>
    </section>
  );
}
export function ServiceHighlights() {
  return (
    <section
      id="highlights"
      className="wrap sector-strip"
      aria-label="Our key areas of work"
    >
      {[
        {
          Icon: HouseLineIcon,
          title: "Residential",
          copy: "Thoughtful homes for modern living.",
        },
        {
          Icon: BuildingsIcon,
          title: "Commercial",
          copy: "Functional spaces for growing businesses.",
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
          <ArrowRightIcon className="sector-arrow" size={17} />
        </a>
      ))}
    </section>
  );
}
