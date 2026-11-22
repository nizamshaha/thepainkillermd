"use client";
import Glyph from "@/components/ui/Glyph";

import { useState, useCallback, useRef } from "react";
import { REGION_DETAILS, type RegionPin } from "@/data/bodyRegionDetails";
import { useT } from "@/lib/useT";

interface PlacedPin {
  anchor: RegionPin;
  customLabel?: string;
}

interface BodyRegionZoomProps {
  regionId: string;
  onClose: () => void;
  onConfirm: (regionId: string, pins: PlacedPin[]) => void;
}

export default function BodyRegionZoom({ regionId, onClose, onConfirm }: BodyRegionZoomProps) {
  const t = useT();
  const region = REGION_DETAILS[regionId];
  const [pins, setPins] = useState<PlacedPin[]>([]);
  const [hoveredAnchor, setHoveredAnchor] = useState<string | null>(null);
  const [customPinMode, setCustomPinMode] = useState(false);
  const [pinNotes, setPinNotes] = useState("");
  const svgRef = useRef<SVGSVGElement>(null);

  if (!region) {
    return (
      <div className="fixed inset-0 z-[90] bg-[rgba(23,15,44,0.45)] backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md">
          <p className="text-[var(--color-text-secondary)]">Detailed view not available for this region.</p>
          <button onClick={onClose} className="mt-4 px-6 py-2 rounded-lg bg-[var(--color-clinical-600)] text-white font-semibold">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const togglePin = useCallback((anchor: RegionPin) => {
    setPins((prev) => {
      const exists = prev.find((p) => p.anchor.id === anchor.id);
      if (exists) {
        return prev.filter((p) => p.anchor.id !== anchor.id);
      }
      return [...prev, { anchor }];
    });
  }, []);

  const addCustomPin = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!customPinMode) return;
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const viewBox = svg.viewBox.baseVal;
      const x = ((e.clientX - rect.left) / rect.width) * viewBox.width;
      const y = ((e.clientY - rect.top) / rect.height) * viewBox.height;

      const customAnchor: RegionPin = {
        id: `custom-${Date.now()}`,
        label: "Custom pain point",
        x: (x / viewBox.width) * 100,
        y: (y / viewBox.height) * 100,
      };
      setPins((prev) => [...prev, { anchor: customAnchor, customLabel: "Custom pain point" }]);
      setCustomPinMode(false);
    },
    [customPinMode]
  );

  return (
    <div className="fixed inset-0 z-[90] bg-[rgba(23,15,44,0.45)] backdrop-blur-md flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={`Pain mapping for ${region.label}`}>
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-white rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-[var(--shadow-xl)] step-in">
        {/* Header */}
        <div className="sticky top-0 z-10 frost border-b border-[var(--hairline)] px-5 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[var(--ink)]">{region.label}</h2>
            <p className="text-sm text-[var(--grey)] mt-0.5">
              {pins.length === 0 ? t("zoom.tapBelow") : `${pins.length} ${t("zoom.painPointsMarked")}`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[var(--mist)] text-[var(--ink)] hover:bg-[var(--lavender)] flex items-center justify-center transition-colors text-lg"
            aria-label={t("zoom.close")}
          >
            ×
          </button>
        </div>

        {/* SVG Detail View */}
        <div className="p-5">
          <div className="bg-[var(--mist)] rounded-[1.5rem] p-4 relative">
            <svg
              ref={svgRef}
              viewBox={region.viewBox}
              className={`w-full max-h-[350px] mx-auto select-none ${customPinMode ? "cursor-crosshair" : "cursor-default"}`}
              onClick={addCustomPin}
              role="img"
              aria-label={`Detailed view of ${region.label}`}
            >
              <title>{region.label} — Detailed View</title>

              {/* Anatomy paths */}
              {region.anatomyPaths.map((path, i) => (
                <path
                  key={i}
                  d={path.d}
                  fill={i === 0 ? "#f3eefc" : "#e7defa"}
                  stroke="#a892dc"
                  strokeWidth={(path as Record<string, unknown>).strokeWidth as number || 1.2}
                  className="pointer-events-none"
                />
              ))}

              {/* Pin anchors (interactive hotspots) */}
              {region.pinAnchors.map((anchor) => {
                const isPinned = pins.some((p) => p.anchor.id === anchor.id);
                const isHovered = hoveredAnchor === anchor.id;

                return (
                  <g
                    key={anchor.id}
                    className="cursor-pointer"
                    onClick={() => togglePin(anchor)}
                    onMouseEnter={() => setHoveredAnchor(anchor.id)}
                    onMouseLeave={() => setHoveredAnchor(null)}
                    role="button"
                    tabIndex={0}
                    aria-label={`${anchor.label}${isPinned ? " — marked as pain point" : " — tap to mark"}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        togglePin(anchor);
                      }
                    }}
                  >
                    {/* Hit area (larger invisible circle for easier tapping) */}
                    <circle
                      cx={`${anchor.x}%`}
                      cy={`${anchor.y}%`}
                      r="12"
                      fill="transparent"
                      className="cursor-pointer"
                    />

                    {/* Visible dot */}
                    <circle
                      cx={`${anchor.x}%`}
                      cy={`${anchor.y}%`}
                      r={isPinned ? "6" : isHovered ? "5" : "3.5"}
                      fill={isPinned ? "#ef4444" : isHovered ? "rgba(239,68,68,0.6)" : "rgba(239,68,68,0.35)"}
                      stroke={isPinned ? "#fca5a5" : isHovered ? "#ef4444" : "rgba(239,68,68,0.5)"}
                      strokeWidth={isPinned ? "2" : "1"}
                      style={{
                        filter: isPinned ? "drop-shadow(0 0 6px rgba(239,68,68,0.7))" : "none",
                        transition: "all 0.15s ease",
                      }}
                    />

                    {/* Pin icon for marked points */}
                    {isPinned && (
                      <text
                        x={`${anchor.x}%`}
                        y={`${anchor.y}%`}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="white"
                        fontSize="6"
                        fontWeight="bold"
                        className="pointer-events-none"
                      >
                        <Glyph e="✓" className="inline-block w-[1.1em] h-[1.1em] align-[-0.18em] mr-1" />
                      </text>
                    )}

                    {/* Label on hover */}
                    {isHovered && !isPinned && (
                      <g className="pointer-events-none">
                        <rect
                          x={`${Math.max(5, Math.min(85, anchor.x - 15))}%`}
                          y={`${anchor.y - 8}%`}
                          width="30%"
                          height="7%"
                          rx="3"
                          fill="rgba(29,27,38,0.92)"
                          stroke="rgba(239,68,68,0.3)"
                          strokeWidth="0.5"
                        />
                        <text
                          x={`${anchor.x}%`}
                          y={`${anchor.y - 4}%`}
                          textAnchor="middle"
                          fill="#fca5a5"
                          fontSize="4.5"
                          fontWeight="600"
                          fontFamily="system-ui, sans-serif"
                        >
                          {anchor.label}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Custom pins placed by user */}
              {pins
                .filter((p) => p.anchor.id.startsWith("custom-"))
                .map((pin) => (
                  <g key={pin.anchor.id}>
                    <circle
                      cx={`${pin.anchor.x}%`}
                      cy={`${pin.anchor.y}%`}
                      r="6"
                      fill="#ef4444"
                      stroke="#fca5a5"
                      strokeWidth="2"
                      style={{ filter: "drop-shadow(0 0 6px rgba(239,68,68,0.7))" }}
                    />
                    <text
                      x={`${pin.anchor.x}%`}
                      y={`${pin.anchor.y}%`}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="white"
                      fontSize="6"
                      fontWeight="bold"
                      className="pointer-events-none"
                    >
                      <Glyph e="✕" className="inline-block w-[1.1em] h-[1.1em] align-[-0.18em] mr-1" />
                    </text>
                  </g>
                ))}

              {/* Crosshair for custom pin mode */}
              {customPinMode && (
                <text x="50%" y="95%" textAnchor="middle" fill="#fca5a5" fontSize="5" fontFamily="system-ui, sans-serif" className="pointer-events-none">
                  {t("zoom.tapAnywhere")}
                </text>
              )}
            </svg>

            {/* Custom pin mode toggle */}
            <button
              onClick={() => setCustomPinMode(!customPinMode)}
              className={`absolute bottom-3 right-3 px-4 h-9 rounded-full text-sm font-medium transition-all ${
                customPinMode
                  ? "bg-[#c0283a] text-white"
                  : "bg-white text-[var(--purple-deep)] ring-1 ring-[var(--hairline)] hover:ring-[var(--lilac)]"
              }`}
            >
              {customPinMode ? `${t("zoom.cancel")}` : t("zoom.customPin")}
            </button>
          </div>

          {/* Predefined anchor list (alternative to SVG tapping) */}
          <div className="mt-4">
            <p className="text-sm text-[var(--ink)] font-semibold mb-2">{t("zoom.quickSelect")}</p>
            <div className="flex flex-wrap gap-1.5">
              {region.pinAnchors.map((anchor) => {
                const isPinned = pins.some((p) => p.anchor.id === anchor.id);
                return (
                  <button
                    key={anchor.id}
                    onClick={() => togglePin(anchor)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                      isPinned
                        ? "bg-[#fff0f2] text-[#b4233a] border-[#f6c3cb]"
                        : "bg-white text-[var(--grey)] border-[var(--hairline)] hover:text-[var(--ink)] hover:border-[var(--lilac)]"
                    }`}
                  >
                    {isPinned && ""}
                    {anchor.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes field */}
          <div className="mt-4">
            <p className="text-sm text-[var(--ink)] font-semibold mb-2">{t("zoom.notesOptional")}</p>
            <textarea
              value={pinNotes}
              onChange={(e) => setPinNotes(e.target.value)}
              placeholder={t("zoom.notesPlaceholder")}
              rows={2}
              className="w-full px-4 py-3 rounded-2xl bg-[var(--mist)] text-[var(--ink)] text-sm placeholder:text-[var(--grey)] focus:outline-none focus:ring-2 focus:ring-[var(--purple)] resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 frost border-t border-[var(--hairline)] px-5 py-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="glass-btn glass-clear border h-10 px-5 text-sm"
          >
            {t("zoom.cancel")}
          </button>
          <div className="flex items-center gap-3">
            {pins.length > 0 && (
              <button
                onClick={() => setPins([])}
                className="px-4 py-2.5 rounded-full text-[#c0283a] text-sm font-medium hover:bg-[#fff0f2] transition-colors"
              >
                {t("zoom.clearAll")}
              </button>
            )}
            <button
              onClick={() => onConfirm(regionId, pins)}
              className="glass-btn glass-purple h-10 px-6 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={pins.length === 0}
            >
              {pins.length > 0 ? `${t("zoom.confirm")} (${pins.length})` : t("zoom.skipNoPins")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
