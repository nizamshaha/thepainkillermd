"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  BODY_REGIONS,
  BODY_OUTLINE_FRONT,
  getRegionsForView,
  type BodyView,
  type PainIntensity,
  type PainSelection,
} from "@/data/bodyRegions";
import type { PainArea } from "@/data/painAreas";
import { useT } from "@/lib/useT";
import BodyRegionZoom from "./BodyRegionZoom";
import { BODY_OUTLINE } from "./AnatomyFigure";

// Hotspot positions on the anatomical figure (viewBox 0 0 100 200)
type XY = [number, number][];
const L = (x: number, y: number): XY => [[x, y], [100 - x, y]];
const REGION_XY: Record<"front" | "back", Record<string, XY>> = {
  front: {
    headache: [[50, 7.5]], "face-pain": [[50, 17]], "neck-cervical-pain": [[50, 33.5]], "shoulder-pain": L(70.5, 43),
    "chest-pain": [[50, 50]], "arm-pain": L(77.2, 58), "elbow-pain": L(78.6, 69), "forearm-pain": L(81, 80),
    "wrist-pain": L(83.6, 92), "palm-pain": L(84.8, 98.5), "fingers-pain": L(84, 105), "hip-pain": L(66.5, 94),
    "thigh-pain-anterior": L(59, 118), "knee-pain": L(58.6, 139), "leg-pain": L(58, 158), "ankle-pain": L(60.2, 181),
    "foot-pain": L(60.8, 189),
  },
  back: {
    headache: [[50, 8]], "neck-cervical-pain": [[50, 34]], "shoulder-pain": L(70.5, 43), "upper-back-pain": [[50, 47]],
    "midback-pain": [[50, 62]], "low-back-pain": [[50, 80]], "tail-bone-pain": [[50, 98]], "buttock-pain": L(57, 104),
    "hip-pain": L(66.5, 94), "arm-pain": L(77.2, 58), "elbow-pain": L(78.6, 69), "forearm-pain": L(81, 80),
    "wrist-pain": L(83.6, 92), "thigh-pain-posterior": L(59, 121), "knee-pain": L(58.6, 140), "leg-pain": L(58.5, 156),
    "ankle-pain": L(60.2, 181), "foot-pain": L(60.8, 190),
  },
};

interface PlacedPin {
  anchor: { id: string; label: string; x: number; y: number };
  customLabel?: string;
}

type RegionZoomState = {
  regionId: string;
  pins: PlacedPin[];
} | null;

interface PainBodyProps {
  areas: PainArea[];
  selectedIds: string[];
  onSelect: (area: PainArea) => void;
  onPinsChange?: (pins: Map<string, PlacedPin[]>) => void;
}

/* ─── Intensity visual config ──────────────────────────────────────── */
const INTENSITY_CONFIG: Record<
  PainIntensity,
  { fill: string; stroke: string; glow: string; label: string }
> = {
  mild: {
    fill: "rgba(251, 191, 36, 0.55)",
    stroke: "#f59e0b",
    glow: "0 0 8px rgba(251,191,36,0.5)",
    label: "Mild",
  },
  moderate: {
    fill: "rgba(249, 115, 22, 0.6)",
    stroke: "#f97316",
    glow: "0 0 12px rgba(249,115,22,0.55)",
    label: "Moderate",
  },
  severe: {
    fill: "rgba(239, 68, 68, 0.7)",
    stroke: "#ef4444",
    glow: "0 0 14px rgba(239,68,68,0.6)",
    label: "Severe",
  },
};

