"use client";
import { useEffect, useRef } from "react";
import { observeScroll } from "@/lib/scroll-motion";

export function ProcessFlow({ children }: { children: React.ReactNode }) {
  const host = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLSpanElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const list = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const element = host.current;
    const track = rail.current;
    const line = fill.current;
    const steps = list.current;
    if (!element || !track || !line || !steps) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const rows = Array.from(steps.querySelectorAll<HTMLElement>("li"));
    let positions: number[] = [];
    let progress = 0;
    let stop: (() => void) | undefined;
    const paint = () => {
      line.style.transform = `scaleY(${progress})`;
      rows.forEach((row, i) => {
        row.dataset.complete = String(progress > 0 && progress >= positions[i]);
      });
    };
    const measure = () => {
      const box = element.getBoundingClientRect();
      const centers = rows.map((row) => {
        const number = row
          .querySelector(".process-number")!
          .getBoundingClientRect();
        return number.top + number.height / 2 - box.top;
      });
      const distance = centers.at(-1)! - centers[0];
      track.style.top = `${centers[0]}px`;
      track.style.height = `${distance}px`;
      positions = centers.map((center) => (center - centers[0]) / distance);
      paint();
    };
    const sync = () => {
      stop?.();
      if (reduced.matches) {
        progress = 1;
        paint();
      } else
        stop = observeScroll(
          (value) => {
            progress = value;
            paint();
          },
          { target: element, offset: ["start 75%", "end 60%"] },
        );
    };
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(element);
    sync();
    reduced.addEventListener("change", sync);
    return () => {
      stop?.();
      resize.disconnect();
      reduced.removeEventListener("change", sync);
    };
  }, []);
  return (
    <div ref={host} className="process-flow">
      <span ref={rail} className="process-rail" aria-hidden="true">
        <span ref={fill} className="process-rail-fill" />
      </span>
      <ol ref={list} className="process-list">
        {children}
      </ol>
    </div>
  );
}
