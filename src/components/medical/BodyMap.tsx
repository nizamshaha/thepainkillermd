"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { anatomyRegions, getRegionById } from "@/data/anatomy";
import type { AnatomyRegion } from "@/lib/types";


// Calibrated hotspot coordinates matching body.jpeg (aspect ratio 2:3)
const anatomyHotspots: Array<{
  id: string;
  label: string;
  spots: Array<{ cx: number; cy: number; rx: number; ry: number }>;
}> = [
  { id: "head", label: "Head & Face", spots: [{ cx: 50, cy: 7, rx: 7, ry: 4.5 }] },
  { id: "neck", label: "Neck & Cervical", spots: [{ cx: 50, cy: 14.5, rx: 5, ry: 2.5 }] },
  {
    id: "shoulder",
    label: "Shoulder",
    spots: [
      { cx: 33, cy: 18, rx: 6, ry: 3.5 },
      { cx: 67, cy: 18, rx: 6, ry: 3.5 },
    ],
  },
  { id: "chest", label: "Chest & Thoracic", spots: [{ cx: 50, cy: 23.5, rx: 11, ry: 4.5 }] },
  { id: "back", label: "Lumbar & Thoracic Spine", spots: [{ cx: 50, cy: 34, rx: 9, ry: 5 }] },
  {
    id: "arm",
    label: "Arm & Elbow",
    spots: [
      { cx: 20, cy: 33, rx: 4.5, ry: 7 },
      { cx: 80, cy: 33, rx: 4.5, ry: 7 },
    ],
  },
  {
    id: "hand",
    label: "Hand & Wrist",
    spots: [
      { cx: 13.5, cy: 52, rx: 3.5, ry: 5 },
      { cx: 86.5, cy: 52, rx: 3.5, ry: 5 },
    ],
  },
  {
    id: "hip",
    label: "Hip & Pelvis",
    spots: [
      { cx: 38, cy: 47, rx: 6, ry: 3.5 },
      { cx: 62, cy: 47, rx: 6, ry: 3.5 },
      { cx: 50, cy: 43, rx: 5, ry: 2.5 },
    ],
  },
  {
    id: "knee",
    label: "Knee",
    spots: [
      { cx: 41.5, cy: 68, rx: 5, ry: 3.5 },
      { cx: 58.5, cy: 68, rx: 5, ry: 3.5 },
    ],
  },
  {
    id: "leg",
    label: "Leg & Shin",
    spots: [
      { cx: 42, cy: 77, rx: 4.5, ry: 5 },
      { cx: 58, cy: 77, rx: 4.5, ry: 5 },
    ],
  },
  {
    id: "foot",
    label: "Foot & Ankle",
    spots: [
      { cx: 42, cy: 89, rx: 5, ry: 4 },
      { cx: 58, cy: 89, rx: 5, ry: 4 },
    ],
  },
];

