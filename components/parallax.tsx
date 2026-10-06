"use client";
import { useEffect, useRef } from "react";
import { observeScroll } from "@/lib/scroll-motion";

export function Parallax({
  children,
  className,
  overlay,
}: {
  children: React.ReactNode;
  className?: string;
  overlay?: React.ReactNode;
}) {
  const host = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = host.current;
    const image = media.current;
    if (!element || !image) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stop: (() => void) | undefined;
    const sync = () => {
      stop?.();
      image.style.removeProperty("transform");
      if (!reduced.matches)
        stop = observeScroll(
          (progress) => {
            image.style.transform = `translateY(${(progress - 0.5) * 24}px)`;
          },
          { target: element, offset: ["start end", "end start"] },
        );
    };
    sync();
    reduced.addEventListener("change", sync);
    return () => {
      stop?.();
      image.style.removeProperty("transform");
      reduced.removeEventListener("change", sync);
    };
  }, []);
  return (
    <div ref={host} className={"parallax-media " + (className ?? "")}>
      <div ref={media} className="parallax-inner">
        {children}
      </div>
      {overlay}
    </div>
  );
}
