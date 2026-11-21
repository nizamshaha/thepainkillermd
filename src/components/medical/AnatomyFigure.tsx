"use client";

// Professional anatomical body figure (front + back) for the body map.
// Clean medical-illustration style: smooth outline, soft shading, light
// surface anatomy, and the vertebral column drawn on the back view.

export const BODY_OUTLINE = "M50.00 3.00 C52.17 3.00 54.90 3.78 56.50 5.20 C58.10 6.62 59.12 9.28 59.60 11.50 C60.08 13.72 59.70 16.33 59.40 18.50 C59.10 20.67 58.50 22.75 57.80 24.50 C57.10 26.25 55.68 27.58 55.20 29.00 C54.72 30.42 54.77 31.78 54.90 33.00 C55.03 34.22 54.65 35.40 56.00 36.30 C57.35 37.20 60.57 37.75 63.00 38.40 C65.43 39.05 68.50 39.27 70.60 40.20 C72.70 41.13 74.43 42.20 75.60 44.00 C76.77 45.80 77.10 48.17 77.60 51.00 C78.10 53.83 78.20 57.83 78.60 61.00 C79.00 64.17 79.47 66.83 80.00 70.00 C80.53 73.17 81.23 76.58 81.80 80.00 C82.37 83.42 82.77 87.92 83.40 90.50 C84.03 93.08 85.07 93.67 85.60 95.50 C86.13 97.33 86.70 99.52 86.60 101.50 C86.50 103.48 85.80 106.38 85.00 107.40 C84.20 108.42 82.53 108.58 81.80 107.60 C81.07 106.62 81.03 103.77 80.60 101.50 C80.17 99.23 79.87 97.08 79.20 94.00 C78.53 90.92 77.50 86.67 76.60 83.00 C75.70 79.33 74.63 75.58 73.80 72.00 C72.97 68.42 72.33 64.75 71.60 61.50 C70.87 58.25 70.07 52.58 69.40 52.50 C68.73 52.42 68.20 57.83 67.60 61.00 C67.00 64.17 65.83 67.83 65.80 71.50 C65.77 75.17 66.83 79.25 67.40 83.00 C67.97 86.75 68.97 90.00 69.20 94.00 C69.43 98.00 69.20 102.17 68.80 107.00 C68.40 111.83 67.50 118.00 66.80 123.00 C66.10 128.00 64.87 132.67 64.60 137.00 C64.33 141.33 65.37 144.50 65.20 149.00 C65.03 153.50 64.27 159.00 63.60 164.00 C62.93 169.00 61.33 175.42 61.20 179.00 C61.07 182.58 62.40 183.47 62.80 185.50 C63.20 187.53 64.53 190.02 63.60 191.20 C62.67 192.38 58.57 193.03 57.20 192.60 C55.83 192.17 55.67 190.70 55.40 188.60 C55.13 186.50 55.70 184.10 55.60 180.00 C55.50 175.90 55.00 169.67 54.80 164.00 C54.60 158.33 54.63 152.33 54.40 146.00 C54.17 139.67 53.77 132.00 53.40 126.00 C53.03 120.00 52.77 113.75 52.20 110.00 C51.63 106.25 50.73 103.50 50.00 103.50 C49.27 103.50 48.37 106.25 47.80 110.00 C47.23 113.75 46.97 120.00 46.60 126.00 C46.23 132.00 45.83 139.67 45.60 146.00 C45.37 152.33 45.40 158.33 45.20 164.00 C45.00 169.67 44.50 175.90 44.40 180.00 C44.30 184.10 44.87 186.50 44.60 188.60 C44.33 190.70 44.17 192.17 42.80 192.60 C41.43 193.03 37.33 192.38 36.40 191.20 C35.47 190.02 36.80 187.53 37.20 185.50 C37.60 183.47 38.93 182.58 38.80 179.00 C38.67 175.42 37.07 169.00 36.40 164.00 C35.73 159.00 34.97 153.50 34.80 149.00 C34.63 144.50 35.67 141.33 35.40 137.00 C35.13 132.67 33.90 128.00 33.20 123.00 C32.50 118.00 31.60 111.83 31.20 107.00 C30.80 102.17 30.57 98.00 30.80 94.00 C31.03 90.00 32.03 86.75 32.60 83.00 C33.17 79.25 34.23 75.17 34.20 71.50 C34.17 67.83 33.00 64.17 32.40 61.00 C31.80 57.83 31.27 52.42 30.60 52.50 C29.93 52.58 29.13 58.25 28.40 61.50 C27.67 64.75 27.03 68.42 26.20 72.00 C25.37 75.58 24.30 79.33 23.40 83.00 C22.50 86.67 21.47 90.92 20.80 94.00 C20.13 97.08 19.83 99.23 19.40 101.50 C18.97 103.77 18.93 106.62 18.20 107.60 C17.47 108.58 15.80 108.42 15.00 107.40 C14.20 106.38 13.50 103.48 13.40 101.50 C13.30 99.52 13.87 97.33 14.40 95.50 C14.93 93.67 15.97 93.08 16.60 90.50 C17.23 87.92 17.63 83.42 18.20 80.00 C18.77 76.58 19.47 73.17 20.00 70.00 C20.53 66.83 21.00 64.17 21.40 61.00 C21.80 57.83 21.90 53.83 22.40 51.00 C22.90 48.17 23.23 45.80 24.40 44.00 C25.57 42.20 27.30 41.13 29.40 40.20 C31.50 39.27 34.57 39.05 37.00 38.40 C39.43 37.75 42.65 37.20 44.00 36.30 C45.35 35.40 44.97 34.22 45.10 33.00 C45.23 31.78 45.28 30.42 44.80 29.00 C44.32 27.58 42.90 26.25 42.20 24.50 C41.50 22.75 40.90 20.67 40.60 18.50 C40.30 16.33 39.92 13.72 40.40 11.50 C40.88 9.28 41.90 6.62 43.50 5.20 C45.10 3.78 47.83 3.00 50.00 3.00 Z";

