"use client";

import BodyMap from "@/components/medical/BodyMap";
import SensationExplorer from "@/components/medical/SensationExplorer";
import PainWizard from "@/components/medical/PainWizard";
import SearchModal from "@/components/medical/SearchModal";
import NervePathway from "@/components/medical/svgs/NervePathway";
import SpinalStenosis from "@/components/medical/svgs/SpinalStenosis";
import WatchAndLearn from "@/components/medical/WatchAndLearn";
import HumanBody3DViewer from "@/components/medical/HumanBody3DViewer";
// import PainNavigator from "@/components/medical/PainNavigator";
import Logo from "@/components/ui/Logo";
import PhysicianAvatar from "@/components/ui/PhysicianAvatar";
import Footer from "@/components/navigation/Footer";
import { useT } from "@/lib/useT";
import { useState } from "react";

// Condition preview cards
const featuredConditions = [
  { name: "Sciatica", slug: "sciatica", description: "Radiating pain from lower back through the leg, often from disc herniation.", color: "#1565c0" },
  { name: "Lumbar Spinal Stenosis", slug: "lumbar-spinal-stenosis", description: "Narrowing of the spinal canal causing neurogenic claudication.", color: "#6a1b9a" },
  { name: "Cervical Radiculopathy", slug: "cervical-radiculopathy", description: "Nerve root compression in the cervical spine causing arm pain.", color: "#00695c" },
  { name: "Facet Joint Syndrome", slug: "facet-joint-syndrome", description: "Pain arising from the facet joints of the spine.", color: "#e65100" },
  { name: "Complex Regional Pain Syndrome", slug: "complex-regional-pain-syndrome", description: "Chronic pain with autonomic and sensory dysfunction.", color: "#c62828" },
  { name: "Trigeminal Neuralgia", slug: "trigeminal-neuralgia", description: "Electric shock-like facial pain from trigeminal nerve dysfunction.", color: "#6a1b9a" },
  { name: "Knee Osteoarthritis", slug: "knee-osteoarthritis", description: "Progressive cartilage loss causing knee pain and disability.", color: "#2e7d32" },
  { name: "Sacroiliac Dysfunction", slug: "sacroiliac-dysfunction", description: "Pain from the sacroiliac joint complex.", color: "#1a3f6b" },
];

// Treatment ladder steps
const treatmentLadder = [
  { step: "01", titleKey: "Conservative & Rehabilitation", descriptionKey: "Physical therapy, exercise prescription, ergonomic advice, pain neuroscience education.", color: "#4caf50" },
  { step: "02", titleKey: "Rational Pharmacotherapy", descriptionKey: "Evidence-based medication management targeting specific pain mechanisms.", color: "#1976d2" },
  { step: "03", titleKey: "Precision Interventions", descriptionKey: "Image-guided injections, nerve blocks, and targeted procedures.", color: "#e65100" },
  { step: "04", titleKey: "Advanced Neuromodulation", descriptionKey: "Spinal cord stimulation, intrathecal pumps, and neuromodulation technologies.", color: "#c62828" },
];

// Red flags
const redFlags = [
  { title: "Cauda Equina Syndrome", description: "Saddle anesthesia, bladder/bowel dysfunction. Requires URGENT emergency evaluation.", urgency: "Emergency" },
  { title: "Progressive Motor Weakness", description: "Worsening weakness in a limb, especially foot drop. Requires urgent neurological assessment.", urgency: "Urgent" },
  { title: "Acute Spinal Trauma", description: "Significant trauma with neurological symptoms. Requires immediate imaging.", urgency: "Emergency" },
];

