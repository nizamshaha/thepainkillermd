"use client";

import { use } from "react";
import { getProcedureBySlug } from "@/data/procedures";
import { conditions } from "@/data/conditions";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useT } from "@/lib/useT";
import ContentDiscovery from "@/components/ui/ContentDiscovery";

export default function ProcedurePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const t = useT();
  const proc = getProcedureBySlug(slug);
  if (!proc) return <div className="p-8 text-center">Procedure not found</div>;

  const relatedConditions = conditions.filter((c) => proc.conditions.includes(c.slug));

  const evidenceColors: Record<string, { bg: string; text: string; label: string }> = {
    strong: { bg: "bg-green-100", text: "text-green-800", label: "Strong Evidence" },
    moderate: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Moderate Evidence" },
    limited: { bg: "bg-orange-100", text: "text-orange-800", label: "Limited Evidence" },
  };

  const evidence = evidenceColors[proc.evidenceLevel] || evidenceColors.moderate;

  return (
    <>
      <Breadcrumbs items={[
        { label: t("nav.procedures"), href: "/procedures" },
        { label: proc.name },
      ]} />

      <section className="bg-gradient-to-br from-[var(--color-primary-900)] to-[var(--color-primary-700)] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${evidence.bg} ${evidence.text}`}>
              {evidence.label}
            </span>
            <span className="text-xs text-white/50 uppercase tracking-wider">{proc.category}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{proc.name}</h1>
          <p className="text-lg text-white/80 leading-relaxed">{proc.description}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">{t("procedure.whatIsIt")}</h2>
          <p className="text-[var(--color-text-secondary)] mb-4">{proc.description}</p>
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">{t("condition.symptoms")}</h3>
          <ul className="space-y-2">
            {proc.indications.map((ind, i) => (
              <li key={i} className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-[var(--color-medical-500)] flex-shrink-0" />
                {ind}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">{t("procedure.howPerformed")}</h2>
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-[var(--color-surface-200)]" />
            <div className="space-y-6">
              {proc.technique.map((step, i) => (
                <div key={i} className="flex gap-4 relative">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-clinical-500)] text-white font-bold text-sm flex items-center justify-center shrink-0 z-10">
                    {i + 1}
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-[var(--color-text-secondary)]">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">{t("procedure.risks")}</h2>
          <ul className="space-y-2">
            {proc.risks.map((r, i) => (
              <li key={i} className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-[var(--color-alert-warning)] flex-shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">{t("procedure.benefits")}</h2>
          <ul className="space-y-2">
            {proc.benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-[var(--color-medical-500)] flex-shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">{t("procedure.recovery")}</h2>
          <div className="p-5 rounded-xl bg-[var(--color-surface-50)] border border-[var(--color-surface-200)] text-[var(--color-text-secondary)] leading-relaxed">
            {proc.recovery}
          </div>
        </section>

        {relatedConditions.length > 0 && (
          <ContentDiscovery
            title={t("condition.relatedConditions")}
            items={relatedConditions.map((c) => ({
              title: c.name,
              description: c.overview,
              href: `/conditions/${c.slug}`,
            }))}
          />
        )}

        <ContentDiscovery
          items={[
            { title: "Pain Navigator", description: "Find your pain area and learn more", href: "/pain-navigator" },
            { title: "Watch & Learn", description: "Educational videos and patient stories", href: "/videos" },
            { title: "Pain Education", description: "Browse all educational articles", href: "/education" },
          ]}
        />

        <section className="mb-10 p-6 rounded-xl bg-[var(--color-primary-50)] border border-[var(--color-primary-200)] text-center">
          <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">{t("procedure.cta")}</h3>
          <p className="text-[var(--color-text-secondary)] mb-4">
            A thorough clinical evaluation is essential to determine whether {proc.name.toLowerCase()} is appropriate for your specific condition.
          </p>
          <a href="/clinic#book" className="inline-flex items-center px-6 py-3 rounded-full bg-[var(--color-clinical-600)] text-white font-semibold hover:bg-[var(--color-clinical-700)] transition-colors">
            Dr. Shahnawaz F Shah
          </a>
        </section>

        <div className="text-xs text-[var(--color-text-muted)] leading-relaxed border-t border-[var(--color-surface-200)] pt-6">
          <strong>{t("condition.disclaimer")}:</strong> This page is for educational purposes only. It does not constitute
          medical advice or a recommendation for any specific procedure.
        </div>
      </div>
    </>
  );
}
