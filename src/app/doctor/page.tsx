"use client";

import Image from "next/image";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Button from "@/components/ui/Button";
import { CalendarIcon, CheckIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { useT } from "@/lib/useT";

const qualifications = [
  { key: "doctor.degree1", note: "Specialization in Anaesthesiology and Acute/Critical Pain Care" },
  { key: "doctor.degree2", note: "Fellowship recognizing clinical excellence in interventional pain medicine" },
  { key: "doctor.degree3", note: "Comprehensive chronic pain medicine fellowship accredited by Maharashtra University of Health Sciences" },
  { key: "doctor.degree4", note: "Specialized interventional training in multimodal pain care and regenerative therapies" },
];

const expertise = {
  Spine: [
    "Spinal pain (cervical, thoracic, lumbar)",
    "Sciatica and nerve root compression",
    "Facet joint pain and arthropathy",
    "Spinal stenosis management",
    "Sacroiliac joint dysfunction",
  ],
  "Procedures & beyond the spine": [
    "Radiofrequency ablation procedures",
    "Fluoroscopy-guided injections",
    "Neuromodulation and spinal cord stimulation",
    "Complex Regional Pain Syndrome (CRPS)",
    "Knee and joint pain management",
  ],
};

export default function DoctorPage() {
  const t = useT();
  return (
    <>
      <Breadcrumbs items={[{ label: t("nav.about") }]} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[var(--ink)] text-white">
        <div className="pointer-events-none absolute -right-40 -top-56 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(116,102,198,0.45),transparent)]" aria-hidden="true" />
        <div className="container-page grid md:grid-cols-[1fr_auto] gap-10 items-end pt-16 lg:pt-20">
          <div className="pb-14 lg:pb-20">
            <p className="kicker !text-[var(--color-primary-200)]">{t("doctor.specialty")}</p>
            <h1 className="text-white">Dr. Shahnawaz F Shah</h1>
            <p className="mt-5 text-lg text-white/70">M.B.B.S., M.D. (Anaesthesiology), FIAPM, FCPM-MUHS, FPM</p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Button label={t("hero.cta.primary")} href="/#book" variant="primary" size="lg" icon={<CalendarIcon />} />
              <Button label="+91 97696 82366" href="tel:+919769682366" variant="secondary" size="lg" icon={<PhoneIcon />} />
            </div>
          </div>
          <div className="relative mx-auto md:mx-0 w-[18rem] sm:w-[22rem] aspect-[4/5] rounded-t-[999px] overflow-hidden bg-gradient-to-b from-[#3a2f7a] via-[#5a4bb0] to-[#c9c2ee]">
            <Image src="/doctor-photo.png" alt="Dr. Shahnawaz F Shah" width={376} height={354} priority className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[112%] max-w-none h-auto" />
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-page grid lg:grid-cols-12 gap-10">
          <h2 className="lg:col-span-4 text-[var(--ink)]">{t("doctor.clinicPhilosophy")}</h2>
          <p className="lg:col-span-8 font-display text-2xl sm:text-[1.9rem] leading-[1.45] text-[var(--color-text-primary)]">
            {t("doctor.bio")}
          </p>
        </div>
      </section>

      {/* Qualifications */}
      <section className="py-20 lg:py-28">
        <div className="container-page grid lg:grid-cols-12 gap-10">
          <h2 className="lg:col-span-4 text-[var(--ink)]">{t("doctor.educationTitle")}</h2>
          <ol className="lg:col-span-8 relative border-l border-[var(--color-primary-200)] ml-2">
            {qualifications.map((q, i) => (
              <li key={q.key} className="relative pl-8 pb-10 last:pb-0">
                <span className={`absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full ring-4 ring-[var(--paper)] ${i === 0 ? "bg-[var(--signal)]" : "bg-[var(--ink)]"}`} aria-hidden="true" />
                <h3 className="text-[var(--ink)]">{t(q.key)}</h3>
                <p className="mt-1 text-[var(--color-text-secondary)]">{q.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 lg:py-28 bg-[var(--ink)] text-white">
        <div className="container-page">
          <h2 className="text-white mb-12">{t("doctor.practicePillars")}</h2>
          <div className="grid md:grid-cols-3 gap-px bg-white/10 rounded-[1.5rem] overflow-hidden">
            {[
              { titleKey: "doctor.precisions", descKey: "doctor.precisionsDesc" },
              { titleKey: "doctor.evidence", descKey: "doctor.evidenceDesc" },
              { titleKey: "doctor.empowerment", descKey: "doctor.empowermentDesc" },
            ].map((p, i) => (
              <div key={p.titleKey} className="bg-[var(--ink)] p-8 lg:p-10">
                <span className="block h-1 w-10 rounded-full mb-8" style={{ background: i === 0 ? "var(--signal)" : "var(--color-primary-300)" }} />
                <h3 className="text-white text-2xl font-display !font-medium">{t(p.titleKey)}</h3>
                <p className="mt-3 text-white/65">{t(p.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-page grid lg:grid-cols-12 gap-10">
          <h2 className="lg:col-span-4 text-[var(--ink)]">{t("doctor.expertise")}</h2>
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-10">
            {Object.entries(expertise).map(([group, items]) => (
              <div key={group}>
                <h3 className="text-[var(--iris)] text-base">{group}</h3>
                <ul className="mt-4 border-t border-[var(--line)]">
                  {items.map((e) => (
                    <li key={e} className="flex items-start gap-3 py-3.5 border-b border-[var(--line)]">
                      <CheckIcon className="w-4 h-4 mt-1 text-[var(--relief)] shrink-0" />
                      <span className="text-[var(--color-text-primary)]">{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 lg:py-20">
        <div className="container-page">
          <div className="rounded-[2rem] bg-[var(--panel)] p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div>
              <h2 className="text-[var(--ink)] max-w-[18ch]">{t("cta.title")}</h2>
              <p className="mt-3 text-lg text-[var(--color-text-secondary)] max-w-xl">{t("cta.description")}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Button label={t("cta.call")} href="tel:+919769682366" variant="primary" size="lg" icon={<PhoneIcon />} />
              <Button label={t("cta.whatsapp")} href="https://wa.me/919769682366" variant="whatsapp" size="lg" newTab icon={<WhatsAppIcon />} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
