"use client";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PhysicianAvatar from "@/components/ui/PhysicianAvatar";
import { useT } from "@/lib/useT";

export default function DoctorPage() {
  const t = useT();
  return (
    <>
      <Breadcrumbs items={[{ label: t("nav.about") }]} />

      <section className="bg-gradient-to-br from-[var(--color-primary-900)] to-[var(--color-primary-700)] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="shrink-0">
            <PhysicianAvatar size="xl" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Dr. Shahnawaz F Shah</h1>
            <p className="text-[var(--color-clinical-300)] text-lg mb-4">{t("doctor.specialty")}</p>
            <p className="text-white/70">MBBS, MD — Pain Medicine Specialist</p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">{t("doctor.clinicPhilosophy")}</h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed text-lg">
            {t("doctor.bio")}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">{t("doctor.practicePillars")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { titleKey: "doctor.precisions", descKey: "doctor.precisionsDesc", icon: "🔬" },
              { titleKey: "doctor.evidence", descKey: "doctor.evidenceDesc", icon: "📋" },
              { titleKey: "doctor.empowerment", descKey: "doctor.empowermentDesc", icon: "🤝" },
            ].map((p) => (
              <div key={p.titleKey} className="p-6 rounded-xl border border-[var(--color-surface-200)] bg-[var(--color-surface-50)]">
                <span className="text-3xl block mb-3">{p.icon}</span>
                <h3 className="font-bold text-[var(--color-text-primary)] mb-2">{t(p.titleKey)}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{t(p.descKey)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">{t("doctor.expertise")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Spinal pain (cervical, thoracic, lumbar)",
              "Sciatica and nerve root compression",
              "Facet joint pain and arthropathy",
              "Spinal stenosis management",
              "Sacroiliac joint dysfunction",
              "Complex Regional Pain Syndrome (CRPS)",
              "Knee and joint pain management",
              "Neuromodulation and spinal cord stimulation",
              "Radiofrequency ablation procedures",
              "Fluoroscopy-guided injections",
            ].map((e) => (
              <div key={e} className="flex items-center gap-2 p-3 rounded-lg bg-[var(--color-surface-50)] border border-[var(--color-surface-200)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-clinical-500)] flex-shrink-0" />
                <span className="text-sm text-[var(--color-text-secondary)]">{e}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="text-xs text-[var(--color-text-muted)] leading-relaxed border-t border-[var(--color-surface-200)] pt-6">
          <strong>Note:</strong> Specific professional qualifications, affiliations, and publications will be
          populated once verified credentials are provided by the project owner.
        </div>
      </div>
    </>
  );
}
