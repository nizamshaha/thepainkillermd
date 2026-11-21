"use client";

import { BODY_OUTLINE, PAIN_POINTS, RADIATE } from "@/components/medical/AnatomyFigure";

// A body picture that "draws" the patient's pain as they answer the assessment:
// where it hurts (glowing points), what it feels like (animation style),
// how strong it is (glow size/colour) and whether it travels (animated path).

type Props = {
  regions: string[];
  qualities: string[];
  intensity?: number;
  radiates?: boolean;
  radiationPattern?: string[];
  compact?: boolean;
};

const QUALITY_STYLE: Record<string, { cls: string; color: string; word: string }> = {
  burning: { cls: "q-burn", color: "#e8590c", word: "burning" },
  electric: { cls: "q-zap", color: "#7a4fcf", word: "electric" },
  shooting: { cls: "q-zap", color: "#9b3fd0", word: "shooting" },
  "pins-and-needles": { cls: "q-tingle", color: "#c2367a", word: "tingling" },
  aching: { cls: "q-throb", color: "#d9365a", word: "aching" },
  stabbing: { cls: "q-stab", color: "#c0283a", word: "stabbing" },
  numbness: { cls: "q-numb", color: "#7c8db5", word: "numb" },
  throbbing: { cls: "q-throb", color: "#d9365a", word: "throbbing" },
};

const REGION_WORD: Record<string, string> = {
  head: "head", neck: "neck", shoulder: "shoulder", arm: "arm", hand: "hand", chest: "chest",
  back: "lower back", hip: "hip", knee: "knee", leg: "leg", foot: "foot",
};

function radiatePaths(regions: string[], radiates?: boolean, pattern?: string[]) {
  if (!radiates) return [] as { view: "front" | "back"; d: string }[];
  const out: { view: "front" | "back"; d: string }[] = [];
  regions.forEach((r) => RADIATE[r] && out.push({ view: RADIATE[r].view, d: RADIATE[r].d }));
  if (pattern?.includes("below-knee") && !regions.includes("back")) out.push({ view: "back", d: RADIATE.back.d });
  if (pattern?.includes("below-elbow") && !regions.includes("neck")) out.push({ view: "back", d: RADIATE.neck.d });
  return out;
}

export function describePain({ regions, qualities, intensity, radiates }: Props) {
  if (!regions.length) return "Choose where it hurts and the picture will build as you answer.";
  const where = regions.map((r) => REGION_WORD[r] || r).join(", ");
  const feel = qualities.filter((q) => q !== "none").map((q) => QUALITY_STYLE[q]?.word || q);
  let s = `Pain in your ${where}`;
  if (feel.length) s += `, feels ${feel.join(" and ")}`;
  if (intensity !== undefined) s += `, ${intensity}/10`;
  if (radiates) s += ", and it travels";
  return s + ".";
}

export default function LivePainFigure(props: Props) {
  const { regions, qualities, intensity, compact } = props;
  const q = qualities.find((x) => QUALITY_STYLE[x]);
  const style = q ? QUALITY_STYLE[q] : { cls: "q-throb", color: "#d9365a", word: "" };
  const level = intensity ?? 5;
  const glowR = 7 + level * 0.75;
  const paths = radiatePaths(regions, props.radiates, props.radiationPattern);

  return (
    <div className="w-full">
      <div className={`grid grid-cols-2 gap-1 ${compact ? "max-w-[280px]" : "max-w-[380px]"} mx-auto`}>
        {(["front", "back"] as const).map((view) => (
          <figure key={view} className="m-0">
            <svg viewBox="0 0 100 200" className="w-full h-auto" role="img" aria-label={`${view} view`}>
              <defs>
                <linearGradient id={`lp-skin-${view}`} x1="0" x2="1">
                  <stop offset="0" stopColor="#e2d8f8" />
                  <stop offset="0.5" stopColor="#ffffff" />
                  <stop offset="1" stopColor="#dbd0f5" />
                </linearGradient>
                <radialGradient id={`lp-glow-${view}`}>
                  <stop offset="0" stopColor={style.color} stopOpacity="0.95" />
                  <stop offset="0.45" stopColor={style.color} stopOpacity="0.55" />
                  <stop offset="1" stopColor={style.color} stopOpacity="0" />
                </radialGradient>
              </defs>
              <path d={BODY_OUTLINE} fill={`url(#lp-skin-${view})`} stroke="#a892dc" strokeWidth="0.45" />
              {view === "back" && (
                <g fill="#d9cdf4">
                  {Array.from({ length: 22 }, (_, i) => (
                    <rect key={i} x={50 - (2.6 + i * 0.12)} y={31 + i * 2.95} width={5.2 + i * 0.24} height={i < 5 ? 1.5 : i < 17 ? 2 : 2.6} rx="1" />
                  ))}
                </g>
              )}
              {paths.filter((p) => p.view === view).map((p, i) => (
                <g key={i}>
                  <path d={p.d} fill="none" stroke={style.color} strokeOpacity="0.2" strokeWidth="3.4" strokeLinecap="round" />
                  <path d={p.d} fill="none" stroke={style.color} strokeWidth="1" strokeLinecap="round" strokeDasharray="2.5 2" className="anim-flow" />
                </g>
              ))}
              {regions.flatMap((r) =>
                (PAIN_POINTS[r]?.points || []).filter((p) => p.view === view).map((p, i) => (
                  <g key={`${r}-${i}`} className={`pain-spot ${style.cls}`} style={{ transformOrigin: `${p.x}px ${p.y}px` }}>
                    <circle cx={p.x} cy={p.y} r={glowR} fill={`url(#lp-glow-${view})`} className="spot-glow" />
                    {style.cls === "q-tingle" &&
                      [0, 1, 2, 3, 4, 5].map((k) => (
                        <circle key={k} cx={p.x + Math.cos(k * 1.05) * (glowR * 0.8)} cy={p.y + Math.sin(k * 1.05) * (glowR * 0.8)} r="0.55" fill={style.color} className="spark" style={{ animationDelay: `${k * 0.15}s` }} />
                      ))}
                    {style.cls === "q-zap" && (
                      <path d={`M${p.x - 2} ${p.y - 4} l2.5 3 l-2 1 l3 4`} fill="none" stroke="#fff" strokeWidth="0.7" strokeLinecap="round" className="spark" />
                    )}
                    <circle cx={p.x} cy={p.y} r="2" fill={style.color} stroke="#fff" strokeWidth="0.6" />
                  </g>
                ))
              )}
            </svg>
            <figcaption className="text-center text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--grey)]">{view === "front" ? "Front" : "Back"}</figcaption>
          </figure>
        ))}
      </div>
      {!compact && (
        <div className="mt-5 max-w-sm mx-auto">
          <div className="flex items-center justify-between text-xs text-[var(--grey)] mb-1.5">
            <span>Intensity</span>
            <span className="font-semibold text-[var(--ink)]">{intensity !== undefined ? `${intensity}/10` : "—"}</span>
          </div>
          <div className="h-2 rounded-full bg-white overflow-hidden ring-1 ring-[var(--hairline)]">
            <div
              className="h-full rounded-full transition-[width] duration-700 ease-out bg-[linear-gradient(90deg,#157a6e,#e8a10c,#d9365a)]"
              style={{ width: `${intensity !== undefined ? Math.max(4, intensity * 10) : 0}%`, backgroundSize: "380px 100%" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
