"use client";

import { useState } from "react";

// Spinal stenosis explained with two top-down cross-sections of a lower-back
// vertebra: healthy canal vs. narrowed canal, with plain-language labels.

const BONE = "#f3eefc";
const BONE_LINE = "#a892dc";
const NERVE = "#f2b630";
const NERVE_LINE = "#c98d10";
const PAIN = "#d9365a";

function Vertebra({ narrowed }: { narrowed: boolean }) {
  const canalR = narrowed ? 15 : 27;
  const nerves = narrowed
    ? [[150, 98], [143, 104], [157, 104], [150, 108], [146, 99], [154, 99]]
    : [[140, 92], [160, 92], [132, 104], [150, 100], [168, 104], [142, 114], [158, 114]];
  return (
    <svg viewBox="0 0 300 230" className="w-full h-auto" aria-hidden="true">
      {/* vertebral body (front of the spine) */}
      <ellipse cx="150" cy="178" rx="78" ry="44" fill={BONE} stroke={BONE_LINE} strokeWidth="2" />
      {/* disc edge — bulging backwards when narrowed */}
      {narrowed && <path d="M112 140 Q150 118 188 140" fill="#c4aef0" stroke="#8a6fd0" strokeWidth="1.5" />}
      {/* bony ring around the canal */}
      <path
        d={`M92 150 Q70 110 86 70 L110 56 Q150 36 190 56 L214 70 Q230 110 208 150 Q180 136 150 136 Q120 136 92 150 Z`}
        fill={BONE}
        stroke={BONE_LINE}
        strokeWidth="2"
      />
      {/* facet joints */}
      <ellipse cx={narrowed ? 90 : 84} cy="88" rx={narrowed ? 20 : 15} ry={narrowed ? 18 : 13} fill={narrowed ? "#f6d3d8" : BONE} stroke={narrowed ? PAIN : BONE_LINE} strokeWidth="1.6" />
      <ellipse cx={narrowed ? 210 : 216} cy="88" rx={narrowed ? 20 : 15} ry={narrowed ? 18 : 13} fill={narrowed ? "#f6d3d8" : BONE} stroke={narrowed ? PAIN : BONE_LINE} strokeWidth="1.6" />
      {/* spinous process */}
      <path d="M134 42 L150 6 L166 42 Z" fill={BONE} stroke={BONE_LINE} strokeWidth="2" />
      {/* canal */}
      <circle cx="150" cy="102" r={canalR + (narrowed ? 0 : 6)} fill="#fff" stroke={BONE_LINE} strokeWidth="1.2" />
      {/* thickened ligament at the back of the canal */}
      {narrowed && <path className="hv-press" d="M118 84 Q150 66 182 84 Q170 92 150 90 Q130 92 118 84 Z" fill="#8a6fd0" opacity="0.85" />}
      {/* nerves */}
      <circle cx="150" cy="102" r={canalR} fill="#fff7e0" stroke={NERVE_LINE} strokeWidth="1" />
      {!narrowed && (
        <circle cx="150" cy="102" r={canalR + 2} fill="none" stroke="#157a6e" strokeWidth="1.4" strokeDasharray="4 4" className="hv-flow" />
      )}
      {nerves.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={narrowed ? 3.2 : 5} fill={NERVE} stroke={NERVE_LINE} strokeWidth="0.8" className={narrowed ? "hv-jitter" : "hv-breathe"} style={{ animationDelay: `${i * 0.12}s` }} />
      ))}
      {narrowed && (
        <>
          <g className="hv-squeeze-l"><path d="M98 104 l16 -2 m-6 -5 l6 5 l-5 5" fill="none" stroke={PAIN} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></g>
          <g className="hv-squeeze-r"><path d="M202 104 l-16 -2 m6 -5 l-6 5 l5 5" fill="none" stroke={PAIN} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></g>
          <circle cx="150" cy="102" r={canalR + 5} fill="none" stroke={PAIN} strokeWidth="1.2" className="hv-throb" />
        </>
      )}
      {/* labels */}
      <text x="150" y="186" textAnchor="middle" fontSize="12" fill="#55516a" fontWeight="600">Vertebra</text>
      <text x="246" y="104" fontSize="12" fill="#8a5a00" fontWeight="600">Nerves</text>
      <line x1="244" y1="100" x2={150 + canalR + 2} y2="100" stroke="#c98d10" strokeWidth="1" />
      {narrowed && (
        <>
          <text x="4" y="40" fontSize="11" fill="#3d1d78" fontWeight="600">Thickened ligament</text>
          <line x1="70" y1="44" x2="128" y2="80" stroke="#3d1d78" strokeWidth="1" />
          <text x="4" y="150" fontSize="11" fill="#9b1c3c" fontWeight="600">Enlarged joint</text>
          <line x1="50" y1="140" x2="80" y2="104" stroke="#9b1c3c" strokeWidth="1" />
          <text x="230" y="150" fontSize="11" fill="#3d1d78" fontWeight="600">Bulging disc</text>
          <line x1="232" y1="146" x2="180" y2="134" stroke="#3d1d78" strokeWidth="1" />
        </>
      )}
    </svg>
  );
}

export default function SpinalStenosis() {
  const [touched, setTouched] = useState<string | null>(null);
  return (
    <figure className="w-full mx-0 mb-0" aria-label="Healthy spinal canal compared with a narrowed spinal canal">
      <figcaption className="text-center mb-8">
        <h3 className="text-2xl text-[var(--ink)]">What is spinal stenosis?</h3>
        <p className="mt-2 text-[var(--grey)]">Looking down through a lower-back bone: the space for the nerves gets smaller. Hover or tap each picture to see it move.</p>
      </figcaption>
      <div className="grid md:grid-cols-2 gap-4">
        <div onTouchStart={() => setTouched("h")} onClick={() => setTouched(touched === "h" ? null : "h")} className={`diagram-card ${touched === "h" ? "is-on" : ""} cursor-pointer rounded-[1.5rem] bg-white p-6 ring-1 ring-[var(--hairline)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)] hover:ring-[#157a6e]`}>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#157a6e]" />
            <h4 className="text-[var(--ink)] text-lg">Healthy spine</h4>
          </div>
          <div className="mt-4 rounded-2xl bg-[var(--canvas)] p-3"><div className="max-w-[400px] mx-auto"><Vertebra narrowed={false} /></div></div>
          <ul className="mt-5 space-y-1.5 text-[15px] text-[var(--grey)]">
            <li>Plenty of room for the nerves</li>
            <li>Walking and standing feel normal</li>
          </ul>
        </div>
        <div onTouchStart={() => setTouched("s")} onClick={() => setTouched(touched === "s" ? null : "s")} className={`diagram-card ${touched === "s" ? "is-on" : ""} cursor-pointer rounded-[1.5rem] bg-white p-6 ring-1 ring-[#f6d3d8] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)] hover:ring-[#d9365a]`}>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#d9365a]" />
            <h4 className="text-[var(--ink)] text-lg">Spinal stenosis (narrowed canal)</h4>
          </div>
          <div className="mt-4 rounded-2xl bg-[#fff8f9] p-3"><div className="max-w-[400px] mx-auto"><Vertebra narrowed /></div></div>
          <ul className="mt-5 space-y-1.5 text-[15px] text-[var(--grey)]">
            <li>Bone, ligament and disc changes squeeze the nerves</li>
            <li>Leg pain or heaviness when walking, eased by sitting or bending forward</li>
          </ul>
        </div>
      </div>
    </figure>
  );
}
