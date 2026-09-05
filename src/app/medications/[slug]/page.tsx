"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { medications, getMedicationBySlug } from "@/data/medications";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useT } from "@/lib/useT";
import ContentDiscovery from "@/components/ui/ContentDiscovery";
import { validateSlug } from "@/lib/security";

export default function MedicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const validSlug = validateSlug(slug);
  const t = useT();
  if (!validSlug) notFound();

  const med = getMedicationBySlug(validSlug);
  if (!med) notFound();

  return (
    <>
      <Breadcrumbs items={[{ label: t("nav.medications"), href: "/medications" }, { label: med.name }]} />

      <section className="bg-gradient-to-br from-[var(--color-primary-900)] to-[var(--color-primary-700)] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs text-white/50 uppercase tracking-wider">{med.category.replace("-", " ")}</span>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{med.name}</h1>
          <p className="text-lg text-white/80">{med.description}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">{t("medication.howItWorks")}</h2>
          <div className="p-5 rounded-xl bg-[var(--color-surface-50)] border border-[var(--color-surface-200)] text-[var(--color-text-secondary)] leading-relaxed">
            {med.mechanism}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">{t("medication.commonUses")}</h2>
          <ul className="space-y-2">
            {med.commonUses.map((u, i) => (
              <li key={i} className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-[var(--color-medical-500)] flex-shrink-0" />
                {u}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">{t("medication.sideEffects")}</h2>
          <ul className="space-y-2">
            {med.sideEffects.map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-[var(--color-alert-warning)] flex-shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">{t("medication.precautions")}</h2>
          <ul className="space-y-2">
            {med.precautions.map((p, i) => (
              <li key={i} className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-[var(--color-alert-critical)] flex-shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </section>

        <div className="p-5 rounded-xl bg-amber-50 border-2 border-amber-200">
          <p className="text-sm font-semibold text-amber-800 mb-1">⚠️ {t("medication.precautions")}</p>
          <p className="text-sm text-amber-700">{med.disclaimer}</p>
        </div>

        <ContentDiscovery
          title="You May Also Want to Understand"
          items={[
            ...medications.filter((m) => m.slug !== slug).slice(0, 2).map((m) => ({
              title: m.name,
              description: m.description,
              href: `/medications/${m.slug}`,
            })),
            { title: "Pain Navigator", description: "Find your pain area and learn more", href: "/pain-navigator" },
            { title: "Watch & Learn", description: "Educational videos and patient stories", href: "/videos" },
          ]}
        />
      </div>
    </>
  );
}
