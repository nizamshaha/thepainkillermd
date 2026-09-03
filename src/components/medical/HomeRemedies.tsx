"use client";

import { getRemediesForArea, type Remedy } from "@/data/remedies";

interface Props {
  areaId: string;
  areaName: string;
}

export default function HomeRemedies({ areaId, areaName }: Props) {
  const data = getRemediesForArea(areaId);

  if (!data) return null;

  const evidenceColors: Record<string, { bg: string; text: string; label: string }> = {
    strong: { bg: "bg-green-100", text: "text-green-700", label: "Strong Evidence" },
    moderate: { bg: "bg-blue-100", text: "text-blue-700", label: "Moderate Evidence" },
    general: { bg: "bg-gray-100", text: "text-gray-600", label: "General Guidance" },
  };

  return (
    <section className="py-8">
      <div className="text-center mb-6">
        <p className="text-sm font-semibold text-[var(--color-medical-600)] uppercase tracking-wider mb-2">
          🏠 Home & Self-Care
        </p>
        <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
          What You Can Try at Home
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] max-w-xl mx-auto">
          General self-care strategies for {areaName.toLowerCase()}. These are educational
          and not a substitute for professional medical advice.
        </p>
      </div>

      {/* General Advice */}
      <div className="mb-6 p-5 rounded-xl bg-[var(--color-primary-50)] border border-[var(--color-primary-200)]">
        <h4 className="font-bold text-[var(--color-text-primary)] mb-3 text-sm uppercase tracking-wider">
          General Advice
        </h4>
        <ul className="space-y-2">
          {data.generalAdvice.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-medical-500)] flex-shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Remedies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {data.remedies.map((remedy) => {
          const ev = evidenceColors[remedy.evidence];
          return (
            <div
              key={remedy.id}
              className="p-5 rounded-xl border border-[var(--color-surface-200)] bg-white hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">{remedy.icon}</span>
                <div className="flex-1">
                  <h4 className="font-bold text-[var(--color-text-primary)] text-sm mb-1">
                    {remedy.title}
                  </h4>
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${ev.bg} ${ev.text}`}>
                    {ev.label}
                  </span>
                </div>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                {remedy.description}
              </p>
              {remedy.caution && (
                <p className="mt-2 text-[11px] text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
                  ⚠️ {remedy.caution}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* When to Avoid */}
      {data.whenToAvoid.length > 0 && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
          <h4 className="font-bold text-amber-800 text-sm mb-2">⚠️ What to Avoid</h4>
          <ul className="space-y-1">
            {data.whenToAvoid.map((item, i) => (
              <li key={i} className="text-xs text-amber-700 flex items-start gap-2">
                <span className="text-amber-500">✕</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Disclaimer */}
      <p className="mt-6 text-xs text-[var(--color-text-muted)] text-center italic">
        Speak with your doctor or pharmacist about whether any specific treatment is appropriate for you.
        These are general educational recommendations and not personalized medical advice.
      </p>
    </section>
  );
}
