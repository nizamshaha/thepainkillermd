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
      className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
        isSelected
          ? "border-[var(--color-clinical-500)] bg-white shadow-lg"
          : "border-[var(--color-surface-200)] bg-[var(--color-surface-50)] hover:border-[var(--color-clinical-300)] hover:shadow-md"
      }`}
      aria-expanded={isSelected}
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl" role="img" aria-hidden="true">
          {sensation.icon}
        </span>
        <div className="flex-1">
          <h3 className="font-bold text-[var(--color-text-primary)]">
            {sensation.label}
          </h3>
          <span
            className="inline-block px-2 py-0.5 text-xs font-semibold rounded-full mt-1"
            style={{
              background: `${pathway.color}15`,
              color: pathway.color,
              border: `1px solid ${pathway.color}40`,
            }}
          >
            {pathway.label}
          </span>
        </div>
      </div>
      <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">
        {sensation.description}
      </p>
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
              background: `${pathway.color}15`,
              color: pathway.color,
              border: `1px solid ${pathway.color}40`,
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
      className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface-50)]"
      aria-labelledby="sensation-title"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-[var(--color-clinical-600)] uppercase tracking-wider mb-2">
            03. Pain Qualities
          </p>
          <h2
            id="sensation-title"
            className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3"
          >
            What Does Your Pain Feel Like?
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Explore different pain qualities and understand their neurobiological mechanisms.
          </p>
        </div>

        {/* Pathway Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => setFilterPathway(null)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              !filterPathway
                ? "bg-[var(--color-primary-900)] text-white"
                : "bg-[var(--color-surface-200)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-300)]"
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
                  : { borderColor: `${pathwayInfo[key].color}40` }
              }
            >
              {pathwayInfo[key].label}
            </button>
          ))}
        </div>

        {/* Pathway Legend */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {(Object.entries(pathwayInfo) as Array<[string, typeof pathwayInfo[keyof typeof pathwayInfo]]>).map(
            ([key, info]) => (
              <div
                key={key}
                className="p-4 rounded-lg border border-[var(--color-surface-200)] bg-white"
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
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 rounded-xl border-2 border-dashed border-[var(--color-surface-300)]">
                <div className="text-4xl mb-4">🔍</div>
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
