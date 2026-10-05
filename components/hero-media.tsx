"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "@phosphor-icons/react";
export function HeroMedia() {
  const video = useRef<HTMLVideoElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) {
          video.current?.pause();
        }
      },
      { threshold: 0.05 },
    );
    if (host.current) observer.observe(host.current);
    const onVisibility = () => {
      if (document.hidden) video.current?.pause();
    };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => {
      if (reduced.matches) video.current?.pause();
    };
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", onMotion);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", onMotion);
    };
  }, []);
  async function toggle() {
    if (!video.current) return;
    if (playing) {
      video.current.pause();
      return;
    }
    if (!video.current.getAttribute("src")) {
      video.current.src =
        window.innerWidth < 768
          ? "/assets/dks-hero-mobile.mp4"
          : "/assets/dks-hero-desktop.mp4";
    }
    try {
      await video.current.play();
    } catch {
      setFailed(true);
    }
  }
  return (
    <>
      <div className="hero-media" ref={host}>
        <Image
          src="/assets/home-1280.webp"
          alt="Illustrative contemporary tropical house among palms"
          fill
          sizes="(max-width: 767px) 100vw, 60vw"
          preload
          fetchPriority="high"
        />
        <video
          ref={video}
          className={playing ? "is-playing" : ""}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => {
            setFailed(true);
            setPlaying(false);
          }}
        />
      </div>
      {!failed && (
        <button
          className="video-control"
          onClick={toggle}
          aria-pressed={playing}
        >
          {playing ? <PauseIcon size={13} /> : <PlayIcon size={13} />}{" "}
          {playing ? "Pause film" : "Play hero film"}
        </button>
      )}
      {failed && (
        <span className="sr-only" role="status">
          The film is unavailable. The illustrative house image remains visible.
        </span>
      )}
    </>
  );
}