export default function PainBody({ areas, selectedIds, onSelect, onPinsChange }: PainBodyProps) {
  const t = useT();
  const [view, setView] = useState<BodyView>("front");
  const [hovered, setHovered] = useState<string | null>(null);
  const [selections, setSelections] = useState<Map<string, PainSelection>>(new Map());
  const [activeIntensity, setActiveIntensity] = useState<PainIntensity>("moderate");
  const [showIntensityPicker, setShowIntensityPicker] = useState<string | null>(null);
  const [showMobileSheet, setShowMobileSheet] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; label: string } | null>(null);
  const [zoomRegion, setZoomRegion] = useState<string | null>(null);
  const [regionPins, setRegionPins] = useState<Map<string, PlacedPin[]>>(new Map());

  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const visibleRegions = getRegionsForView(view).filter((r) =>
    areas.some((a) => a.id === r.id)
  );

  /* ─── Cursor Glow (CSS custom properties for performance) ─────── */
  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      container.style.setProperty("--pointer-x", `${x}%`);
      container.style.setProperty("--pointer-y", `${y}%`);
      if (glowRef.current) {
        glowRef.current.style.opacity = "1";
      }
    },
    []
  );

  const handlePointerEnter = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = "1";
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = "0";
    setHovered(null);
    setTooltip(null);
    setShowIntensityPicker(null);
  }, []);

  /* ─── SVG coordinate helper ──────────────────────────────────── */
  const svgCoords = useCallback(
    (e: React.PointerEvent) => {
      const svg = svgRef.current;
      if (!svg) return { x: 0, y: 0 };
      const rect = svg.getBoundingClientRect();
      return {
        x: ((e.clientX - rect.left) / rect.width) * 200,
        y: ((e.clientY - rect.top) / rect.height) * 500,
      };
    },
    []
  );

  /* ─── Region interaction handlers ────────────────────────────── */
  const handleRegionPointerEnter = useCallback(
    (id: string, label: string, e: React.PointerEvent) => {
      if (e.pointerType === "touch") return;
      setHovered(id);
      const pt = svgCoords(e);
      setTooltip({ x: pt.x, y: pt.y - 20, label });
    },
    [svgCoords]
  );

  const handleRegionPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === "touch") return;
      if (hovered) {
        const pt = svgCoords(e);
        const region = visibleRegions.find((r) => r.id === hovered);
        setTooltip((prev) =>
          prev ? { ...prev, x: pt.x, y: pt.y - 20, label: region?.label ?? prev.label } : prev
        );
      }
    },
    [hovered, svgCoords, visibleRegions]
  );

  const handleRegionPointerLeave = useCallback(() => {
    setHovered(null);
    setTooltip(null);
  }, []);

  const handleRegionClick = useCallback(
    (id: string) => {
      // Open zoom panel for this region
      setZoomRegion(id);
      setHovered(null);
      setTooltip(null);
    },
    []
  );

  const handleZoomConfirm = useCallback(
    (regionId: string, pins: PlacedPin[]) => {
      // Save pins for this region
      const newPins = new Map(regionPins);
      if (pins.length > 0) {
        newPins.set(regionId, pins);
      } else {
        newPins.delete(regionId);
      }
      setRegionPins(newPins);
      onPinsChange?.(newPins);

      // Also select the region in the main body map
      const area = areas.find((a) => a.id === regionId);
      if (area) {
        setSelections((prev) => {
          const next = new Map(prev);
          next.set(regionId, { regionId, label: area.name, intensity: activeIntensity });
          return next;
        });
        onSelect(area as PainArea);
      }

      setZoomRegion(null);
    },
    [areas, activeIntensity, onSelect, regionPins, onPinsChange]
  );

  const handleZoomClose = useCallback(() => {
    setZoomRegion(null);
  }, []);

  const handleRegionKeyDown = useCallback(
    (e: React.KeyboardEvent, id: string) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleRegionClick(id);
      }
      if (e.key === "Escape") {
        setShowIntensityPicker(null);
        setShowMobileSheet(null);
      }
    },
    [handleRegionClick]
  );

  /* ─── Mobile tap handler ─────────────────────────────────────── */
  const handleRegionTouch = useCallback(
    (id: string) => {
      const area = areas.find((a) => a.id === id);
      if (!area) return;
      setShowMobileSheet(id);
      if (!selections.has(id)) {
        // Don't add yet — wait for intensity pick
      }
    },
    [areas, selections]
  );

  const confirmMobileSelection = useCallback(
    (id: string) => {
      const area = areas.find((a) => a.id === id);
      if (!area) return;
      setSelections((prev) => {
        const next = new Map(prev);
        next.set(id, { regionId: id, label: area.name, intensity: activeIntensity });
        return next;
      });
      onSelect(area as PainArea);
      setShowMobileSheet(null);
    },
    [areas, activeIntensity, onSelect]
  );

  /* ─── Intensity change ───────────────────────────────────────── */
  const updateIntensity = useCallback((id: string, intensity: PainIntensity) => {
    setSelections((prev) => {
      const next = new Map(prev);
      const existing = next.get(id);
      if (existing) {
        next.set(id, { ...existing, intensity });
      }
      return next;
    });
    setActiveIntensity(intensity);
  }, []);

  /* ─── Remove selection ───────────────────────────────────────── */
  const removeSelection = useCallback((id: string) => {
    setSelections((prev) => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
    // Also remove pins for this region
    setRegionPins((prev) => {
      const next = new Map(prev);
      next.delete(id);
      onPinsChange?.(next);
      return next;
    });
    setShowMobileSheet(null);
  }, [onPinsChange]);

  /* ─── Sync selection count to parent for badge ───────────────── */
  useEffect(() => {
    const ids = Array.from(selections.keys());
    // Only sync if different from parent selectedIds
    if (JSON.stringify(ids) !== JSON.stringify(selectedIds)) {
      selections.forEach((sel) => {
        const area = areas.find((a) => a.id === sel.regionId);
        if (area) onSelect(area as PainArea);
      });
    }
  }, [selections]); // eslint-disable-line react-hooks/exhaustive-deps

  const selectedIdsFromMap = Array.from(selections.keys());

  /* ─── Keyboard: Escape closes pickers ────────────────────────── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowIntensityPicker(null);
        setShowMobileSheet(null);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* ─── SVG Body Container ─────────────────────────── */}
        <div className="flex-1 w-full">
          <div
            ref={containerRef}
            className="relative rounded-[1.75rem] bg-[var(--mist)] p-4 sm:p-6 overflow-hidden"
          >
            {/* hovered / selected label */}
            <p className="text-center text-sm font-medium text-[var(--ink)] h-5 mb-2" aria-live="polite">
              {hovered ? visibleRegions.find((r) => r.id === hovered)?.label : selectedIdsFromMap.length ? `${selectedIdsFromMap.length} area${selectedIdsFromMap.length > 1 ? "s" : ""} selected` : "Tap a point on the body"}
            </p>
            <svg
              ref={svgRef}
              viewBox="0 0 100 200"
              className="relative z-10 w-full max-h-[540px] mx-auto select-none"
              role="group"
              aria-label="Interactive body map — select your pain areas"
            >
              <defs>
                <linearGradient id="pb-skin" x1="0" x2="1">
                  <stop offset="0" stopColor="#e2d8f8" />
                  <stop offset="0.5" stopColor="#ffffff" />
                  <stop offset="1" stopColor="#dbd0f5" />
                </linearGradient>
                <radialGradient id="pb-glow">
                  <stop offset="0" stopColor="#ff5d7a" stopOpacity="0.9" />
                  <stop offset="0.5" stopColor="#d9365a" stopOpacity="0.35" />
                  <stop offset="1" stopColor="#d9365a" stopOpacity="0" />
                </radialGradient>
              </defs>
              <path d={BODY_OUTLINE} fill="url(#pb-skin)" stroke="#a892dc" strokeWidth="0.45" className="pointer-events-none" />
              {view === "back" && (
                <g fill="#d9cdf4" className="pointer-events-none">
                  {Array.from({ length: 22 }, (_, i) => (
                    <rect key={i} x={50 - (2.6 + i * 0.12)} y={31 + i * 2.95} width={5.2 + i * 0.24} height={i < 5 ? 1.5 : i < 17 ? 2 : 2.6} rx="1" />
                  ))}
                </g>
              )}

              {visibleRegions.map((region) => {
                const pts = REGION_XY[view][region.id];
                if (!pts) return null;
                const sel = selections.get(region.id);
                const isSelected = !!sel;
                const isHovered = hovered === region.id;
                const intensity = sel?.intensity ?? "moderate";
                const config = INTENSITY_CONFIG[intensity];
                return (
                  <g
                    key={region.id}
                    className="cursor-pointer outline-none"
                    onClick={() => handleRegionClick(region.id)}
                    onPointerEnter={() => setHovered(region.id)}
                    onPointerLeave={() => setHovered(null)}
                    onTouchStart={() => handleRegionTouch(region.id)}
                    onKeyDown={(e) => handleRegionKeyDown(e, region.id)}
                    tabIndex={0}
                    role="button"
                    aria-label={`${region.label} — ${isSelected ? `selected (${intensity}) — click to change` : "click to select"}`}
                    aria-pressed={isSelected}
                  >
                    {pts.map(([x, y], i) => (
                      <g key={i}>
                        <circle cx={x} cy={y} r="4.5" fill="transparent" />
                        {(isHovered || isSelected) && (
                          <circle cx={x} cy={y} r={isSelected ? (intensity === "severe" ? 8 : intensity === "moderate" ? 6.5 : 5) : 5} fill="url(#pb-glow)" className={isSelected && intensity === "severe" ? "anim-throb" : ""} />
                        )}
                        {isSelected && <circle cx={x} cy={y} r="2.8" fill="none" stroke={config.stroke} strokeWidth="0.5" className="pain-ring" />}
                        <circle
                          cx={x}
                          cy={y}
                          r={isSelected ? 1.9 : isHovered ? 1.7 : 1.25}
                          fill={isSelected ? config.stroke : isHovered ? "#d9365a" : "#7a4fcf"}
                          stroke="#fff"
                          strokeWidth="0.5"
                          className={isSelected || isHovered ? "" : "idle-dot"}
                        />
                      </g>
                    ))}
                  </g>
                );
              })}
            </svg>

            {/* front / back */}
            <div className="mt-3 flex justify-center">
              <div className="inline-flex rounded-full bg-white p-1 ring-1 ring-[var(--hairline)]">
                {(["front", "back"] as const).map((v) => (
                  <button key={v} type="button" onClick={() => setView(v)} aria-pressed={view === v}
                    className={`h-8 px-4 rounded-full text-sm font-medium transition-colors ${view === v ? "bg-[var(--purple)] text-white" : "text-[var(--grey)] hover:text-[var(--ink)]"}`}>
                    {v === "front" ? "Front" : "Back"}
                  </button>
                ))}
              </div>
            </div>

            {selectedIdsFromMap.length > 0 && (
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[var(--purple)] text-white text-xs font-semibold z-20 pop" key={selectedIdsFromMap.length}>
                {selectedIdsFromMap.length} selected
              </div>
            )}
          </div>

          <p className="text-center text-xs text-[var(--color-text-muted)] mt-3">
            Hover to preview, tap to select and pinpoint the exact spot. Switch between front and back.
          </p>
        </div>

        {/* ─── Selection Panel (Desktop) ──────────────────── */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-white ring-1 ring-[var(--hairline)] rounded-[1.75rem] p-6 shadow-[var(--shadow-md)]">
            <h3 className="text-lg font-semibold text-[var(--ink)] mb-4">
              Pain Zones
            </h3>

            {selectedIdsFromMap.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[var(--color-surface-200)] flex items-center justify-center">
                  <svg className="w-6 h-6 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {t("painNav.noRegions")}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedIdsFromMap.map((id) => {
                  const sel = selections.get(id);
                  if (!sel) return null;
                  const config = INTENSITY_CONFIG[sel.intensity];

                  return (
                    <div
                      key={id}
                      className="bg-white border border-[var(--color-surface-200)] rounded-lg p-3 animate-fade-in"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                          {sel.label}
                        </span>
                        <button
                          onClick={() => removeSelection(id)}
                          className="w-6 h-6 rounded-full bg-red-100 text-red-600 text-xs flex items-center justify-center hover:bg-red-200 transition-colors"
                          aria-label={`Remove ${sel.label}`}
                        >
                          ×
                        </button>
                      </div>

                      {/* Placed pain pins */}
                      {regionPins.has(id) && regionPins.get(id)!.length > 0 && (
                        <div className="mb-2">
                          <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Pain Points</p>
                          <div className="flex flex-wrap gap-1">
                            {regionPins.get(id)!.map((pin) => (
                              <span
                                key={pin.anchor.id}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-[10px] font-medium border border-red-200"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                {pin.anchor.label}
                              </span>
                            ))}
                          </div>
                          <button
                            onClick={() => setZoomRegion(id)}
                            className="mt-1 text-[10px] text-[var(--color-clinical-600)] hover:underline"
                          >
                            Edit pain points
                          </button>
                        </div>
                      )}

                      {/* Intensity selector */}
                      <div className="flex gap-1.5" role="radiogroup" aria-label={`Pain intensity for ${sel.label}`}>
                        {(["mild", "moderate", "severe"] as PainIntensity[]).map((level) => (
                          <button
                            key={level}
                            onClick={() => updateIntensity(id, level)}
                            className={`flex-1 px-2 py-1.5 rounded-md text-xs font-medium transition-all ${
                              sel.intensity === level
                                ? level === "mild"
                                  ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                                  : level === "moderate"
                                  ? "bg-orange-100 text-orange-700 border border-orange-300"
                                  : "bg-red-100 text-red-700 border border-red-300"
                                : "bg-[var(--color-surface-100)] text-[var(--color-text-muted)] border border-transparent hover:bg-[var(--color-surface-200)]"
                            }`}
                            role="radio"
                            aria-checked={sel.intensity === level}
                            aria-label={`${INTENSITY_CONFIG[level].label} pain`}
                          >
                            {INTENSITY_CONFIG[level].label}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ── Intensity legend ── */}
            {selectedIdsFromMap.length > 0 && (
              <div className="mt-4 pt-3 border-t border-[var(--color-surface-200)]">
                <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-2 font-semibold">
                  Intensity Guide
                </p>
                <div className="flex gap-2">
                  {(["mild", "moderate", "severe"] as PainIntensity[]).map((level) => (
                    <div key={level} className="flex items-center gap-1">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: INTENSITY_CONFIG[level].stroke }}
                      />
                      <span className="text-[10px] text-[var(--color-text-muted)]">
                        {INTENSITY_CONFIG[level].label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── How it works ── */}
          <div className="mt-4 p-5 bg-[var(--mist)] rounded-[1.5rem]">
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              <strong>{t("painNav.howItWorks")}</strong> {t("painNav.howItWorksDesc")}
            </p>
          </div>
        </div>
      </div>

      {/* ─── Zoom Panel (when a region is clicked) ────────── */}
      {zoomRegion && (
        <BodyRegionZoom
          regionId={zoomRegion}
          onClose={handleZoomClose}
          onConfirm={handleZoomConfirm}
        />
      )}

      {/* ─── Mobile Bottom Sheet ───────────────────────────── */}
      {showMobileSheet && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Select pain intensity">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 animate-fade-in"
            onClick={() => setShowMobileSheet(null)}
          />
          {/* Sheet */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 pb-8 animate-slide-up shadow-2xl">
            <div className="w-10 h-1 bg-[var(--color-surface-300)] rounded-full mx-auto mb-4" />
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">
              {visibleRegions.find((r) => r.id === showMobileSheet)?.label}
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-5">
              How severe is the discomfort?
            </p>

            <div className="space-y-2.5 mb-6">
              {(["mild", "moderate", "severe"] as PainIntensity[]).map((level) => (
                <button
                  key={level}
                  onClick={() => {
                    setActiveIntensity(level);
                  }}
                  className={`w-full px-4 py-3.5 rounded-xl text-left font-medium transition-all border-2 ${
                    activeIntensity === level
                      ? level === "mild"
                        ? "border-yellow-400 bg-yellow-50 text-yellow-700"
                        : level === "moderate"
                        ? "border-orange-400 bg-orange-50 text-orange-700"
                        : "border-red-400 bg-red-50 text-red-700"
                      : "border-[var(--color-surface-200)] bg-white text-[var(--color-text-primary)] hover:border-[var(--color-surface-300)]"
                  }`}
                >
                  <span className="font-semibold">{INTENSITY_CONFIG[level].label}</span>
                  <span className="text-xs text-[var(--color-text-muted)] ml-2">
                    {level === "mild"
                      ? "Barely noticeable"
                      : level === "moderate"
                      ? "Interferes with activities"
                      : "Significantly limiting"}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowMobileSheet(null)}
                className="flex-1 px-4 py-3 rounded-xl border border-[var(--color-surface-300)] text-[var(--color-text-secondary)] font-semibold hover:bg-[var(--color-surface-100)]"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmMobileSelection(showMobileSheet)}
                className="flex-1 px-4 py-3 rounded-xl bg-[var(--color-clinical-600)] text-white font-semibold hover:bg-[var(--color-clinical-700)] transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
