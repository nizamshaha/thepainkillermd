"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { allPainAreas } from "@/data/painAreasFull";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useT } from "@/lib/useT";
import ContentDiscovery from "@/components/ui/ContentDiscovery";
import ExerciseLibrary from "@/components/medical/ExerciseLibrary";
import HomeRemedies from "@/components/medical/HomeRemedies";
import { sanitizeJsonLd, validateSlug } from "@/lib/security";

export default function PainAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const validSlug = validateSlug(slug);
  const t = useT();
  if (!validSlug) notFound();

  const area = allPainAreas.find((a) => a.slug === validSlug);
  if (!area) notFound();

  // JSON-LD schema for this pain area
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `${area.name} — Causes, Symptoms & Treatment`,
    description: area.description,
    url: `https://thepainkillermd.in/pain/${area.slug}`,
    medicalAudience: { "@type": "PatientAudience" },
    about: {
      "@type": "MedicalCondition",
      name: area.name,
      description: area.description,
    },
    author: {
      "@type": "Physician",
      name: "Dr. Shahnawaz F Shah",
      jobTitle: "Interventional Spine & Pain Physician",
    },
    publisher: {
      "@type": "Organization",
      name: "THE PAINKILLER MD",
      url: "https://thepainkillermd.in",
    },
  };

  return (
    <>
      <Breadcrumbs items={[
        { label: t("nav.painNavigator"), href: "/pain-navigator" },
        { label: area.name },
      ]} />

      <section className="bg-gradient-to-br from-[var(--color-primary-900)] to-[var(--color-primary-700)] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <span className="text-4xl mb-3 block">{area.icon}</span>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{area.name}</h1>
          <p className="text-lg text-white/80">{area.description}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">{t("condition.causes")}</h2>
          <p className="text-sm text-[var(--color-text-muted)] italic mb-3">Some common possible causes include:</p>
          <ul className="space-y-2">
            {area.commonCauses.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-pathway-nociceptive)] flex-shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">{t("condition.symptoms")}</h2>
          <ul className="space-y-2">
            {area.symptoms.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-clinical-500)] flex-shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--color-medical-700)] mb-4">What Can You Try at Home?</h2>
          <ul className="space-y-2">
            {area.selfCare.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-medical-500)] flex-shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10 p-5 rounded-xl bg-red-50 border-2 border-red-200">
          <h2 className="text-xl font-bold text-[var(--color-alert-critical)] mb-3">🚨 {t("condition.redFlags")}</h2>
          <ul className="space-y-1.5">
            {area.redFlags.map((rf, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-red-800 font-medium">
                <span>⚠️</span> {rf}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">{t("condition.treatment")}</h2>
          <p className="text-[var(--color-text-secondary)] mb-3">Treatment depends on the cause, severity, examination findings and individual patient needs.</p>
          <div className="flex flex-wrap gap-2">
            {area.treatmentOptions.map((treat, i) => (
              <span key={i} className="px-3 py-1.5 text-sm font-medium rounded bg-[var(--color-surface-100)] text-[var(--color-text-secondary)] border border-[var(--color-surface-200)]">
                {treat}
              </span>
            ))}
          </div>
        </section>

        {area.faq.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">{t("condition.faq")}</h2>
            <div className="space-y-3">
              {area.faq.map((f, i) => (
                <div key={i} className="p-4 rounded-lg bg-[var(--color-surface-50)] border border-[var(--color-surface-200)]">
                  <p className="font-semibold text-[var(--color-text-primary)] mb-1">{f.question}</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">{f.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Home Remedies */}
        <HomeRemedies areaId={area.id} areaName={area.name} />

        {/* Exercise Library */}
        <ExerciseLibrary areaId={area.id} areaName={area.name} />

        <ContentDiscovery
          title="You May Also Want to Understand"
          items={[
            ...allPainAreas.filter((a) => a.slug !== slug).slice(0, 3).map((a) => ({
              title: a.name,
              description: a.description,
              href: `/pain/${a.slug}`,
            })),
            { title: "Pain Navigator", description: "Explore all pain areas interactively", href: "/pain-navigator" },
            { title: "Watch & Learn", description: "Educational videos and patient stories", href: "/videos" },
          ]}
        />

        <div className="mt-10 p-8 rounded-xl bg-gradient-to-br from-[var(--color-primary-900)] to-[var(--color-primary-700)] text-white text-center">
          <h3 className="text-xl font-bold mb-2">{t("cta.title")}</h3>
          <p className="text-white/80 mb-1">Dr Shahnawaz F Shah</p>
          <p className="text-sm text-white/60 mb-6">{t("doctor.specialty")}</p>
          <a href="/clinic#book" className="px-6 py-3 rounded-full bg-white text-[var(--color-primary-900)] font-semibold hover:bg-[var(--color-surface-100)] transition-colors inline-block">
            {t("hero.cta.primary")}
          </a>
        </div>

        <div className="mt-8 text-xs text-[var(--color-text-muted)] text-center">
          This information is for educational purposes and does not constitute medical advice. Always consult a qualified healthcare professional.
        </div>
      </div>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(schema) }}
      />
    </>
  );
}
