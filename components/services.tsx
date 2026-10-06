"use client";
import Image from "next/image";
import { useState } from "react";

import {
  ArrowUpRightIcon,
  BuildingsIcon,
  RoadHorizonIcon,
  BridgeIcon,
  PipeIcon,
  WavesIcon,
  HouseLineIcon,
} from "@phosphor-icons/react";
import { services } from "@/lib/content";
import { Reveal } from "./motion";
import { DecodeText } from "./decode-text";
const disciplineIcons = {
  building: BuildingsIcon,
  highway: RoadHorizonIcon,
  bridge: BridgeIcon,
  water: PipeIcon,
  irrigation: WavesIcon,
  home: HouseLineIcon,
};
export function Services() {
  const [active, setActive] = useState(0);

  const selected = services[active];
  return (
    <section
      id="services"
      className="section services-section"
      aria-labelledby="services-title"
    >
      <div className="wrap">
        <span id="capabilities" />
        <div className="section-head">
          <Reveal>
            <div className="eyebrow">
              <span>07 /</span> WHAT WE DO
            </div>
            <h2 id="services-title">
              Expertise, across
              <br />
              <DecodeText text="every discipline." />
            </h2>
          </Reveal>
          <p>
            Buildings and civil infrastructure. Six services, one coordinated
            team.
          </p>
        </div>
        <div className="services-layout">
          <div className="service-preview">
            <div className="service-image">
              <div className="service-frame" key={selected.image}>
                <Image
                  src={`/assets/${selected.image}-1280.webp`}
                  fill
                  sizes="(max-width: 767px) 100vw, 40vw"
                  alt={`Illustrative ${selected.title.toLowerCase()} in Sri Lanka`}
                />
              </div>

              <span className="image-credit">
                Illustrative imagery · not project evidence
              </span>
            </div>
            <div
              id="service-description"
              className="service-description"
              aria-live="polite"
              aria-atomic="true"
            >
              <h3>{selected.title}</h3>
              <p>{selected.copy}</p>
              <a
                className="service-enquiry"
                href={
                  "mailto:dksbuilders@gmail.com?subject=" +
                  encodeURIComponent("Enquiry: " + selected.title)
                }
              >
                Discuss this service{" "}
                <ArrowUpRightIcon size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div
            className="discipline-grid"
            role="group"
            aria-label="Construction disciplines"
          >
            {services.map((service, i) => {
              const Icon = disciplineIcons[service.image];
              return (
                <button
                  type="button"
                  className="discipline-button"
                  key={service.title}
                  aria-pressed={i === active}
                  aria-controls="service-description"
                  onClick={() => setActive(i)}
                >
                  <span className="discipline-meta">
                    <span className="discipline-icon" aria-hidden="true">
                      <Icon size={32} weight="light" />
                    </span>
                    <span className="discipline-number">0{i + 1}</span>
                    <ArrowUpRightIcon
                      className="discipline-arrow"
                      size={18}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="discipline-title">{service.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
