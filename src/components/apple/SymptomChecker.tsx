"use client";

import { useState } from "react";

// "Do these sound like you?" — tap-to-tick symptom list with a live summary.
export default function SymptomChecker({ title, symptoms, conditionName }: { title: string; symptoms: string[]; conditionName: string }) {
  const [ticked, setTicked] = useState<number[]>([]);
  const toggle = (i: number) => setTicked((t) => (t.includes(i) ? t.filter((x) => x !== i) : [...t, i]));
  const n = ticked.length;
  return (
    <div className="rounded-[1.75rem] bg-[var(--mist)] p-6 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
        <div>
          <h2 className="!text-2xl !leading-tight text-[var(--ink)]">{title}</h2>
          <p className="mt-1 text-[15px] text-[var(--grey)]">Tap the ones that sound like you.</p>
        </div>
        <span key={n} className="pop rounded-full bg-white px-3 py-1 text-sm font-semibold text-[var(--purple)] ring-1 ring-[var(--hairline)]">
          {n} of {symptoms.length}
        </span>
      </div>
      <ul className="grid sm:grid-cols-2 gap-2.5">
        {symptoms.map((s, i) => {
          const on = ticked.includes(i);
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-pressed={on}
                className={`w-full text-left flex items-start gap-3 rounded-2xl p-4 transition-all duration-300 ${on ? "bg-white ring-2 ring-[var(--purple)] shadow-[var(--shadow-md)]" : "bg-white/70 ring-1 ring-[var(--hairline)] hover:bg-white"}`}
              >
                <span className={`mt-0.5 h-5 w-5 shrink-0 rounded-full flex items-center justify-center ${on ? "bg-[var(--purple)] text-white pop" : "ring-1 ring-[var(--color-surface-300)]"}`}>
                  {on && <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3"><path d="m5 12.5 4.5 4.5L19 7" /></svg>}
                </span>
                <span className="text-[15px] text-[var(--ink)]">{s}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className={`grid transition-all duration-500 ${n >= 2 ? "grid-rows-[1fr] opacity-100 mt-5" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <div className="rounded-2xl bg-white p-5 ring-1 ring-[var(--hairline)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-[15px] text-[var(--ink)]">
              Several of these match {conditionName}. Only an examination can confirm it. Dr. Shah can find the cause and explain your options.
            </p>
            <a href="/#book" className="glass-btn glass-purple h-11 px-6 text-[15px] shrink-0">Book a consultation</a>
          </div>
        </div>
      </div>
    </div>
  );
}
