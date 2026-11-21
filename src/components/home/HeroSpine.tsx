// Stylised vertebral column for the hero. Vertebrae grow from cervical to lumbar;
// one lumbar segment is marked in the logo red as the "pain point".
export default function HeroSpine({ className = "" }: { className?: string }) {
  const segs: { w: number; h: number; region: "c" | "t" | "l" | "s" }[] = [
    ...Array.from({ length: 5 }, (_, i) => ({ w: 34 + i * 2, h: 11, region: "c" as const })),
    ...Array.from({ length: 8 }, (_, i) => ({ w: 46 + i * 1.6, h: 14, region: "t" as const })),
    ...Array.from({ length: 5 }, (_, i) => ({ w: 62 + i * 3, h: 19, region: "l" as const })),
  ];
  const gap = 7;
  let y = 8;
  const items = segs.map((s, i) => {
    const item = { ...s, y, i };
    y += s.h + gap;
    return item;
  });
  const painIndex = 16; // L4
  const cx = 60;
  const totalH = y + 50;

  return (
    <svg viewBox={`0 0 200 ${totalH}`} className={className} role="img" aria-label="Illustration of the spine with a highlighted lower-back segment">
      <defs>
        <linearGradient id="vert" x1="0" x2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.30" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      {/* spinal cord line */}
      <line x1={cx} y1={0} x2={cx} y2={totalH - 30} stroke="rgba(255,255,255,0.14)" strokeWidth="2" strokeDasharray="2 5" />
      {items.map((s) => {
        const pain = s.i === painIndex;
        return (
          <g key={s.i} className="spine-vertebra" style={{ animationDelay: `${120 + s.i * 45}ms` }}>
            <rect
              x={cx - s.w / 2}
              y={s.y}
              width={s.w}
              height={s.h}
              rx={s.h / 2.2}
              fill={pain ? "#d02a3c" : "url(#vert)"}
              stroke={pain ? "#ff8a96" : "rgba(255,255,255,0.28)"}
              strokeWidth="1"
            />
            {/* transverse processes */}
            <rect x={cx - s.w / 2 - 9} y={s.y + s.h / 2 - 2} width="9" height="4" rx="2" fill={pain ? "#d02a3c" : "rgba(255,255,255,0.16)"} />
            <rect x={cx + s.w / 2} y={s.y + s.h / 2 - 2} width="9" height="4" rx="2" fill={pain ? "#d02a3c" : "rgba(255,255,255,0.16)"} />
          </g>
        );
      })}
      {/* sacrum */}
      <path
        className="spine-vertebra"
        style={{ animationDelay: `${120 + 18 * 45}ms` }}
        d={`M${cx - 40} ${y} Q${cx} ${y - 4} ${cx + 40} ${y} L${cx + 14} ${y + 40} Q${cx} ${y + 46} ${cx - 14} ${y + 40} Z`}
        fill="url(#vert)"
        stroke="rgba(255,255,255,0.28)"
      />
      {/* pain marker */}
      {(() => {
        const p = items[painIndex];
        const py = p.y + p.h / 2;
        return (
          <g className="spine-vertebra" style={{ animationDelay: "1100ms" }}>
            <circle cx={cx} cy={py} r="14" fill="none" stroke="#ff5d6e" strokeWidth="2" className="spine-pain-ring" />
            <line x1={cx + p.w / 2 + 12} y1={py} x2={150} y2={py} stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
            <circle cx={150} cy={py} r="2.5" fill="#fff" />
            <text x={156} y={py + 4} fill="#fff" fontSize="11" fontFamily="var(--font-body)" fontWeight="600">L4–L5</text>
          </g>
        );
      })()}
    </svg>
  );
}
