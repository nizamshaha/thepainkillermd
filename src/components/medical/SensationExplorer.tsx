"use client";

import { useState, useCallback } from "react";
import { painSensations } from "@/data/sensations";
import type { PainSensation } from "@/lib/types";

// Pathway legend
const pathwayInfo = {
  nociceptive: {
    label: "Nociceptive",
    color: "var(--color-pathway-nociceptive)",
    description: "Pain from activation of pain receptors in tissues (bones, joints, muscles, skin).",
  },
  neuropathic: {
    label: "Neuropathic",
    color: "var(--color-pathway-neuropathic)",
    description: "Pain arising from damage to or dysfunction of the nervous system itself.",
  },
  nociplastic: {
    label: "Nociplastic",
    color: "var(--color-pathway-nociplastic)",
    description: "Pain from altered nociception without evidence of tissue damage or nerve lesion.",
  },
};

// Sensation card
function SensationCard({
  sensation,
  isSelected,
  onClick,
}: {
  sensation: PainSensation;
  isSelected: boolean;
  onClick: () => void;
}) {
  const pathway = pathwayInfo[sensation.pathway];
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-2xl transition-[box-shadow,background-color] flex gap-3.5 items-start ${
        isSelected
          ? "bg-white ring-2 ring-[var(--ink)] shadow-[var(--shadow-md)]"
          : "bg-white ring-1 ring-[var(--line)] hover:ring-[var(--color-primary-300)]"
      }`}
      aria-expanded={isSelected}
    >
      <span className="shrink-0 h-10 w-10 rounded-xl bg-[var(--panel)] flex items-center justify-center text-xl" role="img" aria-hidden="true">
        {sensation.icon}
      </span>
      <span className="min-w-0">
        <span className="block font-semibold text-[var(--ink)] leading-snug">{sensation.label}</span>
        <span className="mt-0.5 flex items-center gap-1.5 text-xs font-medium" style={{ color: pathway.color }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: pathway.color }} />
          {pathway.label}
        </span>
        <span className="mt-1.5 block text-sm text-[var(--color-text-secondary)] line-clamp-2">{sensation.description}</span>
      </span>
    </button>
  );
}

// Detail panel
function SensationDetail({ sensation }: { sensation: PainSensation }) {
  const pathway = pathwayInfo[sensation.pathway];
  return (
    <div className="animate-slide-up bg-white rounded-xl border border-[var(--color-surface-300)] p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{sensation.icon}</span>
        <div>
          <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
            {sensation.label}
          </h3>
          <span
            className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full mt-1"
            style={{
              background: `color-mix(in srgb, ${pathway.color} 10%, white)`,
              color: pathway.color,
              border: `1px solid color-mix(in srgb, ${pathway.color} 30%, white)`,
            }}
          >
            {pathway.label} Pathway
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="mb-5">
        <h4 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
          Description
        </h4>
        <p className="text-[var(--color-text-secondary)] leading-relaxed">
          {sensation.description}
        </p>
      </div>

      {/* Mechanism */}
      <div className="mb-5 p-4 rounded-lg bg-[var(--color-surface-50)] border border-[var(--color-surface-200)]">
        <h4 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
          Neurobiological Mechanism
        </h4>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
          {sensation.mechanism}
        </p>
      </div>

      {/* Associated Conditions */}
      <div className="mb-5">
        <h4 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
          Commonly Associated Conditions
        </h4>
        <div className="flex flex-wrap gap-2">
          {sensation.associatedConditions.map((c) => (
            <span
              key={c}
              className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary-700)] border border-[var(--color-primary-200)]"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Clinical Notes */}
      <div className="p-4 rounded-lg bg-[var(--color-surface-100)] border-l-4 border-[var(--color-clinical-500)]">
        <h4 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">
          Clinical Notes
        </h4>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed italic">
          {sensation.clinicalNotes}
        </p>
      </div>
    </div>
  );
}

export default function SensationExplorer() {
  const [selected, setSelected] = useState<string | null>(null);
  const [filterPathway, setFilterPathway] = useState<string | null>(null);

  const filteredSensations = filterPathway
    ? painSensations.filter((s) => s.pathway === filterPathway)
    : painSensations;

  const selectedSensation = selected
    ? painSensations.find((s) => s.id === selected)
    : null;

  const handleSelect = useCallback((id: string) => {
    setSelected((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section
      id="sensation-explorer"
      className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface-50)]"
      aria-labelledby="sensation-title"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="section-head">
          <h2
            id="sensation-title"
            className="text-[var(--color-text-primary)] mb-4"
          >
            What Does Your Pain Feel Like?
          </h2>
          <p className="">
            Explore different pain qualities and understand their neurobiological mechanisms.
          </p>
        </div>

        {/* Pathway Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setFilterPathway(null)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              !filterPathway
                ? "bg-[var(--color-primary-900)] text-white"
                : "bg-white ring-1 ring-inset ring-[var(--line)] text-[var(--color-text-secondary)] hover:text-[var(--ink)]"
            }`}
          >
            All Qualities
          </button>
          {(Object.keys(pathwayInfo) as Array<keyof typeof pathwayInfo>).map((key) => (
            <button
              key={key}
              onClick={() => setFilterPathway(filterPathway === key ? null : key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                filterPathway === key
                  ? "text-white"
                  : "bg-white text-[var(--color-text-secondary)] hover:shadow-md"
              }`}
              style={
                filterPathway === key
                  ? { background: pathwayInfo[key].color, borderColor: pathwayInfo[key].color }
                  : { borderColor: `color-mix(in srgb, ${pathwayInfo[key].color} 35%, white)` }
              }
            >
              {pathwayInfo[key].label}
            </button>
          ))}
        </div>

        {/* Pathway Legend */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {(Object.entries(pathwayInfo) as Array<[string, typeof pathwayInfo[keyof typeof pathwayInfo]]>).map(
            ([key, info]) => (
              <div
                key={key}
                className="pl-4 border-l-2 border-[var(--line)]"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: info.color }}
                  />
                  <span className="font-semibold text-sm text-[var(--color-text-primary)]">
                    {info.label} Pain
                  </span>
                </div>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {info.description}
                </p>
              </div>
            )
          )}
        </div>

        {/* Sensation Grid + Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Grid of sensation cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
            {filteredSensations.map((s) => (
              <SensationCard
                key={s.id}
                sensation={s}
                isSelected={selected === s.id}
                onClick={() => handleSelect(s.id)}
              />
            ))}
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-3">
            {selectedSensation ? (
              <SensationDetail sensation={selectedSensation} />
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 rounded-[1.5rem] bg-[var(--panel)]">
                
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                  Select a Pain Quality
                </h3>
                <p className="text-[var(--color-text-secondary)] max-w-sm">
                  Click on any pain quality card to explore its description,
                  neurobiological mechanism, and associated conditions.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
