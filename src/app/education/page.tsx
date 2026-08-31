"use client";

import { conditions } from "@/data/conditions";
import { procedures } from "@/data/procedures";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useT } from "@/lib/useT";

const categories = [
  { name: "Spine", icon: "🦴", description: "Understanding spinal conditions, disc problems, and back pain." },
  { name: "Nerve Pain", icon: "⚡", description: "Neuropathic pain mechanisms, nerve compression, and radiating pain." },
  { name: "Joint Pain", icon: "🦵", description: "Osteoarthritis, joint degeneration, and joint pain management." },
  { name: "Chronic Pain", icon: "🧠", description: "Central sensitization, pain neuroscience, and living with chronic pain." },
  { name: "Pain Procedures", icon: "💉", description: "Interventional procedures, injections, and ablation techniques." },
  { name: "Pain Medicines", icon: "💊", description: "Medication education and pharmacological pain management." },
];

export default function EducationPage() {
  const t = useT();
  return (
    <>
      <Breadcrumbs items={[{ label: t("nav.education") }]} />

      <section className="bg-gradient-to-br from-[var(--color-primary-900)] to-[var(--color-primary-700)] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{t("education.title")}</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Evidence-based articles and resources to help you understand pain, its mechanisms, and treatment approaches.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">{t("index.browseByCategory")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <div key={cat.name} className="p-6 rounded-xl border border-[var(--color-surface-200)] bg-white hover:shadow-lg transition-shadow">
                <span className="text-2xl block mb-2">{cat.icon}</span>
                <h3 className="font-bold text-[var(--color-text-primary)] mb-1">{cat.name}</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">{cat.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">{t("index.featuredConditions")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {conditions.slice(0, 4).map((c) => (
              <a key={c.slug} href={`/conditions/${c.slug}`} className="group p-5 rounded-xl border border-[var(--color-surface-200)] bg-white hover:shadow-lg transition-all">
                <h3 className="font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-clinical-600)] mb-2">{c.name}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">{c.overview}</p>
                <span className="inline-block mt-2 text-sm font-medium text-[var(--color-clinical-600)]">{t("common.learnMore")} →</span>
              </a>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">{t("index.featuredProcedures")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {procedures.slice(0, 4).map((p) => (
              <a key={p.slug} href={`/procedures/${p.slug}`} className="group p-5 rounded-xl border border-[var(--color-surface-200)] bg-white hover:shadow-lg transition-all">
                <h3 className="font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-clinical-600)] mb-2">{p.name}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">{p.description}</p>
                <span className="inline-block mt-2 text-sm font-medium text-[var(--color-clinical-600)]">{t("common.learnMore")} →</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
