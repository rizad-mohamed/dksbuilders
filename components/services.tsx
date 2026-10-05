"use client";
import Image from "next/image";
import { useState } from "react";

import { PlusIcon } from "@phosphor-icons/react";
import { services } from "@/lib/content";
import { Reveal } from "./motion";
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
              every discipline.
            </h2>
          </Reveal>
          <p>
            Buildings and civil infrastructure.
            <br />
            Six services, one coordinated team.
          </p>
        </div>
        <div className="services-layout">
          <div className="service-image">
            <div className="service-frame" key={selected.image}>
              <Image
                src={`/assets/${selected.image}-1280.webp`}
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                alt={`Illustrative ${selected.title.toLowerCase()} in Sri Lanka`}
              />
            </div>

            <span className="image-credit">
              Illustrative imagery · not project evidence
            </span>
          </div>
          <div className="service-list">
            {services.map((service, i) => (
              <details
                key={service.title}
                open={i === active}
                onToggle={(event) => {
                  if (event.currentTarget.open) setActive(i);
                }}
              >
                <summary>
                  <span className="number">0{i + 1}</span>
                  <h3>{service.title}</h3>
                  <PlusIcon size={22} weight="light" aria-hidden="true" />
                </summary>
                <p>{service.copy}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
