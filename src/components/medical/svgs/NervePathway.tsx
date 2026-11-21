"use client";

import { useEffect, useState } from "react";

// "How a slipped disc causes leg pain" — four plain-language steps, each with
// its own clear illustration. Medical terms are kept as small secondary labels.

const BONE = "#f3eefc";
const BONE_LINE = "#a892dc";
const DISC = "#c4aef0";
const NERVE = "#f2b630";
const NERVE_LINE = "#c98d10";
const PAIN = "#d9365a";

function StepDisc() {
  return (
    <svg viewBox="0 0 200 150" className="w-full h-auto" aria-hidden="true">
      {/* spinal cord running down behind the vertebrae */}
      <rect x="128" y="0" width="16" height="150" rx="8" fill="#fde9b8" stroke={NERVE_LINE} strokeWidth="1" />
      {/* vertebral bodies */}
      <rect x="40" y="14" width="78" height="40" rx="10" fill={BONE} stroke={BONE_LINE} strokeWidth="1.5" />
      <rect x="40" y="96" width="78" height="40" rx="10" fill={BONE} stroke={BONE_LINE} strokeWidth="1.5" />
      {/* disc with bulge pushing backwards into the nerve */}
      <path className="anim-bulge" d="M42 60 H112 Q128 62 132 75 Q128 88 112 90 H42 Q36 75 42 60 Z" fill={DISC} stroke="#8a6fd0" strokeWidth="1.2" />
      {/* nerve root leaving the cord, being pressed */}
      <path d="M136 70 Q150 78 160 96 Q170 118 186 140" fill="none" stroke={NERVE} strokeWidth="7" strokeLinecap="round" />
      <path d="M136 70 Q150 78 160 96 Q170 118 186 140" fill="none" stroke={NERVE_LINE} strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      {/* pressure point */}
      <circle className="anim-blink" cx="134" cy="75" r="9" fill="none" stroke={PAIN} strokeWidth="1.6" strokeDasharray="3 2" />
      <text x="56" y="38" fontSize="10" fill="#55516a" fontWeight="600">Bone</text>
      <text x="56" y="79" fontSize="10" fill="#3d1d78" fontWeight="600">Disc</text>
      <text x="150" y="60" fontSize="10" fill="#8a5a00" fontWeight="600">Nerve</text>
    </svg>
  );
}

function StepInflamed() {
  return (
    <svg viewBox="0 0 200 150" className="w-full h-auto" aria-hidden="true">
      <defs>
        <radialGradient id="np-swell">
          <stop offset="0" stopColor={PAIN} stopOpacity="0.45" />
          <stop offset="1" stopColor={PAIN} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse className="anim-throb" cx="100" cy="75" rx="70" ry="42" fill="url(#np-swell)" />
      <path d="M10 95 Q60 60 100 75 Q140 90 190 55" fill="none" stroke={NERVE} strokeWidth="14" strokeLinecap="round" />
      <path d="M10 95 Q60 60 100 75 Q140 90 190 55" fill="none" stroke="#e0661f" strokeWidth="14" strokeLinecap="round" opacity="0.35" />
      {/* inflammatory chemicals */}
      {[[70, 45], [88, 38], [118, 46], [132, 104], [76, 108], [104, 112], [146, 62], [56, 74]].map(([x, y], i) => (
        <circle key={i} className="anim-float" style={{ animationDelay: `${i * -0.4}s` }} cx={x} cy={y} r={i % 2 ? 3 : 4} fill={PAIN} opacity="0.75" />
      ))}
      <text x="100" y="140" fontSize="10" textAnchor="middle" fill="#9b1c3c" fontWeight="600">Swelling around the nerve</text>
    </svg>
  );
}

