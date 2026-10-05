"use client";
/* eslint-disable jsx-a11y/no-noninteractive-tabindex, jsx-a11y/no-noninteractive-element-interactions -- The native horizontal scroll region intentionally receives focus and handles arrow keys for keyboard users. */
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { Parallax } from "./parallax";
const photos = [
  {
    src: "04",
    title: "Spaces for everyday life.",
    alt: "DKS archive: finished two-storey building beside a lawn",
  },
  {
    src: "05",
    title: "Built for the community.",
    alt: "DKS archive: Panduwasnuwara bus stand facade",
  },
  {
    src: "06",
    title: "Details make the difference.",
    alt: "DKS archive: poolside terrace beneath a timber pergola",
  },
];
export function ProjectCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const host = track.current;
    if (!host) return;
    const ratios = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          ratios.set(
            entry.target,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          ),
        );
        const best = [...ratios.entries()].sort((a, b) => b[1] - a[1])[0];
        if (best && best[1] > 0)
          setIndex(Number((best[0] as HTMLElement).dataset.index));
      },
      { root: host, threshold: [0.55, 0.8, 0.95] },
    );
    host.querySelectorAll("article").forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  function go(next: number) {
    const host = track.current;
    const slide = host?.children[next] as HTMLElement | undefined;
    if (host && slide)
      host.scrollTo({
        left:
          host.scrollLeft +
          slide.getBoundingClientRect().left -
          host.getBoundingClientRect().left,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  }
  return (
    <div
      className="carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="DKS project photography"
    >
      {/* A native scroll region needs keyboard focus to support arrow navigation. */}
      <div
        role="group"
        className="carousel-track"
        ref={track}
        tabIndex={0}
        aria-label="Project slides. Use arrow keys or swipe to explore."
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowRight") {
            event.preventDefault();
            go(Math.min(index + 1, photos.length - 1));
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            go(Math.max(index - 1, 0));
          }
        }}
      >
        {photos.map((photo, i) => (
          <article
            className="project-plate"
            key={photo.src}
            data-index={i}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${photos.length}`}
            data-glare=""
          >
            <figure>
              <Parallax className="project-photo">
                <Image
                  src={`/assets/dks-project-${photo.src}.webp`}
                  fill
                  sizes="(max-width: 767px) 85vw, 48vw"
                  alt={photo.alt}
                />
                <span className="project-index">0{i + 1}</span>
              </Parallax>
              <figcaption className="project-caption">
                <h3>{photo.title}</h3>
                <span>DKS / ARCHIVE</span>
              </figcaption>
            </figure>
          </article>
        ))}
      </div>
      <div className="carousel-footer">
        <p>
          DKS project archive{" "}
          <span aria-live="polite">
            / {String(index + 1).padStart(2, "0")} of{" "}
            {String(photos.length).padStart(2, "0")}
          </span>
        </p>
        <div className="carousel-controls">
          <button
            onClick={() => go(index - 1)}
            disabled={index === 0}
            aria-label="Previous project"
          >
            <ArrowLeftIcon size={20} />
          </button>
          <button
            onClick={() => go(index + 1)}
            disabled={index === photos.length - 1}
            aria-label="Next project"
          >
            <ArrowRightIcon size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