type View = "front" | "back";
export type PainPoint = { view: View; x: number; y: number };

// Anatomically placed pain points for each region (viewBox 0 0 100 200)
export const PAIN_POINTS: Record<string, { label: string; points: PainPoint[] }> = {
  head: { label: "Head & Face", points: [{ view: "front", x: 50, y: 13 }] },
  neck: { label: "Neck & Cervical", points: [{ view: "back", x: 50, y: 34 }, { view: "front", x: 50, y: 33.5 }] },
  shoulder: { label: "Shoulder", points: [{ view: "front", x: 70.5, y: 44 }, { view: "front", x: 29.5, y: 44 }, { view: "back", x: 70.5, y: 44 }, { view: "back", x: 29.5, y: 44 }] },
  chest: { label: "Chest & Thoracic", points: [{ view: "front", x: 50, y: 50 }, { view: "back", x: 50, y: 54 }] },
  back: { label: "Lumbar & Thoracic Spine", points: [{ view: "back", x: 50, y: 62 }, { view: "back", x: 50, y: 80 }] },
  arm: { label: "Arm & Elbow", points: [{ view: "front", x: 76.8, y: 69 }, { view: "front", x: 23.2, y: 69 }] },
  hand: { label: "Hand & Wrist", points: [{ view: "front", x: 83.6, y: 93 }, { view: "front", x: 16.4, y: 93 }] },
  hip: { label: "Hip & Pelvis", points: [{ view: "back", x: 46, y: 93 }, { view: "back", x: 54, y: 93 }, { view: "front", x: 66.5, y: 94 }, { view: "front", x: 33.5, y: 94 }] },
  knee: { label: "Knee", points: [{ view: "front", x: 41.4, y: 139 }, { view: "front", x: 58.6, y: 139 }] },
  leg: { label: "Leg & Shin", points: [{ view: "back", x: 41.5, y: 156 }, { view: "back", x: 58.5, y: 156 }, { view: "front", x: 42, y: 160 }, { view: "front", x: 58, y: 160 }] },
  foot: { label: "Foot & Ankle", points: [{ view: "front", x: 40, y: 184 }, { view: "front", x: 60, y: 184 }] },
};

