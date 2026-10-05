"use client";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { PlusIcon } from "@phosphor-icons/react";
import { services } from "@/lib/content";
import { Reveal } from "./motion";
export function Services() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
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
              <span>03 /</span> WHAT WE DO
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
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={selected.image}
                style={{ position: "absolute", inset: 0 }}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: reduced ? 1 : 0 }}
                transition={{ duration: reduced ? 0 : 0.18 }}
              >
                <Image
                  src={`/assets/${selected.image}-1280.webp`}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  alt={`Illustrative ${selected.title.toLowerCase()} in Sri Lanka`}
                />
              </motion.div>
            </AnimatePresence>
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
