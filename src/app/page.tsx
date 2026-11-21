"use client";

import BodyMap from "@/components/medical/BodyMap";
import SensationExplorer from "@/components/medical/SensationExplorer";
import PainWizard from "@/components/medical/PainWizard";
import NervePathway from "@/components/medical/svgs/NervePathway";
import SpinalStenosis from "@/components/medical/svgs/SpinalStenosis";
import WatchAndLearn from "@/components/medical/WatchAndLearn";
import HumanBody3DViewer from "@/components/medical/HumanBody3DViewer";
// import PainNavigator from "@/components/medical/PainNavigator";
import Image from "next/image";
import HeroSpine from "@/components/home/HeroSpine";
import { PhoneIcon, WhatsAppIcon, ArrowIcon, PinIcon, ClockIcon, ScanIcon, AlertIcon, CalendarIcon, CheckIcon } from "@/components/ui/Icons";
import Button from "@/components/ui/Button";
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
      {/* ================= HERO ================= */}
      <section id="hero" className="relative isolate overflow-hidden bg-[var(--ink)] text-white">
        {/* soft light behind portrait */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(closest-side,rgba(116,102,198,0.45),transparent)]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]" aria-hidden="true" />

        <div className="container-page relative grid lg:grid-cols-12 gap-12 lg:gap-8 pt-14 pb-16 sm:pt-20 lg:pt-24 lg:pb-24 items-center">
          <div className="lg:col-span-7">
            <p className="kicker !text-[var(--color-primary-200)]">{t("doctor.specialty")}, Surat</p>
            <h1 className="text-white max-w-[17ch]">{t("hero.headline")}</h1>
            <p className="mt-7 text-lg sm:text-xl text-white/72 max-w-[36rem] leading-relaxed">
              {t("hero.subtitle")}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Button label={t("hero.cta.primary")} href="#book" variant="primary" size="lg" icon={<CalendarIcon />} />
              <Button label={t("hero.cta.secondary")} href="/pain-navigator" variant="secondary" size="lg" />
            </div>

            <dl className="mt-14 grid grid-cols-3 max-w-xl divide-x divide-white/12 border-t border-white/12 pt-6">
              {[
                { v: "15+", k: t("hero.stats.experience") },
                { v: "10,000+", k: t("hero.stats.patients") },
                { v: "20+", k: t("hero.stats.conditions") },
              ].map((s, i) => (
                <div key={s.k} className={i === 0 ? "pr-4" : "px-4"}>
                  <dt className="sr-only">{s.k}</dt>
                  <dd className="font-display text-[1.7rem] sm:text-4xl text-white whitespace-nowrap">{s.v}</dd>
                  <dd className="mt-1 text-[13px] sm:text-sm text-white/60 leading-snug">{s.k}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Spine + portrait: two separate columns with clear space between them */}
          <div className="lg:col-span-5 mx-auto w-full max-w-[30rem] flex items-center gap-4 sm:gap-10">
            <HeroSpine className="shrink-0 h-[15rem] sm:h-[24rem] w-auto" />
            <div className="relative flex-1 min-w-0">
              <div className="relative rounded-t-[999px] rounded-b-[2rem] overflow-hidden bg-gradient-to-b from-[#3a2f7a] via-[#5a4bb0] to-[#c9c2ee] aspect-[4/5]">
                <Image
                  src="/doctor-photo.png"
                  alt="Dr. Shahnawaz F Shah"
                  width={376}
                  height={354}
                  priority
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[112%] max-w-none h-auto"
                />
              </div>
              <div className="relative z-20 mt-4 rounded-2xl bg-white text-[var(--ink)] px-4 py-3 sm:px-5 sm:py-4 shadow-[var(--shadow-xl)]">
                <p className="font-display text-lg sm:text-xl leading-tight">Dr. Shahnawaz F Shah</p>
                <p className="mt-1 text-[13px] sm:text-sm leading-snug text-[var(--color-text-secondary)]">MBBS, MD (Anaesthesiology), FIAPM, FCPM, FPM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PAIN NAVIGATOR BAND ================= */}
      <section className="bg-white border-b border-[var(--line)]">
        <div className="container-page py-8 grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div className="flex gap-4 items-start">
            <span className="mt-1 shrink-0 h-11 w-11 rounded-full bg-[var(--iris-soft)] text-[var(--iris)] flex items-center justify-center"><ScanIcon /></span>
            <div>
              <p className="font-semibold text-[var(--ink)] text-lg">{t("painNav.title")}</p>
              <p className="text-[var(--color-text-secondary)] max-w-2xl">{t("painNav.subtitle")}</p>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">{t("painNav.disclaimer")}</p>
            </div>
          </div>
          <Button label={t("painNav.cta").replace(/\s*→\s*$/, "")} href="/pain-navigator" variant="outline" size="md" icon={<ArrowIcon />} iconPosition="right" />
        </div>
      </section>

      {/* ================= BODY MAP & SENSATIONS (interactive) ================= */}
      <BodyMap />
      <SensationExplorer />

      {/* ================= UNDERSTAND PAIN ================= */}
      <section id="understand-pain" className="py-24 lg:py-32 bg-white">
        <div className="container-page">
          <div className="section-head">
            <h2>{t("pain.title")}</h2>
            <p>{t("pain.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-[var(--line)] rounded-[1.5rem] overflow-hidden ring-1 ring-[var(--line)] mb-16">
            {[
              { title: t("pain.nociceptive"), desc: t("pain.nociceptiveDesc"), color: "var(--color-pathway-nociceptive)" },
              { title: t("pain.neuropathic"), desc: t("pain.neuropathicDesc"), color: "var(--color-pathway-neuropathic)" },
              { title: t("pain.nociplastic"), desc: t("pain.nociplasticDesc"), color: "var(--color-pathway-nociplastic)" },
            ].map((p) => (
              <div key={p.title} className="bg-white p-8">
                <span className="block h-1.5 w-10 rounded-full mb-6" style={{ background: p.color }} />
                <h3 className="text-[var(--ink)] mb-3">{p.title}</h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="space-y-16">
            <NervePathway />
            <SpinalStenosis />
          </div>
        </div>
      </section>

      {/* ================= CONDITIONS ================= */}
      <section id="conditions" className="py-24 lg:py-32">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div className="section-head !mb-0">
              <h2>{t("conditions.title")}</h2>
              <p>{t("conditions.subtitle")}</p>
            </div>
            <a href="/conditions" className="inline-flex items-center gap-2 font-semibold text-[var(--iris)] hover:gap-3 transition-all shrink-0">
              All conditions <ArrowIcon />
            </a>
          </div>

          <ul className="grid md:grid-cols-2 gap-x-12 border-t border-[var(--line)]">
            {featuredConditions.map((c) => (
              <li key={c.slug} className="border-b border-[var(--line)]">
                <a href={`/conditions/${c.slug}`} className="group flex items-start gap-5 py-6">
                  <span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full ring-4 ring-[var(--panel)]" style={{ background: c.color }} aria-hidden="true" />
                  <span className="flex-1">
                    <span className="block font-display text-2xl text-[var(--ink)] group-hover:text-[var(--iris)] transition-colors">{c.name}</span>
                    <span className="block mt-1 text-[var(--color-text-secondary)]">{c.description}</span>
                  </span>
                  <span className="mt-2 h-9 w-9 shrink-0 rounded-full ring-1 ring-[var(--line)] flex items-center justify-center text-[var(--color-text-muted)] group-hover:bg-[var(--ink)] group-hover:text-white group-hover:ring-[var(--ink)] transition-colors">
                    <ArrowIcon />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= TREATMENT LADDER ================= */}
      <section id="treatment" className="py-24 lg:py-32 bg-[var(--ink)] text-white on-dark">
        <div className="container-page">
          <div className="section-head">
            <h2>{t("treatment.title")}</h2>
            <p>{t("treatment.subtitle")}</p>
          </div>

          <ol className="grid md:grid-cols-4 gap-4 md:items-end">
            {treatmentLadder.map((s, i) => (
              <li
                key={s.step}
                className="relative rounded-[1.25rem] bg-white/[0.05] ring-1 ring-white/10 p-6 flex flex-col"
                style={{ minHeight: `${15 + i * 3.5}rem` }}
              >
                <span className="font-display text-5xl text-white/25">{s.step}</span>
                <div className="mt-auto pt-8">
                  <span className="block h-1 w-8 rounded-full mb-4" style={{ background: i === 3 ? "var(--signal)" : `rgba(205,199,238,${0.35 + i * 0.2})` }} />
                  <h3 className="text-white mb-2">{s.titleKey}</h3>
                  <p className="text-white/65 text-[0.95rem] leading-relaxed">{s.descriptionKey}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= PROCEDURES ================= */}
      <section id="procedures" className="py-24 lg:py-32">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div className="section-head !mb-0">
              <h2>{t("procedures.title")}</h2>
              <p>{t("procedures.subtitle")}</p>
            </div>
            <a href="/procedures" className="inline-flex items-center gap-2 font-semibold text-[var(--iris)] hover:gap-3 transition-all shrink-0">
              All procedures <ArrowIcon />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: "Radiofrequency Ablation", desc: "Thermal neurotomy for facet joint and nerve-mediated pain.", slug: "radiofrequency-ablation", tag: "Fluoroscopy-guided" },
              { name: "Lumbar Epidural Injection", desc: "Targeted steroid delivery for nerve root inflammation.", slug: "lumbar-epidural-injection", tag: "Fluoroscopy-guided" },
              { name: "Medial Branch Block", desc: "Diagnostic confirmation for facet joint pain.", slug: "medial-branch-block", tag: "Diagnostic" },
              { name: "SI Joint Injection", desc: "Precise injection for sacroiliac joint dysfunction.", slug: "si-joint-injection", tag: "Image-guided" },
              { name: "Spinal Cord Stimulation", desc: "Neuromodulation for chronic intractable pain.", slug: "spinal-cord-stimulation", tag: "Neuromodulation" },
              { name: "Trigger Point Injection", desc: "Myofascial trigger point disruption and pain relief.", slug: "trigger-point-injection", tag: "Ultrasound-guided" },
            ].map((p) => (
              <a key={p.slug} href={`/procedures/${p.slug}`} className="card group p-7 flex flex-col">
                <span className="self-start text-[13px] font-medium text-[var(--iris)] bg-[var(--iris-soft)] rounded-full px-3 py-1">{p.tag}</span>
                <h3 className="mt-6 text-[var(--ink)]">{p.name}</h3>
                <p className="mt-2 text-[var(--color-text-secondary)] flex-1">{p.desc}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink)] group-hover:text-[var(--iris)] transition-colors">
                  {t("common.learnMore")} <ArrowIcon />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= RED FLAGS ================= */}
      <section id="red-flags" className="py-20 lg:py-24 bg-white">
        <div className="container-page">
          <div className="rounded-[2rem] bg-[#fff4f5] ring-1 ring-[#f3cfd4] p-8 sm:p-12 lg:p-14 grid lg:grid-cols-[0.9fr_1.1fr] gap-10">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--signal)] text-white text-sm font-semibold px-3.5 py-1.5">
                <AlertIcon className="w-4 h-4" /> Seek care urgently
              </span>
              <h2 className="mt-6 text-[#7d1422]">{t("redflags.title")}</h2>
              <p className="mt-4 text-lg text-[#6b3940] max-w-md">{t("redflags.subtitle")}</p>
            </div>
            <ul className="divide-y divide-[#f3cfd4] self-center">
              {redFlags.map((rf) => (
                <li key={rf.title} className="py-5 first:pt-0 last:pb-0 flex gap-4">
                  <span className={`mt-1 shrink-0 text-xs font-bold uppercase tracking-wide rounded-md px-2 py-1 h-fit ${rf.urgency === "Emergency" ? "bg-[var(--signal)] text-white" : "bg-[#f9dfe2] text-[#9b1c2c]"}`}>
                    {rf.urgency}
                  </span>
                  <div>
                    <h3 className="text-[#3d0d14] text-lg">{rf.title}</h3>
                    <p className="text-[#6b3940]">{rf.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================= MEET DR. SHAH ================= */}
      <section id="about" className="py-24 lg:py-32 bg-white">
        <div className="container-page grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-b from-[var(--panel)] to-[#d9d4f1] aspect-[5/6] max-w-md">
              <Image src="/doctor-photo.png" alt="Dr. Shahnawaz F Shah" width={376} height={354} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[105%] max-w-none h-auto" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <h2 className="text-[var(--ink)]">{t("doctor.title")}</h2>
            <p className="mt-2 text-lg font-medium text-[var(--iris)]">{t("doctor.specialty")}</p>
            <p className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">{t("doctor.bio")}</p>

            <h3 className="mt-10 text-[var(--ink)]">{t("doctor.educationTitle")}</h3>
            <ul className="mt-4 border-t border-[var(--line)]">
              {["doctor.degree1", "doctor.degree2", "doctor.degree3", "doctor.degree4"].map((k) => (
                <li key={k} className="flex items-center gap-3 py-3.5 border-b border-[var(--line)] text-[var(--color-text-primary)]">
                  <CheckIcon className="w-4 h-4 text-[var(--relief)] shrink-0" />
                  {t(k)}
                </li>
              ))}
            </ul>

            <div className="mt-10 grid sm:grid-cols-3 gap-6">
              {[
                { titleKey: "doctor.precisions", descKey: "doctor.precisionsDesc" },
                { titleKey: "doctor.evidence", descKey: "doctor.evidenceDesc" },
                { titleKey: "doctor.empowerment", descKey: "doctor.empowermentDesc" },
              ].map((p) => (
                <div key={p.titleKey} className="border-l-2 border-[var(--color-primary-200)] pl-4">
                  <h4 className="text-[var(--ink)]">{t(p.titleKey)}</h4>
                  <p className="mt-1 text-sm text-[var(--color-text-muted)]">{t(p.descKey)}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button label="Read Dr. Shah's full profile" href="/doctor" variant="outline" icon={<ArrowIcon />} iconPosition="right" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= ARTICLES ================= */}
      <section id="education" className="py-24 lg:py-32">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div className="section-head !mb-0"><h2>{t("education.title")}</h2></div>
            <a href="/education" className="inline-flex items-center gap-2 font-semibold text-[var(--iris)] hover:gap-3 transition-all shrink-0">
              All articles <ArrowIcon />
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {articles.map((a) => (
              <a key={a.slug} href={`/education/${a.slug}`} className="card group p-7 flex flex-col">
                <p className="text-sm text-[var(--color-text-muted)]">
                  <span className="font-semibold text-[var(--iris)]">{a.category}</span>
                  <span className="mx-2">/</span>
                  {a.readTime} read
                </p>
                <h3 className="mt-4 font-display !font-medium text-[1.65rem] leading-tight text-[var(--ink)] group-hover:text-[var(--iris)] transition-colors">{a.title}</h3>
                <p className="mt-3 text-[var(--color-text-secondary)] flex-1">{a.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink)]">{t("common.readMore")} <ArrowIcon /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= VIDEOS & ASSESSMENT ================= */}
      <WatchAndLearn />
      <PainWizard />

      {/* ================= CLINIC JOURNEY ================= */}
      <section id="clinic" className="py-24 lg:py-32 bg-white">
        <div className="container-page">
          <div className="section-head">
            <h2>{t("clinic.title")}</h2>
          </div>

          <ol className="relative grid sm:grid-cols-2 lg:grid-cols-7 gap-8 lg:gap-4">
            <span className="hidden lg:block absolute left-0 right-0 top-[1.15rem] h-px bg-[var(--line)]" aria-hidden="true" />
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <li key={n} className="relative">
                <span className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${n === 6 ? "bg-[var(--signal)] text-white" : "bg-[var(--ink)] text-white"}`}>{n}</span>
                <h4 className="mt-5 text-[var(--ink)]">{t(`clinic.step${n}.title`)}</h4>
                <p className="mt-1.5 text-sm text-[var(--color-text-secondary)]">{t(`clinic.step${n}.desc`)}</p>
              </li>
            ))}
          </ol>

          <div className="mt-16 grid sm:grid-cols-3 rounded-[1.5rem] bg-[var(--paper)] ring-1 ring-[var(--line)] divide-y sm:divide-y-0 sm:divide-x divide-[var(--line)]">
            {[
              { icon: <PinIcon />, label: t("clinic.locationLabel"), value: t("clinic.locationValue") },
              { icon: <ClockIcon />, label: t("clinic.hoursLabel"), value: t("clinic.hoursValue") },
              { icon: <ScanIcon />, label: t("clinic.facilitiesLabel"), value: t("clinic.facilitiesValue") },
            ].map((d) => (
              <div key={d.label} className="flex gap-4 p-6 sm:p-7">
                <span className="text-[var(--iris)] mt-0.5">{d.icon}</span>
                <div>
                  <p className="text-sm text-[var(--color-text-muted)]">{d.label}</p>
                  <p className="font-semibold text-[var(--ink)]">{d.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BOOK ================= */}
      <section id="book" className="relative isolate overflow-hidden bg-[var(--ink)] text-white">
        <div className="pointer-events-none absolute -left-32 -bottom-48 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(208,42,60,0.28),transparent)]" aria-hidden="true" />
        <div className="container-page relative py-20 lg:py-28 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-end">
          <div>
            <h2 className="text-white max-w-[16ch]">{t("cta.title")}</h2>
            <p className="mt-5 text-lg sm:text-xl text-white/70 max-w-xl">{t("cta.description")}</p>
          </div>
          <div className="lg:justify-self-end w-full lg:w-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button label={t("cta.call")} href="tel:+919769682366" variant="light" size="lg" icon={<PhoneIcon />} />
              <Button label={t("cta.whatsapp")} href="https://wa.me/919769682366" variant="whatsapp" size="lg" newTab icon={<WhatsAppIcon />} />
            </div>
            <p className="mt-4 text-white/55 text-sm">+91 97696 82366 · {t("clinic.hoursValue")}</p>
          </div>
        </div>
      </section>

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
