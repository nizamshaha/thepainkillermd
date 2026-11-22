"use client";

import Glyph from "@/components/ui/Glyph";
import { use } from "react";
import { conditions, getConditionBySlug } from "@/data/conditions";
import { procedures } from "@/data/procedures";
import { medications } from "@/data/medications";
import LivePainFigure from "@/components/medical/LivePainFigure";
import SymptomChecker from "@/components/apple/SymptomChecker";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PhysicianAvatar from "@/components/ui/PhysicianAvatar";
import ConditionFAQ from "./ConditionFAQ";
import RelatedContent from "./RelatedContent";
import { useT } from "@/lib/useT";
import { notFound } from "next/navigation";
import { validateSlug, sanitizeJsonLd } from "@/lib/security";

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

  const conditionSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    name: condition.name,
    description: condition.overview,
    url: `https://thepainkillermd.in/conditions/${condition.slug}`,
    signOrSymptom: condition.symptoms.map((s) => ({
      "@type": "MedicalSignOrSymptom",
      name: s,
    })),
    possibleTreatment: condition.treatmentOptions.map((item) => ({
      "@type": "MedicalTherapy",
      name: item,
    })),
    riskFactor: condition.causes.map((c) => ({
      "@type": "MedicalRiskFactor",
      name: c,
    })),
    associatedAnatomy: {
      "@type": "AnatomicalStructure",
      name: condition.category,
    },
    recognizingAuthority: {
      "@type": "Organization",
      name: "Indian Academy of Pain Medicine (IAPM)",
    },
  };

  const faqSchema =
    condition.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: condition.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <>
      {/* Structured Data: MedicalCondition & FAQPage Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(conditionSchema),
        }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: sanitizeJsonLd(faqSchema),
          }}
        />
      )}

      <Breadcrumbs items={[
        { label: t("nav.conditions"), href: "/conditions" },
        { label: condition.name },
      ]} />

      {/* Hero */}
      <section className="page-stage text-white pt-16 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.3fr_0.7fr] gap-10 items-center">
          <div>
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${severityColors[condition.severity]}`}>
              {t(`condition.${condition.severity}Severity`)} — {t("condition.severity")}
            </span>
            <span className="text-xs text-white/50 uppercase tracking-wider">{condition.category}</span>
          </div>
          <h1 className="mb-4">{condition.name}</h1>
          <p className="text-lg text-white/80 leading-relaxed">{condition.overview}</p>
          </div>
          {condition.bodyRegions.length > 0 && (
            <div className="hero-portrait rounded-[1.75rem] bg-white/95 p-5 text-[var(--ink)]">
              <LivePainFigure
                regions={condition.bodyRegions}
                qualities={[condition.category === "nerve" || /sciatica|radiculopathy|neuralgia/.test(condition.slug) ? "shooting" : condition.category === "joint" ? "aching" : "throbbing"]}
                radiates={/sciatica|radiculopathy|stenosis/.test(condition.slug)}
                compact
              />
              <p className="mt-3 text-center text-sm text-[var(--grey)]">Where {condition.name.toLowerCase()} is usually felt</p>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Symptoms — interactive */}
        <section className="mb-12 reveal">
          <SymptomChecker title={t("condition.symptoms")} symptoms={condition.symptoms} conditionName={condition.name} />
        </section>

        {/* Causes */}
        <section className="mb-10 reveal">
          <h2 className="text-2xl text-[var(--color-text-primary)] mb-4">{t("condition.causes")}</h2>
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
        <section className="mb-10 reveal">
          <h2 className="text-2xl text-[var(--color-text-primary)] mb-4">{t("condition.diagnosis")}</h2>
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
        <section className="mb-10 reveal">
          <h2 className="text-2xl text-[var(--color-text-primary)] mb-4">{t("condition.treatment")}</h2>
          <div className="space-y-3">
            {condition.treatmentOptions.map((treatment, i) => (
              <div key={i} className="p-4 rounded-[1.5rem] bg-[var(--mist)] ring-1 ring-[var(--hairline)] text-[var(--color-text-secondary)] reveal">
                {treatment}
              </div>
            ))}
          </div>
        </section>

        {/* Related Procedures */}
        {conditionProcedures.length > 0 && (
          <section className="mb-10 reveal">
            <h2 className="text-2xl text-[var(--color-text-primary)] mb-4">{t("condition.relatedProcedures")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {conditionProcedures.map((p) => (
                <a key={p.slug} href={`/procedures/${p.slug}`} className="p-4 rounded-[1.5rem] ring-1 ring-[var(--hairline)] hover:border-[var(--color-clinical-300)] transition-all reveal lift">
                  <h3 className="font-semibold text-[var(--color-text-primary)]">{p.name}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1 line-clamp-2">{p.description}</p>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Related Medications */}
        {conditionMedications.length > 0 && (
          <section className="mb-10 reveal">
            <h2 className="text-2xl text-[var(--color-text-primary)] mb-4">{t("condition.relatedMedications")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {conditionMedications.map((m) => (
                <a key={m.slug} href={`/medications/${m.slug}`} className="p-4 rounded-[1.5rem] ring-1 ring-[var(--hairline)] hover:border-[var(--color-clinical-300)] transition-all reveal lift">
                  <h3 className="font-semibold text-[var(--color-text-primary)]">{m.name}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1 line-clamp-2">{m.mechanism}</p>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Red Flags */}
        <section className="mb-10 reveal">
          <h2 className="text-2xl text-[var(--color-alert-critical)] mb-4 flex items-center gap-2">
            <span><Glyph e="🚨" className="inline-block w-[1.1em] h-[1.1em] align-[-0.18em]" /></span> {t("condition.redFlags")}
          </h2>
          <div className="p-5 rounded-xl bg-red-50 border-2 border-red-200">
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">{t("condition.redFlagsDesc")}</p>
            <ul className="space-y-2">
              {condition.redFlags.map((rf, i) => (
                <li key={i} className="flex items-start gap-2 text-sm font-medium text-red-800">
                  <span className="mt-0.5"><Glyph e="⚠️" className="inline-block w-[1.1em] h-[1.1em] align-[-0.18em]" /></span> {rf}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        {condition.faq.length > 0 && (
          <section className="mb-10 reveal">
            <h2 className="text-2xl text-[var(--color-text-primary)] mb-6">{t("condition.faq")}</h2>
            <ConditionFAQ items={condition.faq} />
          </section>
        )}

        {/* Related Conditions */}
        {relatedConditions.length > 0 && (
          <section className="mb-10 reveal">
            <h2 className="text-2xl text-[var(--color-text-primary)] mb-4">{t("condition.relatedConditions")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedConditions.map((c) => (
                <a key={c.slug} href={`/conditions/${c.slug}`} className="p-4 rounded-[1.5rem] ring-1 ring-[var(--hairline)] hover:border-[var(--color-clinical-300)] transition-all reveal lift">
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
        <section className="mb-10 p-6 rounded-[1.5rem] bg-[var(--mist)] ring-1 ring-[var(--hairline)] reveal">
          <div className="flex items-start gap-4">
            <PhysicianAvatar size="lg" />
            <div>
              <h3 className="font-bold text-[var(--color-text-primary)]">DR. SHAHNAWAZ F SHAH</h3>
              <p className="text-sm text-[var(--color-clinical-600)] font-medium">{t("doctor.specialty")}</p>
              <p className="text-xs text-[var(--color-text-muted)] mb-2">MBBS, M.D. (Anaes) • FIAPM • FCPM • FPM</p>
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
