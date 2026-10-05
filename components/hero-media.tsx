"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "@phosphor-icons/react";
export function HeroMedia() {
  const video = useRef<HTMLVideoElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const media = video.current;
    if (!media) return;
    let inView = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    function play() {
      if (
        !media ||
        reduced.matches ||
        userPaused.current ||
        !inView ||
        document.hidden
      )
        return;
      if (!media.getAttribute("src"))
        media.src =
          window.innerWidth < 768
            ? "/assets/dks-hero-mobile.mp4"
            : "/assets/dks-hero-desktop.mp4";
      void media.play().catch(() => {
        /* Browser policy may require the visible play control. */
      });
    }
    const observer = new IntersectionObserver(
      (entries) => {
        inView = entries[0].isIntersecting;
        if (inView) play();
        else media.pause();
      },
      { threshold: 0.1 },
    );
    if (host.current) observer.observe(host.current);
    const onVisibility = () => {
      if (document.hidden) media.pause();
      else play();
    };
    const onMotion = () => {
      if (reduced.matches) media.pause();
      else play();
    };
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", onMotion);
    return () => {
      observer.disconnect();
      media.pause();
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", onMotion);
    };
  }, []);
  async function toggle() {
    const media = video.current;
    if (!media) return;
    if (playing) {
      userPaused.current = true;
      media.pause();
      return;
    }
    userPaused.current = false;
    if (!media.getAttribute("src"))
      media.src =
        window.innerWidth < 768
          ? "/assets/dks-hero-mobile.mp4"
          : "/assets/dks-hero-desktop.mp4";
    try {
      await media.play();
    } catch {
      /* Keep the poster and control when playback is blocked. */
    }
  }
  return (
    <>
      <div className="hero-media" ref={host}>
        <Image
          src="/assets/dks-hero-poster-1280.webp"
          alt="Opening frame of the illustrative construction montage"
          fill
          sizes="100vw"
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
          {playing ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
          {playing ? "Pause film" : "Play hero film"}
        </button>
      )}
      {failed && (
        <span className="sr-only" role="status">
          The film is unavailable. The construction poster remains visible.
        </span>
      )}
    </>
  );
}