// Articles preview
const articles = [
  { slug: "understanding-disc-herniation-and-nerve-pain", title: "Understanding Disc Herniation and Nerve Pain", category: "Spine", readTime: "8 min", excerpt: "How disc material compresses nerve roots and the inflammatory cascade that follows." },
  { slug: "the-neuroscience-of-chronic-pain", title: "The Neuroscience of Chronic Pain", category: "Chronic Pain", readTime: "12 min", excerpt: "Central sensitization, neuroplasticity, and why chronic pain becomes a disease of its own." },
  { slug: "radiofrequency-ablation-what-to-expect", title: "Radiofrequency Ablation: What to Expect", category: "Procedures", readTime: "6 min", excerpt: "A step-by-step guide to the RFA procedure from preparation to recovery." },
];

export default function Home() {
  const t = useT();
  const [show3DViewer, setShow3DViewer] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Global Search Modal */}
      <SearchModal />

      {/* === SECTION 1: Hero === */}
      <section id="hero" className="relative bg-gradient-to-br from-[var(--color-primary-900)] via-[var(--color-primary-800)] to-[var(--color-primary-700)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-subtle" />
              {t("hero.credential")}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t("hero.headline")}
            </h1>

            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mb-4 leading-relaxed">
              {t("hero.subtitle")}
            </p>

            {/* Physician credentials */}
            <div className="flex items-center gap-3 mb-8 text-sm text-white/70">
              <PhysicianAvatar size="sm" />
              <div>
                <p className="font-bold text-white uppercase tracking-wide">DR. SHAHNAWAZ F SHAH</p>
                <p>{t("doctor.specialty")}</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#book"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-[var(--color-primary-900)] font-semibold text-lg hover:bg-[var(--color-surface-100)] transition-colors shadow-lg"
              >
                {t("hero.cta.primary")}
              </a>
              <a
                href="#pain-wizard"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                {t("hero.cta.secondary")}
              </a>
              <a
                href="#body-map"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-gradient-to-r from-[var(--color-clinical-600)] to-[var(--color-clinical-400)] text-white font-semibold text-lg hover:bg-gradient-to-r from-[var(--color-clinical-700)] to-[var(--color-clinical-500)] transition-colors"
              >
                Explore 2D Body
              </a>
            </div>

            {/* Trust metrics */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
              <div>
                <p className="text-2xl font-bold">20+</p>
                <p className="text-sm text-white/60">{t("hero.stats.conditions")}</p>
              </div>
              <div>
                <p className="text-2xl font-bold">15+</p>
                <p className="text-sm text-white/60">{t("hero.stats.experience")}</p>
              </div>
              <div>
                <p className="text-2xl font-bold">10K+</p>
                <p className="text-sm text-white/60">{t("hero.stats.patients")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION 1.5: Pain Navigator CTA === */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface-50)]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold text-[var(--color-clinical-600)] uppercase tracking-wider mb-2">
            {t("hero.credential")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3">
            {t("painNav.title")}
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-6">
            {t("painNav.subtitle")}
          </p>
          <p className="text-sm text-[var(--color-text-muted)] mb-8">{t("painNav.disclaimer")}</p>
          <a href="/pain-navigator" className="inline-flex items-center px-8 py-3.5 rounded-full bg-[var(--color-clinical-600)] text-white font-semibold text-lg hover:bg-[var(--color-clinical-700)] transition-colors shadow-lg">
            {t("painNav.cta")}
          </a>
        </div>
      </section>

      {/* === SECTION 2: Body Map === */}
      <BodyMap />

      {/* === SECTION 3: Sensation Explorer === */}
      <SensationExplorer />

      {/* === SECTION 4: Understand Pain — Neurobiology === */}
      <section id="understand-pain" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[var(--color-clinical-600)] uppercase tracking-wider mb-2">
              {t("section.painScience")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3">
              {t("pain.title")}
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              {t("pain.subtitle")}
            </p>
          </div>

          {/* Three pain pathways */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-xl border-l-4 bg-[var(--color-surface-50)]" style={{ borderColor: "var(--color-pathway-nociceptive)" }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: "rgba(230,81,0,0.1)" }}>
                <span className="text-2xl">🦴</span>
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">{t("pain.nociceptive")}</h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {t("pain.nociceptiveDesc")}
              </p>
            </div>

            <div className="p-6 rounded-xl border-l-4 bg-[var(--color-surface-50)]" style={{ borderColor: "var(--color-pathway-neuropathic)" }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: "rgba(106,27,154,0.1)" }}>
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">{t("pain.neuropathic")}</h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {t("pain.neuropathicDesc")}
              </p>
            </div>

            <div className="p-6 rounded-xl border-l-4 bg-[var(--color-surface-50)]" style={{ borderColor: "var(--color-pathway-nociplastic)" }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: "rgba(0,105,92,0.1)" }}>
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">{t("pain.nociplastic")}</h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {t("pain.nociplasticDesc")}
              </p>
            </div>
          </div>

          {/* SVG Diagrams */}
          <div className="space-y-12">
            <NervePathway />
            <SpinalStenosis />
          </div>
        </div>
      </section>

      {/* === SECTION 5: Conditions Directory === */}
      <section id="conditions" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-[var(--color-clinical-600)] uppercase tracking-wider mb-2">
              {t("section.conditions")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3">
              {t("conditions.title")}
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              {t("conditions.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredConditions.map((c, idx) => (
              <a
                key={c.slug}
                href={`/conditions/${c.slug}`}
                className="group relative p-5 rounded-xl border border-[var(--color-surface-200)] bg-white hover:shadow-xl hover:shadow-[var(--color-clinical-500)]/5 hover:border-[var(--color-clinical-300)] hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <div className="absolute top-0 left-0 w-full h-1 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(90deg, ${c.color}, transparent)` }} />
                <div className="w-3 h-3 rounded-full mb-3 ring-2 ring-offset-2 ring-transparent group-hover:ring-offset-white transition-all duration-300" style={{ background: c.color, ['--tw-ring-color' as string]: c.color }} />
                <h3 className="font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-clinical-600)] transition-colors mb-2">
                  {c.name}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] line-clamp-3">
                  {c.description}
                </p>
                <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-[var(--color-clinical-600)] group-hover:gap-2 transition-all duration-300">
                  {t("common.readMore")} <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* === SECTION 6: Treatment Options Spectrum === */}
      <section id="treatment" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-[var(--color-clinical-600)] uppercase tracking-wider mb-2">
              {t("section.treatment")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3">
              {t("treatment.title")}
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              {t("treatment.subtitle")}
            </p>
          </div>

          <div className="space-y-4">
            {treatmentLadder.map((tItem) => (
              <div
                key={tItem.step}
                className="flex items-start gap-5 p-6 rounded-xl border border-[var(--color-surface-200)] bg-[var(--color-surface-50)] hover:shadow-md transition-shadow"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-lg"
                  style={{ background: tItem.color }}
                >
                  {tItem.step}
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-text-primary)] text-lg mb-1">
                    {tItem.titleKey}
                  </h3>
                  <p className="text-[var(--color-text-secondary)]">
                    {tItem.descriptionKey}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === SECTION 7: Pain Procedures === */}
      <section id="procedures" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-[var(--color-clinical-600)] uppercase tracking-wider mb-2">
              {t("section.procedures")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3">
              {t("procedures.title")}
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              {t("procedures.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {[
              { name: "Radiofrequency Ablation", desc: "Thermal neurotomy for facet joint and nerve-mediated pain.", slug: "radiofrequency-ablation" },
              { name: "Lumbar Epidural Injection", desc: "Targeted steroid delivery for nerve root inflammation.", slug: "lumbar-epidural-injection" },
              { name: "Medial Branch Block", desc: "Diagnostic confirmation for facet joint pain.", slug: "medial-branch-block" },
              { name: "SI Joint Injection", desc: "Precise injection for sacroiliac joint dysfunction.", slug: "si-joint-injection" },
              { name: "Spinal Cord Stimulation", desc: "Neuromodulation for chronic intractable pain.", slug: "spinal-cord-stimulation" },
              { name: "Trigger Point Injection", desc: "Myofascial trigger point disruption and pain relief.", slug: "trigger-point-injection" },
            ].map((p) => (
              <a
                key={p.slug}
                href={`/procedures/${p.slug}`}
                className="group p-5 rounded-xl border border-[var(--color-surface-200)] bg-white hover:shadow-lg transition-all"
              >
                <h3 className="font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-clinical-600)] transition-colors mb-2">
                  {p.name}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)]">{p.desc}</p>
                <span className="inline-block mt-3 text-sm font-medium text-[var(--color-clinical-600)]">
                  {t("common.learnMore")} →
                </span>
              </a>
            ))}
          </div>

        </div>
      </section>

      {/* === SECTION 8: Pain Red Flags === */}
      <section id="red-flags" className="py-16 px-4 sm:px-6 lg:px-8 bg-red-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-[var(--color-alert-critical)] font-bold text-sm mb-4">
              🚨 CRITICAL SAFETY INFORMATION
            </div>
            <h2 className="text-3xl font-bold text-[var(--color-alert-critical)] mb-3">
              {t("redflags.title")}
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
              {t("redflags.subtitle")}
            </p>
          </div>

          <div className="space-y-4">
            {redFlags.map((rf) => (
              <div
                key={rf.title}
                className="p-5 rounded-xl border-2 border-red-200 bg-white flex items-start gap-4"
              >
                <span
                  className={`inline-block px-2 py-0.5 text-xs font-bold rounded ${
                    rf.urgency === "Emergency"
                      ? "bg-red-600 text-white"
                      : "bg-orange-500 text-white"
                  }`}
                >
                  {rf.urgency}
                </span>
                <div>
                  <h3 className="font-bold text-[var(--color-text-primary)]">{rf.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">{rf.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === SECTION 9: Meet Dr. Shah === */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-[var(--color-clinical-600)] uppercase tracking-wider mb-2">
              {t("section.doctor")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3">
              {t("doctor.title")}
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-48 flex-shrink-0">
              <PhysicianAvatar size="xl" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
                DR. SHAHNAWAZ F SHAH
              </h3>
              <p className="text-[var(--color-clinical-600)] font-medium mb-4">
                {t("doctor.specialty")}
              </p>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                {t("doctor.bio")}
              </p>

              {/* Practice pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { titleKey: "doctor.precisions", descKey: "doctor.precisionsDesc", icon: "🔬" },
                  { titleKey: "doctor.evidence", descKey: "doctor.evidenceDesc", icon: "📋" },
                  { titleKey: "doctor.empowerment", descKey: "doctor.empowermentDesc", icon: "🤝" },
                ].map((p) => (
                  <div key={p.titleKey} className="p-4 rounded-lg bg-[var(--color-surface-50)] border border-[var(--color-surface-200)]">
                    <span className="text-2xl block mb-2">{p.icon}</span>
                    <h4 className="font-semibold text-sm text-[var(--color-text-primary)]">{t(p.titleKey)}</h4>
                    <p className="text-xs text-[var(--color-text-muted)]">{t(p.descKey)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION 10: Education / Articles === */}
      <section id="education" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-[var(--color-clinical-600)] uppercase tracking-wider mb-2">
              {t("section.education")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3">
              {t("education.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((a) => (
              <a key={a.slug} href={`/education/${a.slug}`} className="group block p-6 rounded-xl border border-[var(--color-surface-200)] bg-white hover:shadow-lg hover:border-[var(--color-clinical-300)] transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 text-xs font-semibold rounded bg-[var(--color-primary-50)] text-[var(--color-primary-700)]">
                    {a.category}
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)]">{a.readTime} read</span>
                </div>
                <h3 className="font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-clinical-600)] transition-colors">{a.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">{a.excerpt}</p>
                <span className="inline-block mt-4 text-sm font-medium text-[var(--color-clinical-600)]">
                  {t("common.readMore")} →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* === SECTION 11: Watch & Learn (Client Component) === */}
      <WatchAndLearn />

      {/* === Pain Wizard === */}
      <PainWizard />

      {/* === SECTION 12: Clinic Experience === */}
      <section id="clinic" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-[var(--color-clinical-600)] uppercase tracking-wider mb-2">
              {t("section.clinic")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3">
              {t("clinic.title")}
            </h2>
          </div>

          {/* 7-Step First Visit Journey */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: "01", titleKey: "clinic.step1.title", descKey: "clinic.step1.desc" },
              { step: "02", titleKey: "clinic.step2.title", descKey: "clinic.step2.desc" },
              { step: "03", titleKey: "clinic.step3.title", descKey: "clinic.step3.desc" },
              { step: "04", titleKey: "clinic.step4.title", descKey: "clinic.step4.desc" },
              { step: "05", titleKey: "clinic.step5.title", descKey: "clinic.step5.desc" },
              { step: "06", titleKey: "clinic.step6.title", descKey: "clinic.step6.desc" },
              { step: "07", titleKey: "clinic.step7.title", descKey: "clinic.step7.desc" },
            ].map((s) => (
              <div key={s.step} className="p-5 rounded-xl border border-[var(--color-surface-200)] bg-[var(--color-surface-50)] text-center">
                <div className="w-10 h-10 rounded-full bg-[var(--color-clinical-500)] text-white font-bold text-sm flex items-center justify-center mx-auto mb-3">
                  {s.step}
                </div>
                <h4 className="font-bold text-[var(--color-text-primary)] mb-1">{t(s.titleKey)}</h4>
                <p className="text-xs text-[var(--color-text-secondary)]">{t(s.descKey)}</p>
              </div>
            ))}
          </div>

          {/* Clinic details */}
          <div className="mt-10 p-6 rounded-xl bg-[var(--color-surface-50)] border border-[var(--color-surface-200)] grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <h4 className="font-bold text-[var(--color-text-primary)] mb-1">📍 {t("clinic.locationLabel")}</h4>
              <p className="text-sm text-[var(--color-text-secondary)]">{t("clinic.locationValue")}</p>
            </div>
            <div>
              <h4 className="font-bold text-[var(--color-text-primary)] mb-1">🕐 {t("clinic.hoursLabel")}</h4>
              <p className="text-sm text-[var(--color-text-secondary)]">{t("clinic.hoursValue")}</p>
            </div>
            <div>
              <h4 className="font-bold text-[var(--color-text-primary)] mb-1">🏥 {t("clinic.facilitiesLabel")}</h4>
              <p className="text-sm text-[var(--color-text-secondary)]">{t("clinic.facilitiesValue")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION 13: Final CTA === */}
      <section id="book" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--color-primary-900)] to-[var(--color-primary-700)] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t("cta.title")}
          </h2>
          <p className="text-lg text-white/80 mb-8">
            {t("cta.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919769682366"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-[var(--color-primary-900)] font-semibold text-lg hover:bg-[var(--color-surface-100)] transition-colors"
            >
              📞 {t("cta.call")}
            </a>
            <a
              href="https://wa.me/919769682366"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-green-600 text-white font-semibold text-lg hover:bg-green-700 transition-colors"
            >
              💬 {t("cta.whatsapp")}
            </a>
          </div>

          <p className="mt-6 text-sm text-white/50">
            {t("footer.bookOnline")}
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      {show3DViewer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative w-[90%] max-w-[800px] h-[90%] max-h-[800px]">
            <div className="absolute inset-0 z-10">
              <HumanBody3DViewer onClose={() => setShow3DViewer(false)} />
            </div>
            <button
              onClick={() => setShow3DViewer(false)}
              className="absolute top-2 right-2 z-20 rounded-full bg-white/20 backdrop-blur-sm py-1 px-3 text-white hover:bg-white/30 transition-colors"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
