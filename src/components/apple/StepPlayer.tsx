"use client";

import { useEffect, useState } from "react";

// Auto-playing, tappable step-through for "How it's performed".
export default function StepPlayer({ title, steps }: { title: string; steps: string[] }) {
  const [active, setActive] = useState(0);
  const playing = true; // always playing; tapping a step jumps there and carries on
  useEffect(() => {
    const id = window.setTimeout(() => setActive((a) => (a + 1) % steps.length), 3200);
    return () => window.clearTimeout(id);
  }, [active, steps.length]);

  return (
    <div className="rounded-[1.75rem] bg-[var(--night)] text-white p-6 sm:p-8 overflow-hidden relative">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(122,79,207,0.55),transparent)]" aria-hidden="true" />
      <div className="relative flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 className="!text-2xl !leading-tight text-white">{title}</h2>
      </div>

      {/* big current step */}
      <div className="relative min-h-[7.5rem]" aria-live="polite">
        <div key={active} className="step-in flex gap-4 items-start">
          <span className="text-6xl font-semibold tracking-[-0.04em] text-[var(--lilac)] leading-none">{String(active + 1).padStart(2, "0")}</span>
          <p className="text-xl sm:text-2xl leading-snug font-medium pt-1">{steps[active]}</p>
        </div>
      </div>

      {/* step rail */}
      <ol className="relative mt-6 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
        {steps.map((s, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Step ${i + 1}: ${s}`}
              aria-current={i === active ? "step" : undefined}
              className="block w-full py-2"
            >
              <span className="block h-1.5 rounded-full bg-white/15 overflow-hidden">
                <span
                  key={`${i}-${active}-${playing}`}
                  className={`block h-full bg-[var(--lilac)] ${i < active ? "w-full" : i === active ? (playing ? "step-progress" : "w-full") : "w-0"}`}
                  style={i === active && playing ? { animationDuration: "3.2s" } : undefined}
                />
              </span>
            </button>
          </li>
        ))}
      </ol>
      <p className="relative mt-2 text-sm text-white/50">Step {active + 1} of {steps.length} · tap the bars to jump</p>
    </div>
  );
}
