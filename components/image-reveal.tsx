"use client";
import { useEffect, useRef } from "react";
import { observeScroll } from "@/lib/scroll-motion";

export function ImageReveal({ children }: { children: React.ReactNode }) {
  const image = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = image.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stop: (() => void) | undefined;
    const sync = () => {
      stop?.();
      element.style.removeProperty("opacity");
      if (!reduced.matches) {
        element.style.opacity = "0.18";
        stop = observeScroll(
          (progress) => {
            element.style.opacity = String(0.18 + progress * 0.82);
          },
          { target: element, offset: ["start 95%", "start 45%"] },
          () => element.style.removeProperty("opacity"),
        );
      }
    };
    sync();
    reduced.addEventListener("change", sync);
    return () => {
      stop?.();
      reduced.removeEventListener("change", sync);
      element.style.removeProperty("opacity");
    };
  }, []);
  return (
    <div ref={image} className="career-image-reveal">
      {children}
    </div>
  );
}
