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
                  <a key={c.slug} href={`/conditions/${c.slug}`} className="group p-5 rounded-xl border border-[var(--color-surface-200)] bg-white hover:shadow-lg hover:border-[var(--color-clinical-300)] transition-all">
                    <h3 className="font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-clinical-600)] mb-2">{c.name}</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] line-clamp-3">{c.overview}</p>
                    <span className="inline-block mt-3 text-sm font-medium text-[var(--color-clinical-600)]">{t("common.readMore")} →</span>
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
