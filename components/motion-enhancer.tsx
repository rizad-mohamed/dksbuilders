"use client";
import { useEffect } from "react";
import type { animate } from "motion/mini";
export function MotionEnhancer() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("#main [data-reveal]"),
    );
    const animations = new Map<HTMLElement, ReturnType<typeof animate>>();
    let disposed = false;
    let engine: Promise<typeof import("motion/mini")> | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || !(entry.target instanceof HTMLElement))
            continue;
          const element = entry.target;
          observer.unobserve(element);
          engine ??= import("motion/mini");
          void engine
            .then(({ animate }) => {
              if (disposed || reduced.matches) return;
              animations.set(
                element,
                animate(
                  element,
                  {
                    opacity: [0.65, 1],
                    transform: ["translateY(18px)", "translateY(0px)"],
                  },
                  {
                    duration: 0.65,
                    delay: Number(element.dataset.delay) || 0,
                    ease: [0.2, 0.7, 0.2, 1],
                  },
                ),
              );
            })
            .catch(() => {
              /* Content stays visible if motion cannot load. */
            });
        }
      },
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    const stop = () => {
      animations.forEach((animation, element) => {
        animation.stop();
        element.style.removeProperty("transform");
        element.style.removeProperty("opacity");
      });
    };
    const onMotion = () => {
      if (reduced.matches) {
        observer.disconnect();
        stop();
      }
    };
    reduced.addEventListener("change", onMotion);
    return () => {
      disposed = true;
      observer.disconnect();
      stop();
      reduced.removeEventListener("change", onMotion);
    };
  }, []);
  return null;
}
