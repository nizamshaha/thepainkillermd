"use client";

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
      <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
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
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={`Pain mapping for ${region.label}`}>
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-[#0f172a] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-white/10 animate-fade-in">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#0f172a]/95 backdrop-blur-sm border-b border-white/10 px-5 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">{region.label}</h2>
            <p className="text-xs text-white/50 mt-0.5">
              {pins.length === 0 ? t("zoom.tapBelow") : `${pins.length} ${t("zoom.painPointsMarked")}`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 text-white/70 hover:bg-white/20 flex items-center justify-center transition-colors text-lg"
            aria-label={t("zoom.close")}
          >
            ×
          </button>
        </div>

        {/* SVG Detail View */}
        <div className="p-5">
          <div className="bg-[#1a2332] rounded-xl p-4 border border-white/5 relative">
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
                  fill={path.fill}
                  stroke={path.stroke}
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
                        ✓
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
                          fill="rgba(15,23,42,0.95)"
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
                      ✕
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
              className={`absolute bottom-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                customPinMode
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                  : "bg-white/10 text-white/60 hover:bg-white/20"
              }`}
            >
              {customPinMode ? `✕ ${t("zoom.cancel")}` : t("zoom.customPin")}
            </button>
          </div>

          {/* Predefined anchor list (alternative to SVG tapping) */}
          <div className="mt-4">
            <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-2">{t("zoom.quickSelect")}</p>
            <div className="flex flex-wrap gap-1.5">
              {region.pinAnchors.map((anchor) => {
                const isPinned = pins.some((p) => p.anchor.id === anchor.id);
                return (
                  <button
                    key={anchor.id}
                    onClick={() => togglePin(anchor)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all border ${
                      isPinned
                        ? "bg-red-600/20 text-red-300 border-red-500/40"
                        : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10 hover:text-white/70"
                    }`}
                  >
                    {isPinned && "✓ "}
                    {anchor.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes field */}
          <div className="mt-4">
            <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-2">{t("zoom.notesOptional")}</p>
            <textarea
              value={pinNotes}
              onChange={(e) => setPinNotes(e.target.value)}
              placeholder={t("zoom.notesPlaceholder")}
              rows={2}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-red-500/50 resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#0f172a]/95 backdrop-blur-sm border-t border-white/10 px-5 py-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-white/20 text-white/60 font-semibold text-sm hover:bg-white/5 transition-colors"
          >
            {t("zoom.cancel")}
          </button>
          <div className="flex items-center gap-3">
            {pins.length > 0 && (
              <button
                onClick={() => setPins([])}
                className="px-4 py-2.5 rounded-xl text-red-400 text-sm font-medium hover:bg-red-400/10 transition-colors"
              >
                {t("zoom.clearAll")}
              </button>
            )}
            <button
              onClick={() => onConfirm(regionId, pins)}
              className="px-6 py-2.5 rounded-xl bg-[var(--color-clinical-600)] text-white font-semibold text-sm hover:bg-[var(--color-clinical-700)] transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
