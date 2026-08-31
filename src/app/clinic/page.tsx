"use client";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useT } from "@/lib/useT";

const firstVisitSteps = [
  { step: "01", title: "Listen", desc: "We hear your complete pain story without interruption." },
  { step: "02", title: "Assess", desc: "Comprehensive clinical examination and functional assessment." },
  { step: "03", title: "Understand", desc: "We explain what we've found using clear, accessible language." },
  { step: "04", title: "Explain", desc: "Detailed education about your condition and pain mechanisms." },
  { step: "05", title: "Plan", desc: "Collaborative treatment planning tailored to your goals." },
  { step: "06", title: "Treat", desc: "Evidence-based interventions delivered with precision." },
  { step: "07", title: "Follow-Up", desc: "Ongoing monitoring and adjustment for optimal outcomes." },
];

export default function ClinicPage() {
  const t = useT();
  return (
    <>
      <Breadcrumbs items={[{ label: t("nav.clinic") }]} />

      <section className="bg-gradient-to-br from-[var(--color-primary-900)] to-[var(--color-primary-700)] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{t("clinic.title")}</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            A calm, professional environment designed for comfortable consultation and advanced interventional procedures.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6 text-center">{t("clinic.firstVisit")}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {firstVisitSteps.map((s) => (
              <div key={s.step} className="p-4 rounded-xl border border-[var(--color-surface-200)] bg-[var(--color-surface-50)] text-center">
                <div className="w-10 h-10 rounded-full bg-[var(--color-clinical-500)] text-white font-bold text-sm flex items-center justify-center mx-auto mb-2">
                  {s.step}
                </div>
                <h4 className="font-bold text-[var(--color-text-primary)] text-sm mb-1">{s.title}</h4>
                <p className="text-xs text-[var(--color-text-secondary)]">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl border border-[var(--color-surface-200)] bg-[var(--color-surface-50)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">📍 {t("clinic.location")}</h3>
            <p className="text-[var(--color-text-secondary)]">Ahmedabad, Gujarat, India</p>
            <p className="text-sm text-[var(--color-text-muted)] mt-2">Detailed address to be provided by clinic owner.</p>
          </div>
          <div className="p-6 rounded-xl border border-[var(--color-surface-200)] bg-[var(--color-surface-50)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">🕐 {t("clinic.hours")}</h3>
            <p className="text-[var(--color-text-secondary)]">Monday — Saturday: 9:00 AM — 6:00 PM</p>
            <p className="text-sm text-[var(--color-text-muted)] mt-2">Sunday &amp; Public Holidays: Closed</p>
          </div>
          <div className="p-6 rounded-xl border border-[var(--color-surface-200)] bg-[var(--color-surface-50)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">🏥 {t("clinic.facilities")}</h3>
            <ul className="space-y-1.5 text-sm text-[var(--color-text-secondary)]">
              <li>• Fluoroscopy-guided procedure suite</li>
              <li>• Ultrasound-guided injection capabilities</li>
              <li>• Comfortable consultation rooms</li>
              <li>• Recovery area</li>
            </ul>
          </div>
          <div className="p-6 rounded-xl border border-[var(--color-surface-200)] bg-[var(--color-surface-50)]">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">📞 {t("clinic.contact")}</h3>
            <div className="space-y-2">
              <a href="tel:+919999999999" className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-clinical-600)] transition-colors">
                📞 Phone: Available upon request
              </a>
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-clinical-600)] transition-colors">
                💬 WhatsApp: Available upon request
              </a>
            </div>
          </div>
        </section>

        <section id="book" className="mb-12 p-8 rounded-xl bg-gradient-to-br from-[var(--color-primary-900)] to-[var(--color-primary-700)] text-white text-center">
          <h2 className="text-2xl font-bold mb-3">{t("clinic.bookNow")}</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Schedule a consultation with Dr. Shahnawaz F Shah for personalized pain evaluation and treatment planning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+919999999999" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-[var(--color-primary-900)] font-semibold hover:bg-[var(--color-surface-100)] transition-colors">
              📞 {t("cta.call")}
            </a>
            <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors">
              💬 {t("cta.whatsapp")}
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
