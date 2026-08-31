"use client";

import { procedures } from "@/data/procedures";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useT } from "@/lib/useT";

const categoryLabels: Record<string, string> = {
  injection: "Injections",
  ablation: "Ablation",
  stimulation: "Neuromodulation",
  rehabilitation: "Rehabilitation",
};

export default function ProceduresPage() {
  const t = useT();
  return (
    <>
      <Breadcrumbs items={[{ label: t("nav.procedures") }]} />
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3">{t("index.painProcedures")}</h1>
          <p className="text-lg text-[var(--color-text-secondary)] mb-10 max-w-2xl">
            {t("index.imageGuided")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {procedures.map((p) => (
              <a key={p.slug} href={`/procedures/${p.slug}`} className="group p-5 rounded-xl border border-[var(--color-surface-200)] bg-white hover:shadow-lg hover:border-[var(--color-clinical-300)] transition-all">
                <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded bg-[var(--color-primary-50)] text-[var(--color-primary-700)] mb-2">
                  {categoryLabels[p.category] || p.category}
                </span>
                <h3 className="font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-clinical-600)] mb-2">{p.name}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] line-clamp-3">{p.description}</p>
                <span className="inline-block mt-3 text-sm font-medium text-[var(--color-clinical-600)]">{t("common.learnMore")} →</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
