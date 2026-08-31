"use client";

import { medications } from "@/data/medications";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useT } from "@/lib/useT";

export default function MedicationsPage() {
  const t = useT();
  return (
    <>
      <Breadcrumbs items={[{ label: t("nav.medications") }]} />
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3">{t("index.painMedications")}</h1>
          <p className="text-lg text-[var(--color-text-secondary)] mb-3 max-w-2xl">
            {t("index.nonPrescriptive")}
          </p>
          <div className="disclaimer-badge mb-10 w-fit">
            <span>{t("index.eduDisclaimer")}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {medications.map((m) => (
              <a key={m.slug} href={`/medications/${m.slug}`} className="group p-5 rounded-xl border border-[var(--color-surface-200)] bg-white hover:shadow-lg transition-all">
                <span className="text-xs font-semibold text-[var(--color-clinical-600)] uppercase">{m.category.replace("-", " ")}</span>
                <h3 className="font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-clinical-600)] mt-1 mb-2">{m.name}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">{m.mechanism}</p>
                <span className="inline-block mt-3 text-sm font-medium text-[var(--color-clinical-600)]">{t("common.learnMore")} →</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
