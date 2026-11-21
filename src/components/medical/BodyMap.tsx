"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { anatomyRegions, getRegionById } from "@/data/anatomy";
import type { AnatomyRegion } from "@/lib/types";
import { AnatomyFigure, PAIN_POINTS, RADIATE } from "@/components/medical/AnatomyFigure";



// Interactive body map: professional front + back anatomical figures with pain points
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
  const focus = focusId ? PAIN_POINTS[focusId] : null;
  return (
    <div className="w-full max-w-[460px] mx-auto">
      <div className="relative rounded-[1.75rem] bg-[var(--mist)] px-4 pt-12 pb-6">
        <p className="absolute top-4 left-0 right-0 text-center text-sm font-medium text-[var(--ink)] h-5" aria-live="polite">
          {focus ? focus.label : "Tap a point to explore"}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {(["front", "back"] as const).map((v) => (
            <figure key={v} className="m-0">
              <AnatomyFigure view={v} activeRegion={activeRegion} hoveredRegion={hoveredRegion} onHover={onRegionHover} onSelect={onRegionClick} />
              <figcaption className="mt-2 text-center text-xs font-medium uppercase tracking-[0.12em] text-[var(--grey)]">{v === "front" ? "Front" : "Back"}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      <p className="text-center text-sm mt-3 min-h-[2.5rem] text-[var(--color-text-muted)]" aria-live="polite">
        {activeRegion && RADIATE[activeRegion] ? (
          <span className="text-[#9b1c3c] font-medium">{RADIATE[activeRegion].note}</span>
        ) : (
          "Select a point on the body, or choose an area above"
        )}
      </p>
    </div>
  );
}

// Region detail panel
function RegionDetail({ region }: { region: AnatomyRegion }) {
  return (
    <div className="animate-slide-up bg-white rounded-[1.75rem] ring-1 ring-[var(--hairline)] p-7 shadow-[var(--shadow-md)]">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-[var(--lavender)] flex items-center justify-center">
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
        <h4 className="text-[15px] font-semibold text-[var(--ink)] mb-2">
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
        <h4 className="text-[15px] font-semibold text-[var(--ink)] mb-2">
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
          <h4 className="text-[15px] font-semibold text-[var(--ink)] mb-2">
            Relevant Nerves
          </h4>
          <div className="flex flex-wrap gap-2">
            {region.nerves.map((n) => (
              <span
                key={n}
                className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-[var(--lavender)] text-[var(--purple-deep)] border border-[var(--color-primary-200)]"
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
          <h4 className="text-[15px] font-semibold text-[var(--ink)] mb-2">
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
      className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
      aria-labelledby="body-map-title"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="section-head">
          <h2
            id="body-map-title"
            className="text-[var(--color-text-primary)] mb-4"
          >
            Where Does It Hurt?
          </h2>
          <p className="">
            Select a region on the body map to explore conditions affecting that area.
            Click or use keyboard arrows to navigate.
          </p>
        </div>

        {/* Tabbed Region Controls — Accessible */}
        <div
          ref={tabListRef}
          role="tablist"
          aria-label="Body regions"
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {anatomyRegions.map((r) => (
            <button
              key={r.id}
              role="tab"
              aria-selected={selectedRegion === r.id}
              aria-controls={`panel-${r.id}`}
              id={`tab-${r.id}`}
              tabIndex={selectedRegion === r.id ? 0 : -1}
              className={`px-4 h-10 rounded-full text-sm font-medium transition-colors ${
                selectedRegion === r.id
                  ? "bg-[var(--purple)] text-white"
                  : "bg-white text-[var(--color-text-secondary)] ring-1 ring-inset ring-[var(--line)] hover:ring-[var(--color-primary-300)] hover:text-[var(--ink)]"
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
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-8 rounded-[1.75rem] bg-[var(--mist)]">
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
