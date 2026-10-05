"use client";
import { useEffect } from "react";
export function GlareEnhancer() {
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const cleanups: (() => void)[] = [];
    document.querySelectorAll<HTMLElement>("[data-glare]").forEach((host) => {
      let frame = 0;
      let x = 50,
        y = 50;
      const move = (event: PointerEvent) => {
        if (motion.matches || !fine.matches) return;
        const rect = host.getBoundingClientRect();
        x = ((event.clientX - rect.left) / rect.width) * 100;
        y = ((event.clientY - rect.top) / rect.height) * 100;
        if (!frame)
          frame = requestAnimationFrame(() => {
            host.style.setProperty("--glare-x", `${x}%`);
            host.style.setProperty("--glare-y", `${y}%`);
            frame = 0;
          });
      };
      host.addEventListener("pointermove", move, { passive: true });
      cleanups.push(() => {
        cancelAnimationFrame(frame);
        host.removeEventListener("pointermove", move);
      });
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);
  return null;
}