function StepSignals() {
  return (
    <svg viewBox="0 0 200 150" className="w-full h-auto" aria-hidden="true">
      <path d="M10 100 H190" stroke={NERVE} strokeWidth="12" strokeLinecap="round" />
      <path d="M10 100 H190" stroke={NERVE_LINE} strokeWidth="1" opacity="0.5" />
      {/* healthy quiet signal vs. abnormal bursts */}
      <path d="M12 52 H50 l5 -10 l5 10 H92 l4 -26 l4 34 l4 -30 l4 30 l4 -38 l4 40 l4 -28 l4 28 l4 -34 l4 34 H188" fill="none" stroke={PAIN} strokeWidth="2" strokeLinejoin="round" className="anim-draw" />
      {/* sparks on the nerve */}
      {[60, 105, 150].map((x) => (
        <path key={x} className="anim-blink" style={{ animationDelay: `${x / 100}s` }} d={`M${x} 88 l6 8 l-5 2 l7 10`} fill="none" stroke="#7a4fcf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      ))}
      <text x="12" y="28" fontSize="10" fill="#55516a" fontWeight="600">Pain signals</text>
      <text x="100" y="135" fontSize="10" textAnchor="middle" fill="#8a5a00" fontWeight="600">Irritated nerve fires on its own</text>
    </svg>
  );
}

function StepLeg() {
  return (
    <svg viewBox="0 0 200 150" className="w-full h-auto" aria-hidden="true">
      {/* side view: lower back, buttock and leg */}
      <path
        d="M70 4 Q60 30 64 50 Q58 62 66 76 Q74 96 78 112 Q82 128 80 138 L104 142 Q110 140 108 136 L96 132 Q96 118 92 104 Q90 86 94 70 Q100 50 96 30 L98 4 Z"
        fill="#efe9fb"
        stroke={BONE_LINE}
        strokeWidth="1.3"
      />
      {/* path of pain from lower back to the foot */}
      <path d="M86 32 Q76 52 74 72 Q78 96 86 116 Q90 128 96 136" fill="none" stroke={PAIN} strokeWidth="2.4" strokeDasharray="4 3" strokeLinecap="round" className="anim-flow" />
      <circle className="anim-blink" cx="86" cy="30" r="5" fill={PAIN} />
      <path d="M92 132 l5 5 l-7 1" fill="none" stroke={PAIN} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="112" y="34" fontSize="10" fill="#3d1d78" fontWeight="600">Starts in</text>
      <text x="112" y="46" fontSize="10" fill="#3d1d78" fontWeight="600">the lower back</text>
      <text x="112" y="104" fontSize="10" fill="#9b1c3c" fontWeight="600">Felt down</text>
      <text x="112" y="116" fontSize="10" fill="#9b1c3c" fontWeight="600">the leg</text>
    </svg>
  );
}

const steps = [
  { title: "A disc bulges", text: "The soft cushion between two bones pushes out and presses on a nerve.", term: "Disc herniation", Art: StepDisc },
  { title: "The nerve gets inflamed", text: "Chemicals from the disc irritate the nerve and make it swell.", term: "Chemical radiculitis", Art: StepInflamed },
  { title: "It sends false pain signals", text: "The irritated nerve starts firing by itself, even without an injury.", term: "Ectopic firing", Art: StepSignals },
  { title: "Pain travels down the leg", text: "You feel the pain along the nerve's path: buttock, thigh, calf or foot.", term: "Sciatica / radiculopathy", Art: StepLeg },
];

export default function NervePathway() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % steps.length), 3500);
    return () => window.clearInterval(id);
  }, [playing]);

  return (
    <figure className="w-full mx-0 mb-0" aria-label="How a slipped disc causes leg pain, in four steps">
      <figcaption className="text-center mb-8">
        <h3 className="text-2xl text-[var(--ink)]">How a slipped disc causes leg pain</h3>
        <p className="mt-2 text-[var(--grey)]">The most common reason for sciatica, in four steps. Tap any step to see it move.</p>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="mt-4 inline-flex items-center gap-2 h-9 px-4 rounded-full text-sm font-medium glass-btn glass-clear border"
          aria-pressed={playing}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          )}
          {playing ? "Pause walkthrough" : "Play walkthrough"}
        </button>
      </figcaption>
      <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map(({ title, text, term, Art }, i) => {
          const on = i === active;
          return (
            <li key={title} className="relative">
              <button
                type="button"
                onClick={() => { setActive(i); setPlaying(false); }}
                aria-current={on ? "step" : undefined}
                className={`anim-step ${on ? "is-active" : ""} w-full h-full text-left rounded-[1.5rem] bg-white p-5 flex flex-col transition-all duration-500 ${
                  on ? "ring-2 ring-[var(--purple)] shadow-[var(--shadow-lg)] -translate-y-1" : "ring-1 ring-[var(--hairline)] opacity-80 hover:opacity-100"
                }`}
              >
                <div className="rounded-2xl bg-[var(--canvas)] p-3">
                  <Art />
                </div>
                <div className="mt-5 flex items-center gap-2">
                  <span className={`h-7 w-7 rounded-full text-sm font-semibold flex items-center justify-center transition-colors ${on ? "bg-[var(--purple)] text-white" : "bg-[var(--lavender)] text-[var(--purple-deep)]"}`}>{i + 1}</span>
                  <span className="text-[var(--ink)] text-lg font-semibold tracking-[-0.015em]">{title}</span>
                </div>
                <span className="mt-2 text-[15px] text-[var(--grey)] leading-relaxed flex-1">{text}</span>
                <span className="mt-4 text-xs font-medium text-[var(--purple)]">Medical term: {term}</span>
                {/* progress bar for the active step */}
                <span className="mt-4 h-1 w-full rounded-full bg-[var(--mist)] overflow-hidden" aria-hidden="true">
                  <span className={`block h-full bg-[var(--purple)] ${on && playing ? "step-progress" : on ? "w-full" : "w-0"}`} />
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
