"use client";

import type { PainIntensity, PainSelection } from "@/data/bodyRegions";

interface Body3DPanelProps {
  selections: Map<string, PainSelection>;
  activeIntensity: PainIntensity;
  onIntensityChange: (id: string, intensity: PainIntensity) => void;
  onRemove: (id: string) => void;
}

const INTENSITY_CONFIG: Record<PainIntensity, { bg: string; text: string; border: string; label: string; desc: string }> = {
  mild: { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-300", label: "Mild", desc: "Barely noticeable" },
  moderate: { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-300", label: "Moderate", desc: "Interferes with activities" },
  severe: { bg: "bg-red-100", text: "text-red-700", border: "border-red-300", label: "Severe", desc: "Significantly limiting" },
};

const INTENSITY_DOT_COLORS: Record<PainIntensity, string> = {
  mild: "#f59e0b",
  moderate: "#f97316",
  severe: "#ef4444",
};

export default function Body3DPanel({ selections, activeIntensity, onIntensityChange, onRemove }: Body3DPanelProps) {
  const selectedArray = Array.from(selections.values());

  return (
    <div className="w-full lg:w-80 flex-shrink-0">
      <div className="bg-[var(--color-surface-50)] border border-[var(--color-surface-200)] rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-4 uppercase tracking-wider">
          Pain Zones
        </h3>

        {selectedArray.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[var(--color-surface-200)] flex items-center justify-center">
              <svg className="w-6 h-6 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <p className="text-xs text-[var(--color-text-muted)]">
              Click or tap a body region to begin selecting pain areas.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {selectedArray.map((sel) => {
              const config = INTENSITY_CONFIG[sel.intensity];
              return (
                <div
                  key={sel.regionId}
                  className="bg-white border border-[var(--color-surface-200)] rounded-lg p-3 animate-fade-in"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                      {sel.label}
                    </span>
                    <button
                      onClick={() => onRemove(sel.regionId)}
                      className="w-6 h-6 rounded-full bg-red-100 text-red-600 text-xs flex items-center justify-center hover:bg-red-200 transition-colors"
                      aria-label={`Remove ${sel.label}`}
                    >
                      ×
                    </button>
                  </div>
                  <div className="flex gap-1.5" role="radiogroup" aria-label={`Pain intensity for ${sel.label}`}>
                    {(["mild", "moderate", "severe"] as PainIntensity[]).map((level) => (
                      <button
                        key={level}
                        onClick={() => onIntensityChange(sel.regionId, level)}
                        className={`flex-1 px-2 py-1.5 rounded-md text-xs font-medium transition-all ${
                          sel.intensity === level
                            ? `${INTENSITY_CONFIG[level].bg} ${INTENSITY_CONFIG[level].text} border ${INTENSITY_CONFIG[level].border}`
                            : "bg-[var(--color-surface-100)] text-[var(--color-text-muted)] border border-transparent hover:bg-[var(--color-surface-200)]"
                        }`}
                        role="radio"
                        aria-checked={sel.intensity === level}
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

        {selectedArray.length > 0 && (
          <div className="mt-4 pt-3 border-t border-[var(--color-surface-200)]">
            <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-2 font-semibold">
              Intensity Guide
            </p>
            <div className="flex gap-3">
              {(["mild", "moderate", "severe"] as PainIntensity[]).map((level) => (
                <div key={level} className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: INTENSITY_DOT_COLORS[level] }} />
                  <span className="text-[10px] text-[var(--color-text-muted)]">{INTENSITY_CONFIG[level].label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* How it works */}
      <div className="mt-4 p-4 bg-[var(--color-primary-50)] border border-[var(--color-primary-200)] rounded-xl">
        <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
          <strong>How it works:</strong> Drag to rotate the 3D body, scroll to zoom. Hover to preview regions, click to select. Choose pain intensity (Mild / Moderate / Severe). Multiple regions can be selected simultaneously.
        </p>
      </div>

      {/* Accessible region list (hidden on large screens, accessible to screen readers) */}
      <div className="mt-4" role="list" aria-label="Body regions">
        <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-2 font-semibold">
          Keyboard Navigation
        </p>
        <p className="text-xs text-[var(--color-text-secondary)]">
          Use Tab to navigate the 3D model. Press Enter or Space to select a region. Press Escape to close panels.
        </p>
      </div>
    </div>
  );
}