// Interactive human anatomy body map with calibrated clickable hotspots
function BodySilhouette({
  activeRegion,
  onRegionHover,
  onRegionClick,
  hoveredRegion,
}: {
  activeRegion: string | null;
  hoveredRegion: string | null;
  onRegionHover: (id: string | null) => void;
  onRegionClick: (id: string) => void;
}) {
  const focusId = activeRegion || hoveredRegion;
  const activeSpot = anatomyHotspots.find((h) => h.id === focusId);

  return (
    <div className="relative w-full max-w-[340px] mx-auto">
      {/* 2:3 Aspect ratio container with SVG body silhouette */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-[var(--color-surface-50)] shadow-inner border border-[var(--color-surface-200)]" style={{ aspectRatio: "2 / 3" }}>
        {/* SVG Body Silhouette Background */}
        <svg viewBox="0 0 100 150" className="absolute inset-0 w-full h-full z-0 opacity-20" preserveAspectRatio="xMidYMid meet">
          {/* Head */}
          <ellipse cx="50" cy="18" rx="10" ry="12" fill="var(--color-clinical-400)" />
          {/* Neck */}
          <rect x="47" y="30" width="6" height="6" rx="2" fill="var(--color-clinical-400)" />
          {/* Torso */}
          <path d="M35 36 L65 36 L68 85 L32 85 Z" fill="var(--color-clinical-400)" rx="4" />
          {/* Left Arm */}
          <path d="M35 36 L25 40 L18 70 L22 72 L28 48 L35 44 Z" fill="var(--color-clinical-400)" />
          {/* Right Arm */}
          <path d="M65 36 L75 40 L82 70 L78 72 L72 48 L65 44 Z" fill="var(--color-clinical-400)" />
          {/* Left Leg */}
          <path d="M35 85 L48 85 L46 140 L38 140 L32 95 Z" fill="var(--color-clinical-400)" />
          {/* Right Leg */}
          <path d="M52 85 L65 85 L68 95 L62 140 L54 140 Z" fill="var(--color-clinical-400)" />
        </svg>

        {/* SVG Interactive Hotspot Overlay */}
        <svg
          viewBox="0 0 100 150"
          className="absolute inset-0 w-full h-full z-10"
          preserveAspectRatio="none"
          role="img"
          aria-label="Interactive anatomical body map — click a region to explore conditions"
        >
          <title>Interactive anatomical body map</title>
          <desc>Clickable anatomical hotspots overlaying the human body map</desc>

          <defs>
            <filter id="activeSpotGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="hoverSpotGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Render interactive region hotspots */}
          {anatomyHotspots.map((region) => {
            const isActive = activeRegion === region.id;
            const isHovered = hoveredRegion === region.id;
            const isFocused = isActive || isHovered;

            const fillColor = isActive
              ? "rgba(14, 165, 233, 0.45)"
              : isHovered
              ? "rgba(14, 165, 233, 0.28)"
              : "rgba(14, 165, 233, 0.05)";

            const strokeColor = isActive
              ? "var(--color-clinical-600, #0284c7)"
              : isHovered
              ? "var(--color-clinical-500, #0ea5e9)"
              : "rgba(14, 165, 233, 0.2)";

            const strokeWidth = isActive ? 0.7 : isHovered ? 0.5 : 0.25;

            return (
              <g key={region.id}>
                {region.spots.map((spot, idx) => (
                  <g key={`${region.id}-${idx}`}>
                    {/* Invisible expanded hit area */}
                    <ellipse
                      cx={spot.cx}
                      cy={spot.cy}
                      rx={spot.rx + 2.5}
                      ry={spot.ry + 2.5}
                      fill="transparent"
                      className="cursor-pointer"
                      tabIndex={0}
                      role="button"
                      aria-label={`${region.label} — click to explore conditions`}
                      aria-pressed={isActive}
                      onMouseEnter={() => onRegionHover(region.id)}
                      onMouseLeave={() => onRegionHover(null)}
                      onClick={() => onRegionClick(region.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onRegionClick(region.id);
                        }
                      }}
                    />

                    {/* Visible hotspot highlight */}
                    <ellipse
                      cx={spot.cx}
                      cy={spot.cy}
                      rx={spot.rx}
                      ry={spot.ry}
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeDasharray={isActive ? undefined : "1 0.5"}
                      className="pointer-events-none transition-all duration-200"
                      filter={isActive ? "url(#activeSpotGlow)" : isHovered ? "url(#hoverSpotGlow)" : undefined}
                    />

                    {/* Active pulse center dot */}
                    {isActive && (
                      <circle
                        cx={spot.cx}
                        cy={spot.cy}
                        r={1.2}
                        fill="var(--color-clinical-600, #0284c7)"
                        className="pointer-events-none"
                      />
                    )}
                  </g>
                ))}
              </g>
            );
          })}

          {/* Active / Hover Region Badge Tooltip */}
          {activeSpot && (
            <g className="pointer-events-none">
              <rect
                x={Math.max(4, Math.min(68, activeSpot.spots[0].cx - 16))}
                y={Math.max(2, activeSpot.spots[0].cy - activeSpot.spots[0].ry - 4.5)}
                width="32"
                height="4.5"
                rx="1.2"
                fill="var(--color-primary-900, #0f172a)"
                opacity="0.92"
              />
              <text
                x={Math.max(4, Math.min(68, activeSpot.spots[0].cx - 16)) + 16}
                y={Math.max(2, activeSpot.spots[0].cy - activeSpot.spots[0].ry - 4.5) + 3.1}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="2.4"
                fontWeight="700"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                {activeSpot.label}
              </text>
            </g>
          )}
        </svg>
      </div>

      <p className="text-center text-xs text-[var(--color-text-muted)] mt-3">
        Click any highlighted anatomical area or use the category pills above
      </p>
    </div>
  );
}