// Where pain from a region commonly travels (shown as an animated path)
export const RADIATE: Record<string, { view: View; d: string; note: string }> = {
  back: { view: "back", d: "M50 80 Q46 92 44 102 Q42 118 42 132 Q41.5 150 41.5 162 Q41 174 40 183", note: "Pain from the lower back can travel down the leg. This is called sciatica." },
  neck: { view: "back", d: "M50 34 Q62 38 70 43 Q75 50 77 60 Q79 72 81 84 Q83 94 84.5 101", note: "Pain from the neck can travel down the arm into the hand." },
  hip: { view: "back", d: "M54 93 Q57 102 57.5 112 Q58 124 58.5 134", note: "Pain from the sacroiliac joint is often felt in the buttock and upper thigh." },
};

export function AnatomyFigure({
  view,
  activeRegion,
  hoveredRegion,
  onHover,
  onSelect,
}: {
  view: View;
  activeRegion: string | null;
  hoveredRegion: string | null;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}) {
  const gid = `skin-${view}`;
  return (
    <svg viewBox="0 0 100 200" className="w-full h-auto" role="group" aria-label={`${view === "front" ? "Front" : "Back"} view of the body`}>
      <defs>
        <linearGradient id={gid} x1="0" x2="1">
          <stop offset="0" stopColor="#e2d8f8" />
          <stop offset="0.5" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dbd0f5" />
        </linearGradient>
        <radialGradient id={`glow-${view}`}>
          <stop offset="0" stopColor="#ff5d7a" stopOpacity="0.95" />
          <stop offset="0.45" stopColor="#d9365a" stopOpacity="0.45" />
          <stop offset="1" stopColor="#d9365a" stopOpacity="0" />
        </radialGradient>
        <filter id={`soft-${view}`} x="-20%" y="-10%" width="140%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#3d1d78" floodOpacity="0.12" />
        </filter>
      </defs>

      <path d={BODY_OUTLINE} fill={`url(#${gid})`} stroke="#a892dc" strokeWidth="0.45" filter={`url(#soft-${view})`} />

      <g fill="none" stroke="#b9a8e6" strokeWidth="0.35" strokeLinecap="round">
        {view === "front" ? (
          <>
            <path d="M42 39.2 Q46 38 50 40 Q54 38 58 39.2" />
<path d="M50 40 V64" />
<path d="M39.5 46 Q44 53 50 52.5 Q56 53 60.5 46" />
<path d="M45 67 Q50 69 55 67" opacity={0.6}/>
<circle cx="50" cy="76" r=".7" />
<path d="M40.8 92 Q50 98 59.2 92" opacity={0.6}/>
<ellipse cx="41.4" cy="139" rx="3" ry="3.6" opacity={0.7}/>
<ellipse cx="58.6" cy="139" rx="3" ry="3.6" opacity={0.7}/>
          </>
        ) : (
          <>
            <path d="M38 47 Q42 56 45.8 54" /><path d="M62 47 Q58 56 54.2 54" />
<path d="M44 99 Q47 106 50 103.5 Q53 106 56 99" opacity={0.7}/>
<path d="M38.5 112 Q44 116 49.4 111" opacity={0.55}/><path d="M61.5 112 Q56 116 50.6 111" opacity={0.55}/>
<path d="M41.8 150 Q42.5 156 41.6 162" opacity={0.5}/><path d="M58.2 150 Q57.5 156 58.4 162" opacity={0.5}/>
          </>
        )}
      </g>
      {view === "back" && (
        <g fill="#cdbff1" stroke="#a892dc" strokeWidth="0.2">
          <rect x="48.50" y="31.00" width="3.00" height="1.50" rx="0.62" /><rect x="48.48" y="33.00" width="3.05" height="1.50" rx="0.62" /><rect x="48.45" y="35.00" width="3.10" height="1.50" rx="0.62" /><rect x="48.42" y="37.00" width="3.15" height="1.50" rx="0.62" /><rect x="48.40" y="39.00" width="3.20" height="1.50" rx="0.62" /><rect x="48.20" y="41.00" width="3.60" height="2.00" rx="0.83" /><rect x="48.16" y="43.55" width="3.68" height="2.00" rx="0.83" /><rect x="48.12" y="46.10" width="3.76" height="2.00" rx="0.83" /><rect x="48.08" y="48.65" width="3.84" height="2.00" rx="0.83" /><rect x="48.04" y="51.20" width="3.92" height="2.00" rx="0.83" /><rect x="48.00" y="53.75" width="4.00" height="2.00" rx="0.83" /><rect x="47.96" y="56.30" width="4.08" height="2.00" rx="0.83" /><rect x="47.92" y="58.85" width="4.16" height="2.00" rx="0.83" /><rect x="47.88" y="61.40" width="4.24" height="2.00" rx="0.83" /><rect x="47.84" y="63.95" width="4.32" height="2.00" rx="0.83" /><rect x="47.80" y="66.50" width="4.40" height="2.00" rx="0.83" /><rect x="47.76" y="69.05" width="4.48" height="2.00" rx="0.83" /><rect x="47.70" y="71.60" width="4.60" height="2.60" rx="1.08" /><rect x="47.58" y="74.90" width="4.85" height="2.60" rx="1.08" /><rect x="47.45" y="78.20" width="5.10" height="2.60" rx="1.08" /><rect x="47.33" y="81.50" width="5.35" height="2.60" rx="1.08" /><rect x="47.20" y="84.80" width="5.60" height="2.60" rx="1.08" /><path d="M46.4 88.6 Q50 87.6 53.6 88.6 L51.6 97 Q50 98.6 48.4 97 Z"/>
        </g>
      )}

      {activeRegion && RADIATE[activeRegion]?.view === view && (
        <g aria-hidden="true">
          <path d={RADIATE[activeRegion].d} fill="none" stroke="#d9365a" strokeOpacity="0.18" strokeWidth="3.2" strokeLinecap="round" />
          <path d={RADIATE[activeRegion].d} fill="none" stroke="#d9365a" strokeWidth="0.9" strokeLinecap="round" strokeDasharray="2.5 2" className="anim-flow" />
        </g>
      )}

      {Object.entries(PAIN_POINTS).map(([id, r], ri) =>
        r.points
          .filter((p) => p.view === view)
          .map((p, i) => {
            const active = activeRegion === id;
            const hovered = hoveredRegion === id;
            return (
              <g
                key={`${id}-${i}`}
                className="cursor-pointer"
                onMouseEnter={() => onHover(id)}
                onMouseLeave={() => onHover(null)}
                onClick={() => onSelect(id)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(id); } }}
                tabIndex={i === 0 ? 0 : -1}
                role="button"
                aria-label={`${r.label} — show conditions`}
                aria-pressed={active}
              >
                <circle cx={p.x} cy={p.y} r="6" fill="transparent" />
                {(active || hovered) && <circle cx={p.x} cy={p.y} r={active ? 7 : 5.5} fill={`url(#glow-${view})`} />}
                {active && <circle cx={p.x} cy={p.y} r="3" fill="none" stroke="#d9365a" strokeWidth="0.5" className="pain-ring" />}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={active ? 1.6 : hovered ? 1.5 : 1.15}
                  fill={active || hovered ? "#d9365a" : "#7a4fcf"}
                  stroke="#fff"
                  strokeWidth="0.5"
                  className={active || hovered ? "transition-all duration-300" : "idle-dot"}
                  style={active || hovered ? undefined : { animationDelay: `${(ri * 0.3) % 2.4}s` }}
                />
              </g>
            );
          })
      )}
    </svg>
  );
}
