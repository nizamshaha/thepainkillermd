"use client";

import type { PainArea } from "@/data/painAreas";
import { useT } from "@/lib/useT";

interface Props {
  areas: PainArea[];
  onBack: () => void;
  onStartQuestionnaire: () => void;
}

export default function PainDetailPanel({ areas, onBack, onStartQuestionnaire }: Props) {
  const t = useT();
  const area = areas[0]; // Primary area for detail view

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-[var(--color-clinical-600)] font-medium mb-6 hover:text-[var(--color-clinical-700)]">
        ← {t("painNav.bodyMap")}
      </button>

      {/* Selected areas badge */}
      {areas.length > 1 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {areas.map((a) => (
            <span key={a.id} className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-primary-50)] text-[var(--color-primary-700)] border border-[var(--color-primary-200)]">
              {a.icon} {a.name}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <div className="mb-8">
        <span className="text-3xl mb-2 block">{area.icon}</span>
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">{area.name}</h2>
        <p className="text-lg text-[var(--color-text-secondary)]">{area.description}</p>
      </div>

      {/* What is it? */}
      <Section title="What is it?">
        <p>{area.description}</p>
      </Section>

      {/* Common Possible Causes */}
      <Section title={t("painDetail.causes")} accent="text-[var(--color-pathway-nociceptive)]">
        <p className="text-sm text-[var(--color-text-muted)] italic mb-2">Some common possible causes include:</p>
        <ul className="space-y-1.5">
          {area.commonCauses.map((c, i) => (
            <li key={i} className="flex items-start gap-2 text-[var(--color-text-secondary)]">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-pathway-nociceptive)] flex-shrink-0" />
              {c}
            </li>
          ))}
        </ul>
      </Section>

      {/* Common Symptoms */}
      <Section title={t("painDetail.symptoms")}>
        <ul className="space-y-1.5">
          {area.symptoms.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-[var(--color-text-secondary)]">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-clinical-500)] flex-shrink-0" />
              {s}
            </li>
          ))}
        </ul>
      </Section>

      {/* What Makes It Worse */}
      <Section title={t("painDetail.aggravating")}>
        <ul className="space-y-1.5">
          {area.aggravatingFactors.map((a, i) => (
            <li key={i} className="flex items-start gap-2 text-[var(--color-text-secondary)]">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-alert-warning)] flex-shrink-0" />
              {a}
            </li>
          ))}
        </ul>
      </Section>

      {/* Self-Care */}
      <Section title={t("painDetail.selfCare")} accent="text-[var(--color-medical-700)]">
        <ul className="space-y-1.5">
          {area.selfCare.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-[var(--color-text-secondary)]">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-medical-500)] flex-shrink-0" />
              {s}
            </li>
          ))}
        </ul>
        <p className="text-xs text-[var(--color-text-muted)] mt-3 italic">
          Speak with your doctor or pharmacist about whether medication is appropriate for you.
        </p>
      </Section>

      {/* Red Flags */}
      <div className="mb-8 p-5 rounded-xl bg-red-50 border-2 border-red-200">
        <h3 className="text-lg font-bold text-[var(--color-alert-critical)] mb-3">🚨 Warning Signs</h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-2">
          Seek urgent medical evaluation if you experience any of the following:
        </p>
        <ul className="space-y-1.5">
          {area.redFlags.map((rf, i) => (
            <li key={i} className="flex items-start gap-2 text-sm font-medium text-red-800">
              <span>⚠️</span> {rf}
            </li>
          ))}
        </ul>
      </div>

      {/* When to Consult */}
      <Section title={t("painDetail.whenToConsult")}>
        <ul className="space-y-1.5">
          {area.whenToConsult.map((w, i) => (
            <li key={i} className="flex items-start gap-2 text-[var(--color-text-secondary)]">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-clinical-500)] flex-shrink-0" />
              {w}
            </li>
          ))}
        </ul>
      </Section>

      {/* How a Pain Physician May Help */}
      <Section title={t("painDetail.physician")}>
        <p className="text-[var(--color-text-secondary)] mb-3">
          A pain physician can provide a comprehensive assessment including:
        </p>
        <ul className="space-y-1.5 mb-4">
          {area.physicianAssessment.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-[var(--color-text-secondary)]">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-clinical-500)] flex-shrink-0" />
              {p}
            </li>
          ))}
        </ul>
        <p className="text-[var(--color-text-secondary)] mb-3">Treatment depends on the cause, severity, examination findings and individual patient needs. Options may include:</p>
        <div className="flex flex-wrap gap-2">
          {area.treatmentOptions.map((t, i) => (
            <span key={i} className="px-2.5 py-1 text-xs font-medium rounded bg-[var(--color-surface-100)] text-[var(--color-text-secondary)] border border-[var(--color-surface-200)]">
              {t}
            </span>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      {area.faq.length > 0 && (
        <Section title={t("painDetail.faq")}>
          <div className="space-y-3">
            {area.faq.map((f, i) => (
              <div key={i} className="p-4 rounded-lg bg-[var(--color-surface-50)] border border-[var(--color-surface-200)]">
                <p className="font-semibold text-[var(--color-text-primary)] mb-1">{f.question}</p>
                <p className="text-sm text-[var(--color-text-secondary)]">{f.answer}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      <div className="mt-10 p-8 rounded-xl bg-gradient-to-br from-[var(--color-primary-900)] to-[var(--color-primary-700)] text-white text-center">
        <h3 className="text-xl font-bold mb-2">{t("painDetail.cta.title")}</h3>
        <p className="text-white/80 mb-1">Dr Shahnawaz F Shah</p>
        <p className="text-sm text-white/60 mb-6">Interventional Spine &amp; Pain Physician</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/clinic#book" className="px-6 py-3 rounded-full bg-white text-[var(--color-primary-900)] font-semibold hover:bg-[var(--color-surface-100)] transition-colors">
            {t("painDetail.cta.appointment")}
          </a>
          <a href="/clinic" className="px-6 py-3 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors">
            {t("painDetail.cta.contact")}
          </a>
          <button onClick={onStartQuestionnaire} className="px-6 py-3 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors">
            {t("painDetail.cta.explore")} →
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, accent, children }: { title: string; accent?: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h3 className={`text-xl font-bold mb-3 ${accent || "text-[var(--color-text-primary)]"}`}>{title}</h3>
      {children}
    </section>
  );
}
