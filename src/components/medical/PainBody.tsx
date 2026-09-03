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
      {/* ─── View Toggle ──────────────────────────────────── */}
      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={() => setView("front")}
          className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
            view === "front"
              ? "bg-[var(--color-primary-700)] text-white shadow-lg shadow-[var(--color-primary-700)]/25"
              : "bg-[var(--color-surface-200)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-300)]"
          }`}
          aria-pressed={view === "front"}
        >
          {t("body.frontView")}
        </button>
        <button
          onClick={() => setView("back")}
          className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
            view === "back"
              ? "bg-[var(--color-primary-700)] text-white shadow-lg shadow-[var(--color-primary-700)]/25"
              : "bg-[var(--color-surface-200)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-300)]"
          }`}
          aria-pressed={view === "back"}
        >
          {t("body.backView")}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* ─── SVG Body Container ─────────────────────────── */}
        <div className="flex-1 w-full">
          <div
            ref={containerRef}
            className="body-glow-container relative bg-gradient-to-b from-[var(--color-primary-900)] via-[#0f1d32] to-[var(--color-primary-800)] rounded-2xl p-4 sm:p-6 overflow-hidden"
            onPointerMove={handlePointerMove}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            style={{ "--pointer-x": "50%", "--pointer-y": "50%" } as React.CSSProperties}
          >
            {/* Cursor glow effect */}
            <div
              ref={glowRef}
              className="body-cursor-glow pointer-events-none absolute inset-0 z-0"
              style={{ opacity: 0 }}
              aria-hidden="true"
            />

            <svg
              ref={svgRef}
              viewBox="0 0 200 500"
              className="relative z-10 w-full max-h-[520px] mx-auto select-none"
              role="img"
              aria-label="Interactive body map — click a region to select your pain area"
            >
              <title>Interactive Pain Navigator Body Map</title>

              <defs>
                <filter id="glow-hover">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="glow-selected">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id="body-base" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2d3a4d" />
                  <stop offset="100%" stopColor="#1a2332" />
                </linearGradient>
              </defs>

              {/* ── Body outline silhouette ── */}
              <path
                d={BODY_OUTLINE_FRONT}
                fill="url(#body-base)"
                stroke="#3b4d65"
                strokeWidth="1.2"
                opacity="0.3"
                className="pointer-events-none"
              />

              {/* ── Interactive regions ── */}
              {visibleRegions.map((region) => {
                const sel = selections.get(region.id);
                const isSelected = !!sel;
                const isHovered = hovered === region.id;
                const intensity = sel?.intensity ?? "moderate";
                const config = INTENSITY_CONFIG[intensity];

                let fillColor: string;
                let strokeColor: string;
                let filterVal: string;

                if (isSelected) {
                  fillColor = config.fill;
                  strokeColor = config.stroke;
                  filterVal = `drop-shadow(${config.glow})`;
                } else if (isHovered) {
                  fillColor = "rgba(239, 68, 68, 0.35)";
                  strokeColor = "#ef4444";
                  filterVal = "drop-shadow(0 0 8px rgba(239,68,68,0.5))";
                } else {
                  fillColor = "rgba(51, 65, 85, 0.15)";
                  strokeColor = "rgba(71, 85, 105, 0.4)";
                  filterVal = "none";
                }

                return (
                  <path
                    key={region.id}
                    d={region.front}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1}
                    className="body-region cursor-pointer"
                    style={{
                      filter: filterVal,
                      transition: "fill 0.2s ease, stroke 0.2s ease, stroke-width 0.2s ease",
                      animation:
                        isSelected && intensity === "severe"
                          ? "pain-pulse 1.5s ease-in-out infinite"
                          : undefined,
                    }}
                    data-region={region.id}
                    data-label={region.label}
                    onClick={() => handleRegionClick(region.id)}
                    onPointerEnter={(e) =>
                      handleRegionPointerEnter(region.id, region.label, e)
                    }
                    onPointerMove={handleRegionPointerMove}
                    onPointerLeave={handleRegionPointerLeave}
                    onTouchStart={() => handleRegionTouch(region.id)}
                    onKeyDown={(e) => handleRegionKeyDown(e, region.id)}
                    tabIndex={0}
                    role="button"
                    aria-label={`${region.label} — ${
                      isSelected ? `selected (${intensity}) — click to deselect` : "click to select"
                    }`}
                    aria-pressed={isSelected}
                  />
                );
              })}

              {/* ── SVG Tooltip ── */}
              {tooltip && (
                <g className="pointer-events-none" aria-hidden="true">
                  <rect
                    x={Math.max(5, Math.min(140, tooltip.x - 30))}
                    y={tooltip.y - 4}
                    width="60"
                    height="14"
                    rx="3"
                    fill="rgba(15,23,42,0.95)"
                    stroke="rgba(71,85,105,0.5)"
                    strokeWidth="0.5"
                  />
                  <text
                    x={Math.max(35, Math.min(170, tooltip.x))}
                    y={tooltip.y + 7}
                    textAnchor="middle"
                    fill="#f1f5f9"
                    fontSize="5.5"
                    fontWeight="600"
                    fontFamily="system-ui, -apple-system, sans-serif"
                  >
                    {tooltip.label}
                  </text>
                </g>
              )}
            </svg>

            {/* ── Selection count badge ── */}
            {selectedIdsFromMap.length > 0 && (
              <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-red-600 text-white text-xs font-bold shadow-lg z-20 animate-fade-in">
                {selectedIdsFromMap.length} selected
              </div>
            )}
          </div>

          <p className="text-center text-xs text-[var(--color-text-muted)] mt-3">
            Hover to preview — body part glows red. Click to select and pinpoint exact pain location.
          </p>
        </div>

        {/* ─── Selection Panel (Desktop) ──────────────────── */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-[var(--color-surface-50)] border border-[var(--color-surface-200)] rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-4 uppercase tracking-wider">
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
          <div className="mt-4 p-4 bg-[var(--color-primary-50)] border border-[var(--color-primary-200)] rounded-xl">
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