// Region detail panel
function RegionDetail({ region }: { region: AnatomyRegion }) {
  return (
    <div className="animate-slide-up bg-white rounded-xl border border-[var(--color-surface-300)] p-6 shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-[var(--color-clinical-500)] bg-opacity-10 flex items-center justify-center">
          <span className="text-[var(--color-clinical-600)] font-bold text-lg">
            {region.name.charAt(0)}
          </span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
            {region.label}
          </h3>
        </div>
      </div>

      {/* Conditions */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
          Common Conditions
        </h4>
        <div className="flex flex-wrap gap-2">
          {region.conditions.map((c) => (
            <span
              key={c}
              className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary-700)] border border-[var(--color-primary-200)]"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Mechanisms */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
          Clinical Mechanisms
        </h4>
        <ul className="space-y-1.5">
          {region.mechanisms.map((m, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[var(--color-clinical-500)] flex-shrink-0" />
              {m}
            </li>
          ))}
        </ul>
      </div>

      {/* Nerves */}
      {region.nerves && region.nerves.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
            Relevant Nerves
          </h4>
          <div className="flex flex-wrap gap-2">
            {region.nerves.map((n) => (
              <span
                key={n}
                className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-[var(--color-pathway-neuropathic)] bg-opacity-10 text-[var(--color-pathway-neuropathic)] border border-[var(--color-pathway-neuropathic)] border-opacity-30"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Vertebrae */}
      {region.vertebrae && region.vertebrae.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
            Spinal Levels
          </h4>
          <div className="flex flex-wrap gap-2">
            {region.vertebrae.map((v) => (
              <span
                key={v}
                className="inline-block px-2.5 py-0.5 text-xs font-mono font-medium rounded bg-[var(--color-surface-100)] text-[var(--color-text-secondary)] border border-[var(--color-surface-300)]"
              >
                {v}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function BodyMap() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const tabListRef = useRef<HTMLDivElement>(null);
  const region = selectedRegion ? getRegionById(selectedRegion) : null;

  const handleRegionClick = useCallback((id: string) => {
    setSelectedRegion((prev) => (prev === id ? null : id));
  }, []);

  // Keyboard navigation for tabs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!tabListRef.current?.contains(document.activeElement)) return;
      const ids = anatomyRegions.map((r) => r.id);
      const current = ids.indexOf(selectedRegion || "");
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = (current + 1) % ids.length;
        setSelectedRegion(ids[next]);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const prev = (current - 1 + ids.length) % ids.length;
        setSelectedRegion(ids[prev]);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedRegion]);

  return (
    <section
      id="body-map"
      className="py-16 px-4 sm:px-6 lg:px-8"
      aria-labelledby="body-map-title"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-[var(--color-clinical-600)] uppercase tracking-wider mb-2">
            02. Interactive Anatomy
          </p>
          <h2
            id="body-map-title"
            className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3"
          >
            Where Does It Hurt?
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Select a region on the body map to explore conditions affecting that area.
            Click or use keyboard arrows to navigate.
          </p>
        </div>

        {/* Tabbed Region Controls — Accessible */}
        <div
          ref={tabListRef}
          role="tablist"
          aria-label="Body regions"
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {anatomyRegions.map((r) => (
            <button
              key={r.id}
              role="tab"
              aria-selected={selectedRegion === r.id}
              aria-controls={`panel-${r.id}`}
              id={`tab-${r.id}`}
              tabIndex={selectedRegion === r.id ? 0 : -1}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedRegion === r.id
                  ? "bg-[var(--color-clinical-500)] text-white shadow-md"
                  : "bg-[var(--color-surface-100)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-200)] border border-[var(--color-surface-300)]"
              }`}
              onClick={() => handleRegionClick(r.id)}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Body Map + Detail Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Body Silhouette */}
          <div className="flex justify-center">
            <BodySilhouette
              activeRegion={selectedRegion}
              hoveredRegion={hoveredRegion}
              onRegionHover={setHoveredRegion}
              onRegionClick={handleRegionClick}
            />
          </div>

          {/* Detail Panel */}
          <div>
            {region ? (
              <div
                role="tabpanel"
                id={`panel-${selectedRegion}`}
                aria-labelledby={`tab-${selectedRegion}`}
              >
                <RegionDetail region={region} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-8 rounded-xl border-2 border-dashed border-[var(--color-surface-300)]">
                <div className="w-16 h-16 rounded-full bg-[var(--color-surface-100)] flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25L4.542 8.372l5.227 7.917-3.286.672L12 2.25z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                  Select a Body Region
                </h3>
                <p className="text-[var(--color-text-secondary)] max-w-sm">
                  Click on the body map or select a region tab above to explore
                  conditions, mechanisms, and relevant anatomy for that area.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
