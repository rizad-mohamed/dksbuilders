"use client";
import { useEffect, useRef } from "react";

// The real text sets character widths and remains the accessible heading.
export function DecodeText({ text }: { text: string }) {
  const host = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const glyphs = element.querySelectorAll<HTMLElement>(".decode-glyph");
    let frame = 0;
    const finish = () => {
      cancelAnimationFrame(frame);
      glyphs.forEach((glyph, i) => {
        glyph.textContent = text[i];
        delete glyph.dataset.scrambled;
      });
      element.dataset.decoding = "false";
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        if (reduced.matches) return;
        const start = performance.now();
        const alphabet = "0123456789XYZ/+-";
        element.dataset.decoding = "true";
        const tick = (now: number) => {
          if (reduced.matches || now - start >= 650) {
            finish();
            return;
          }
          const cursor =
            Math.floor(((now - start) / 650) * (text.length + 4)) - 4;
          glyphs.forEach((glyph, i) => {
            const scrambled =
              /[a-z]/i.test(text[i]) && i >= cursor && i < cursor + 4;
            glyph.dataset.scrambled = String(scrambled);
            glyph.textContent = scrambled
              ? alphabet[(i + Math.floor((now - start) / 65)) % alphabet.length]
              : text[i];
          });
          frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.7 },
    );
    observer.observe(element);
    const onMotion = () => {
      if (reduced.matches) {
        observer.disconnect();
        finish();
      }
    };
    reduced.addEventListener("change", onMotion);
    return () => {
      observer.disconnect();
      finish();
      reduced.removeEventListener("change", onMotion);
    };
  }, [text]);
  return (
    <span ref={host} className="decode-text" data-decoding="false">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split("").map((character, i) => (
          <span className="decode-character" key={i}>
            <span className="decode-original">{character}</span>
            <span className="decode-glyph">{character}</span>
          </span>
        ))}
      </span>
    </span>
  );
}
