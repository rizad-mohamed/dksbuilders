"use client";
import { useEffect, useRef, useState } from "react";
import type { StudyController } from "@/lib/structural-scene";
const phases = ["Plan", "Frame", "Enclosure"];
export function StructuralStudy() {
  const viewport = useRef<HTMLDivElement>(null);
  const controller = useRef<StudyController | null>(null);
  const phaseRef = useRef(1);
  const [phase, setPhase] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [running, setRunning] = useState(true);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const host = viewport.current;
    if (!host) return;
    let disposed = false;
    let starting = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const observer = new IntersectionObserver(
      async (entries) => {
        const visible = entries[0].isIntersecting;
        controller.current?.setVisible(visible);
        if (!visible || starting || controller.current) return;
        if (!enabled && (reduced.matches || connection?.saveData)) return;
        starting = true;
        try {
          const { createStudy } = await import("@/lib/structural-scene");
          if (disposed) return;
          const scene = createStudy(host);
          controller.current = scene;
          scene.setPhase(phaseRef.current);
          scene.setRunning(!reduced.matches);
          setRunning(!reduced.matches);
          setLoaded(true);
        } catch {
          if (!disposed) setFailed(true);
        }
      },
      { rootMargin: "80px" },
    );
    const onMotion = () => {
      if (reduced.matches) {
        controller.current?.setRunning(false);
        setRunning(false);
      }
    };
    reduced.addEventListener("change", onMotion);
    observer.observe(host);
    return () => {
      disposed = true;
      observer.disconnect();
      reduced.removeEventListener("change", onMotion);
      controller.current?.dispose();
      controller.current = null;
    };
  }, [enabled]);
  function changePhase(next: number) {
    phaseRef.current = next;
    setPhase(next);
    controller.current?.setPhase(next);
  }
  return (
    <div className="study">
      <div className="study-header">
        <span>FROM PLAN TO STRUCTURE</span>
        <span>3D / CONCEPT STUDY</span>
      </div>
      <div className="study-viewport" ref={viewport} aria-hidden={loaded}>
        {!loaded && (
          <div className="study-fallback">
            <div>
              {failed
                ? "Interactive model unavailable."
                : "Plan. Frame. Enclosure."}
              <br />A three-stage structural study.
            </div>
            {!failed && (
              <button
                className="button outline study-load"
                onClick={() => setEnabled(true)}
              >
                Explore in 3D
              </button>
            )}
          </div>
        )}
      </div>
      <div className="study-actions">
        <div role="group" aria-label="Construction stage">
          {phases.map((name, i) => (
            <button
              key={name}
              aria-pressed={phase === i}
              onClick={() => changePhase(i)}
            >
              {name}
            </button>
          ))}
        </div>
        {loaded && (
          <button
            onClick={() => {
              controller.current?.setRunning(!running);
              setRunning(!running);
            }}
          >
            {running ? "Pause rotation" : "Resume rotation"}
          </button>
        )}
      </div>
      <div className="study-footer">
        <span>Illustrative model · not a DKS project</span>
        <span aria-live="polite">{phases[phase]}</span>
      </div>
    </div>
  );
}
