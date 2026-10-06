"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { observeScroll } from "@/lib/scroll-motion";

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const element = bar.current;
    if (!element) return;
    if (CSS.supports("animation-timeline: scroll()")) return;
    return observeScroll((progress) => {
      element.style.transform = `scaleX(${progress})`;
    });
  }, [pathname]);
  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={bar} className="scroll-progress-fill" />
    </div>
  );
}
