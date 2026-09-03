"use client";

import { conditions } from "@/data/conditions";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useT } from "@/lib/useT";

const categoryLabels: Record<string, string> = {
  spine: "Spine & Back",
  nerve: "Nerve Pain",
  joint: "Joint Pain",
  chronic: "Chronic Pain",
  head: "Head & Face",
  "soft-tissue": "Soft Tissue",
};

export default function ConditionsPage() {
  const t = useT();
  const grouped = conditions.reduce(
    (acc, c) => {
      (acc[c.category] = acc[c.category] || []).push(c);
      return acc;
    },
    {} as Record<string, typeof conditions>
  );

  return (
    <>
      <Breadcrumbs items={[{ label: t("nav.conditions") }]} />
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3">{t("index.painConditions")}</h1>
          <p className="text-lg text-[var(--color-text-secondary)] mb-10 max-w-2xl">
            {t("index.evidenceBased")}
          </p>
          {Object.entries(grouped).map(([cat, items]) => (
            <section key={cat} className="mb-10">
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">{categoryLabels[cat] || cat}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((c) => (
                  <a key={c.slug} href={`/conditions/${c.slug}`} className="group relative p-5 rounded-xl border border-[var(--color-surface-200)] bg-white hover:shadow-xl hover:shadow-[var(--color-clinical-500)]/5 hover:border-[var(--color-clinical-300)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[var(--color-clinical-500)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <h3 className="font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-clinical-600)] transition-colors mb-2">{c.name}</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] line-clamp-3">{c.overview}</p>
                    <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-[var(--color-clinical-600)] group-hover:gap-2 transition-all duration-300">{t("common.readMore")} <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span></span>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
