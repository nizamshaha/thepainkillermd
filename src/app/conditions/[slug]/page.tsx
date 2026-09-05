"use client";

import { use } from "react";
import { conditions, getConditionBySlug } from "@/data/conditions";
import { procedures } from "@/data/procedures";
import { medications } from "@/data/medications";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PhysicianAvatar from "@/components/ui/PhysicianAvatar";
import ConditionFAQ from "./ConditionFAQ";
import RelatedContent from "./RelatedContent";
import { useT } from "@/lib/useT";
import { notFound } from "next/navigation";
import { validateSlug } from "@/lib/security";

// Generate static params for all conditions
export default function ConditionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const validSlug = validateSlug(slug);
  const t = useT();
  if (!validSlug) notFound();

  const condition = getConditionBySlug(validSlug);
  if (!condition) notFound();

  const conditionProcedures = procedures.filter((p) => condition.procedures.includes(p.slug));
  const conditionMedications = medications.filter((m) => condition.medications.includes(m.id));
  const relatedConditions = conditions.filter((c) => condition.relatedConditions.includes(c.slug));

  const severityColors: Record<string, string> = {
    mild: "bg-green-100 text-green-800 border-green-200",
    moderate: "bg-yellow-100 text-yellow-800 border-yellow-200",
    severe: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <>
      <Breadcrumbs items={[
        { label: t("nav.conditions"), href: "/conditions" },
        { label: condition.name },
      ]} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--color-primary-900)] to-[var(--color-primary-700)] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${severityColors[condition.severity]}`}>
              {t(`condition.${condition.severity}Severity`)} — {t("condition.severity")}
            </span>
            <span className="text-xs text-white/50 uppercase tracking-wider">{condition.category}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{condition.name}</h1>
          <p className="text-lg text-white/80 leading-relaxed">{condition.overview}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Symptoms */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">{t("condition.symptoms")}</h2>
          <ul className="space-y-2">
            {condition.symptoms.map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-[var(--color-clinical-500)] flex-shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </section>

        {/* Causes */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">{t("condition.causes")}</h2>
          <ul className="space-y-2">
            {condition.causes.map((c, i) => (
              <li key={i} className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-[var(--color-pathway-nociceptive)] flex-shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </section>

        {/* Diagnosis */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">{t("condition.diagnosis")}</h2>
          <p className="text-[var(--color-text-secondary)] mb-3">{t("condition.diagnosisDesc")}</p>
          <ul className="space-y-2">
            {condition.diagnosis.map((d, i) => (
              <li key={i} className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-[var(--color-medical-500)] flex-shrink-0" />
                {d}
              </li>
            ))}
          </ul>
        </section>

        {/* Treatment */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">{t("condition.treatment")}</h2>
          <div className="space-y-3">
            {condition.treatmentOptions.map((treatment, i) => (
              <div key={i} className="p-4 rounded-lg bg-[var(--color-surface-50)] border border-[var(--color-surface-200)] text-[var(--color-text-secondary)]">
                {treatment}
              </div>
            ))}
          </div>
        </section>

        {/* Related Procedures */}
        {conditionProcedures.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">{t("condition.relatedProcedures")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {conditionProcedures.map((p) => (
                <a key={p.slug} href={`/procedures/${p.slug}`} className="p-4 rounded-lg border border-[var(--color-surface-200)] hover:border-[var(--color-clinical-300)] hover:shadow-md transition-all">
                  <h3 className="font-semibold text-[var(--color-text-primary)]">{p.name}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1 line-clamp-2">{p.description}</p>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Related Medications */}
        {conditionMedications.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">{t("condition.relatedMedications")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {conditionMedications.map((m) => (
                <a key={m.slug} href={`/medications/${m.slug}`} className="p-4 rounded-lg border border-[var(--color-surface-200)] hover:border-[var(--color-clinical-300)] hover:shadow-md transition-all">
                  <h3 className="font-semibold text-[var(--color-text-primary)]">{m.name}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1 line-clamp-2">{m.mechanism}</p>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Red Flags */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--color-alert-critical)] mb-4 flex items-center gap-2">
            <span>🚨</span> {t("condition.redFlags")}
          </h2>
          <div className="p-5 rounded-xl bg-red-50 border-2 border-red-200">
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">{t("condition.redFlagsDesc")}</p>
            <ul className="space-y-2">
              {condition.redFlags.map((rf, i) => (
                <li key={i} className="flex items-start gap-2 text-sm font-medium text-red-800">
                  <span className="mt-0.5">⚠️</span> {rf}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        {condition.faq.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">{t("condition.faq")}</h2>
            <ConditionFAQ items={condition.faq} />
          </section>
        )}

        {/* Related Conditions */}
        {relatedConditions.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">{t("condition.relatedConditions")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedConditions.map((c) => (
                <a key={c.slug} href={`/conditions/${c.slug}`} className="p-4 rounded-lg border border-[var(--color-surface-200)] hover:border-[var(--color-clinical-300)] hover:shadow-md transition-all">
                  <h3 className="font-semibold text-[var(--color-text-primary)]">{c.name}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1 line-clamp-2">{c.overview}</p>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* You May Also Want to Understand */}
        <RelatedContent currentCondition={condition} />

        {/* Physician Info & CTA */}
        <section className="mb-10 p-6 rounded-xl bg-[var(--color-surface-50)] border border-[var(--color-surface-200)]">
          <div className="flex items-start gap-4">
            <PhysicianAvatar size="lg" />
            <div>
              <h3 className="font-bold text-[var(--color-text-primary)]">Dr. Shahnawaz F Shah</h3>
              <p className="text-sm text-[var(--color-clinical-600)] mb-2">{t("doctor.specialty")}</p>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                {t("condition.drSpecializes")} <strong>{condition.name.toLowerCase()}</strong> {t("condition.evidenceBased")}
              </p>
              <a href="/clinic#book" className="inline-flex items-center px-5 py-2.5 rounded-full bg-[var(--color-clinical-600)] text-white text-sm font-semibold hover:bg-[var(--color-clinical-700)] transition-colors">
                {t("hero.cta.primary")}
              </a>
            </div>
          </div>
        </section>

        {/* Medical Disclaimer */}
        <div className="text-xs text-[var(--color-text-muted)] leading-relaxed border-t border-[var(--color-surface-200)] pt-6">
          <strong>{t("condition.disclaimer")}:</strong> {t("condition.disclaimerFull")}
        </div>
      </div>
    </>
  );
}
