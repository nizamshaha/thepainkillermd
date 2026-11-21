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
import RotatingHeadline from "@/components/home/RotatingHeadline";
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
    <div className="min-h-screen bg-[var(--white)]">
      {/* ================= HERO — text left, compact professional portrait right ================= */}
      <section id="hero" className="relative overflow-hidden bg-[var(--white)]">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,#efe7fd,transparent)]" aria-hidden="true" />
        <div className="container-page relative grid lg:grid-cols-[1.25fr_0.75fr] gap-12 lg:gap-16 items-center pt-14 pb-20 sm:pt-20 lg:pt-24 lg:pb-28">
          <div className="text-center lg:text-left">
            <p className="hero-line kicker">{t("doctor.specialty")}, Surat</p>
            <div className="hero-line" style={{ animationDelay: "120ms" }}>
              <RotatingHeadline className="mx-auto lg:mx-0 text-center lg:text-left" />
            </div>
            <p className="hero-line mt-6 max-w-[36rem] mx-auto lg:mx-0 text-[clamp(1.1rem,0.6vw+0.95rem,1.3rem)] leading-[1.5] text-[var(--grey)]" style={{ animationDelay: "240ms" }}>
              {t("hero.subtitle")}
            </p>
            <div className="hero-line mt-9 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3" style={{ animationDelay: "360ms" }}>
              <Button label={t("hero.cta.primary")} href="#book" variant="primary" size="lg" icon={<CalendarIcon />} />
              <Button label={t("hero.cta.secondary")} href="/pain-navigator" variant="outline" size="lg" />
            </div>
            <dl className="hero-line mt-12 grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0" style={{ animationDelay: "480ms" }}>
              {[["15+", t("hero.stats.experience")], ["10,000+", t("hero.stats.patients")], ["20+", t("hero.stats.conditions")]].map(([v, k]) => (
                <div key={k} className="rounded-2xl bg-[var(--mist)] px-3 py-4 text-center lg:text-left lg:px-5">
                  <dd className="text-2xl sm:text-[1.75rem] font-semibold tracking-[-0.03em] text-[var(--purple)]">{v}</dd>
                  <dt className="mt-0.5 text-xs sm:text-sm text-[var(--grey)] leading-tight">{k}</dt>
                </div>
              ))}
            </dl>
          </div>

          {/* Compact portrait card */}
          <figure className="hero-portrait m-0 mx-auto w-full max-w-[16rem] sm:max-w-[22rem]">
            <div className="relative rounded-[2rem] p-2 bg-white shadow-[0_30px_60px_-30px_rgba(61,29,120,0.45)] ring-1 ring-[var(--hairline)]">
              <div className="relative aspect-[4/5] rounded-[1.6rem] overflow-hidden bg-[linear-gradient(180deg,#f1ebfd_0%,#d9ccf6_55%,#a98ae6_100%)]">
                <Image src="/doctor-photo.png" alt="Dr. Shahnawaz F Shah" width={376} height={354} priority className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[104%] max-w-none h-auto" />
              </div>
            </div>
            <figcaption className="mt-5 text-center">
              <p className="text-lg font-semibold tracking-[-0.02em] text-[var(--ink)]">Dr. Shahnawaz F Shah</p>
              <p className="mt-0.5 text-sm text-[var(--grey)]">MBBS, MD (Anaesthesiology), FIAPM, FCPM, FPM</p>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ================= PAIN NAVIGATOR — dark tile ================= */}
      <section className="pt-24 sm:pt-32">
        <div className="container-page">
          <div className="reveal tile tile-night px-6 py-16 sm:px-16 sm:py-24 text-center bg-[radial-gradient(80%_120%_at_50%_0%,#3d1d78_0%,#170f2c_70%)]">
            <h2 className="text-white mx-auto max-w-[18ch]">{t("painNav.title")}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg sm:text-xl text-white/70">{t("painNav.subtitle")}</p>
            <div className="mt-9 flex justify-center">
              <Button label={t("painNav.cta").replace(/\s*→\s*$/, "")} href="/pain-navigator" variant="light" size="lg" icon={<ArrowIcon />} iconPosition="right" />
            </div>
            <p className="mt-5 text-sm text-white/45">{t("painNav.disclaimer")}</p>
          </div>
        </div>
      </section>

      {/* ================= BODY MAP & SENSATIONS ================= */}
      <BodyMap />
      <SensationExplorer />

      {/* ================= CARE LADDER — bento ================= */}
      <section id="treatment" className="py-24 sm:py-32 bg-[var(--white)]">
        <div className="container-page">
          <div className="section-head reveal">
            <h2>{t("treatment.title")}</h2>
            <p>{t("treatment.subtitle")}</p>
          </div>
          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {treatmentLadder.map((s, i) => {
              const bg = ["bg-[var(--mist)] text-[var(--ink)]", "bg-[var(--lavender)] text-[var(--ink)]", "bg-[#a98ae6] text-white", "bg-[var(--purple)] text-white"][i];
              return (
                <li key={s.step} className={`reveal tile ${bg} p-8 min-h-[19rem] flex flex-col`} style={{ ["--d" as string]: `${i * 90}ms` }}>
                  <span className={`text-sm font-semibold ${i > 1 ? "text-white/70" : "text-[var(--purple)]"}`}>Step {i + 1}</span>
                  <h3 className="mt-auto text-2xl">{s.titleKey}</h3>
                  <p className={`mt-3 ${i > 1 ? "text-white/80" : "text-[var(--grey)]"}`}>{s.descriptionKey}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ================= CONDITIONS ================= */}
      <section id="conditions" className="py-24 sm:py-32 bg-[var(--mist)]">
        <div className="container-page">
          <div className="section-head reveal">
            <h2>{t("conditions.title")}</h2>
            <p>{t("conditions.subtitle")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredConditions.map((c, i) => (
              <a key={c.slug} href={`/conditions/${c.slug}`} className="reveal card group p-7 flex flex-col min-h-[13rem]" style={{ ["--d" as string]: `${(i % 4) * 70}ms` }}>
                <h3 className="text-[1.35rem] text-[var(--ink)]">{c.name}</h3>
                <p className="mt-2 text-[15px] text-[var(--grey)] flex-1">{c.description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-medium text-[var(--purple)]">
                  {t("common.readMore")} <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button label="View all conditions" href="/conditions" variant="outline" />
          </div>
        </div>
      </section>

      {/* ================= PROCEDURES ================= */}
      <section id="procedures" className="py-24 sm:py-32 bg-[var(--white)]">
        <div className="container-page">
          <div className="section-head reveal">
            <h2>{t("procedures.title")}</h2>
            <p>{t("procedures.subtitle")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Radiofrequency Ablation", desc: "Thermal neurotomy for facet joint and nerve-mediated pain.", slug: "radiofrequency-ablation", tag: "Fluoroscopy-guided" },
              { name: "Lumbar Epidural Injection", desc: "Targeted steroid delivery for nerve root inflammation.", slug: "lumbar-epidural-injection", tag: "Fluoroscopy-guided" },
              { name: "Medial Branch Block", desc: "Diagnostic confirmation for facet joint pain.", slug: "medial-branch-block", tag: "Diagnostic" },
              { name: "SI Joint Injection", desc: "Precise injection for sacroiliac joint dysfunction.", slug: "si-joint-injection", tag: "Image-guided" },
              { name: "Spinal Cord Stimulation", desc: "Neuromodulation for chronic intractable pain.", slug: "spinal-cord-stimulation", tag: "Neuromodulation" },
              { name: "Trigger Point Injection", desc: "Myofascial trigger point disruption and pain relief.", slug: "trigger-point-injection", tag: "Ultrasound-guided" },
            ].map((p, i) => (
              <a key={p.slug} href={`/procedures/${p.slug}`} className="reveal tile tile-mist group p-8 min-h-[15rem] flex flex-col transition-transform duration-500 hover:scale-[1.015]" style={{ ["--d" as string]: `${(i % 3) * 80}ms` }}>
                <span className="text-sm font-medium text-[var(--purple)]">{p.tag}</span>
                <h3 className="mt-3 text-2xl text-[var(--ink)]">{p.name}</h3>
                <p className="mt-2 text-[var(--grey)] flex-1">{p.desc}</p>
                <span className="mt-6 self-start h-9 w-9 rounded-full bg-white flex items-center justify-center text-[var(--purple)] shadow-[var(--shadow-md)] group-hover:bg-[var(--purple)] group-hover:text-white transition-colors">
                  <ArrowIcon />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= UNDERSTAND PAIN ================= */}
      <section id="understand-pain" className="py-24 sm:py-32 bg-[var(--mist)]">
        <div className="container-page">
          <div className="section-head reveal">
            <h2>{t("pain.title")}</h2>
            <p>{t("pain.subtitle")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-16">
            {[
              { title: t("pain.nociceptive"), desc: t("pain.nociceptiveDesc"), color: "var(--color-pathway-nociceptive)" },
              { title: t("pain.neuropathic"), desc: t("pain.neuropathicDesc"), color: "var(--color-pathway-neuropathic)" },
              { title: t("pain.nociplastic"), desc: t("pain.nociplasticDesc"), color: "var(--color-pathway-nociplastic)" },
            ].map((p, i) => (
              <div key={p.title} className="reveal tile p-8" style={{ ["--d" as string]: `${i * 90}ms` }}>
                <span className="block h-2 w-2 rounded-full mb-6" style={{ background: p.color, boxShadow: `0 0 0 6px color-mix(in srgb, ${p.color} 15%, white)` }} />
                <h3 className="text-[var(--ink)]">{p.title}</h3>
                <p className="mt-3 text-[var(--grey)] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="reveal flex flex-col gap-24">
            <NervePathway />
            <SpinalStenosis />
          </div>
        </div>
      </section>

      {/* ================= RED FLAGS ================= */}
      <section id="red-flags" className="py-24 bg-[var(--white)]">
        <div className="container-page">
          <div className="reveal tile bg-[#fff5f6] ring-1 ring-[#f6d3d8] p-8 sm:p-14 grid lg:grid-cols-[0.9fr_1.1fr] gap-10">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#c0283a] text-white text-sm font-semibold px-3.5 py-1.5">
                <AlertIcon className="w-4 h-4" /> Seek care urgently
              </span>
              <h2 className="mt-6 text-[#6d1220] !text-[clamp(2rem,2.6vw+0.8rem,3rem)]">{t("redflags.title")}</h2>
              <p className="mt-4 text-lg text-[#6b3940] max-w-md">{t("redflags.subtitle")}</p>
            </div>
            <ul className="divide-y divide-[#f6d3d8] self-center">
              {redFlags.map((rf) => (
                <li key={rf.title} className="py-5 first:pt-0 last:pb-0">
                  <span className={`text-xs font-semibold uppercase tracking-wide ${rf.urgency === "Emergency" ? "text-[#c0283a]" : "text-[#b35a12]"}`}>{rf.urgency}</span>
                  <h3 className="mt-1 text-[#3d0d14] text-lg">{rf.title}</h3>
                  <p className="text-[#6b3940]">{rf.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================= MEET DR. SHAH — dark stage ================= */}
      <section id="about" className="py-24 sm:py-32 bg-[var(--night)] text-white overflow-hidden">
        <div className="container-page grid lg:grid-cols-2 gap-14 items-center">
          <div className="reveal order-2 lg:order-1">
            <p className="kicker !text-[var(--lilac)]">{t("doctor.specialty")}</p>
            <h2 className="text-white">{t("doctor.title")}</h2>
            <p className="mt-6 text-lg sm:text-xl text-white/70 leading-relaxed">{t("doctor.bio")}</p>
            <ul className="mt-10 grid sm:grid-cols-2 gap-3">
              {["doctor.degree1", "doctor.degree2", "doctor.degree3", "doctor.degree4"].map((k) => (
                <li key={k} className="rounded-2xl bg-white/[0.06] ring-1 ring-white/10 px-5 py-4 flex gap-3 text-[15px] text-white/90">
                  <CheckIcon className="w-4 h-4 mt-1 text-[var(--lilac)] shrink-0" />
                  {t(k)}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Button label="Read full profile" href="/doctor" variant="light" />
              <Button label={t("hero.cta.primary")} href="#book" variant="secondary" />
            </div>
          </div>
          <div className="reveal order-1 lg:order-2 relative mx-auto w-full max-w-md">
            <div className="relative aspect-[4/5] rounded-t-[999px] rounded-b-[2rem] overflow-hidden bg-[radial-gradient(100%_80%_at_50%_100%,#c9b6f2_0%,#7a4fcf_45%,#3d1d78_100%)]">
              <Image src="/doctor-photo.png" alt="Dr. Shahnawaz F Shah" width={376} height={354} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[112%] max-w-none h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= ARTICLES ================= */}
      <section id="education" className="py-24 sm:py-32 bg-[var(--white)]">
        <div className="container-page">
          <div className="section-head reveal"><h2>{t("education.title")}</h2></div>
          <div className="grid md:grid-cols-3 gap-4">
            {articles.map((a, i) => (
              <a key={a.slug} href={`/education/${a.slug}`} className="reveal tile tile-mist group p-8 flex flex-col min-h-[17rem] transition-transform duration-500 hover:scale-[1.015]" style={{ ["--d" as string]: `${i * 90}ms` }}>
                <p className="text-sm text-[var(--grey)]"><span className="font-semibold text-[var(--purple)]">{a.category}</span> · {a.readTime} read</p>
                <h3 className="mt-4 text-[1.6rem] leading-tight text-[var(--ink)]">{a.title}</h3>
                <p className="mt-3 text-[var(--grey)] flex-1">{a.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-[var(--purple)]">{t("common.readMore")} <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <WatchAndLearn />
      <PainWizard />

      {/* ================= CLINIC JOURNEY ================= */}
      <section id="clinic" className="py-24 sm:py-32 bg-[var(--white)]">
        <div className="container-page">
          <div className="section-head reveal"><h2>{t("clinic.title")}</h2></div>
          <ol className="relative grid sm:grid-cols-2 lg:grid-cols-7 gap-8 lg:gap-4">
            <span className="hidden lg:block absolute left-[7%] right-[7%] top-[1.25rem] h-px bg-gradient-to-r from-[var(--lavender)] via-[var(--lilac)] to-[var(--purple)]" aria-hidden="true" />
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <li key={n} className="reveal relative lg:text-center" style={{ ["--d" as string]: `${n * 60}ms` }}>
                <span className="relative z-10 lg:mx-auto flex h-10 w-10 items-center justify-center rounded-full glass-clear border text-sm font-semibold">{n}</span>
                <h4 className="mt-5 text-[var(--ink)]">{t(`clinic.step${n}.title`)}</h4>
                <p className="mt-1.5 text-sm text-[var(--grey)]">{t(`clinic.step${n}.desc`)}</p>
              </li>
            ))}
          </ol>
          <div className="reveal mt-16 grid sm:grid-cols-3 gap-4">
            {[
              { icon: <PinIcon />, label: t("clinic.locationLabel"), value: t("clinic.locationValue") },
              { icon: <ClockIcon />, label: t("clinic.hoursLabel"), value: t("clinic.hoursValue") },
              { icon: <ScanIcon />, label: t("clinic.facilitiesLabel"), value: t("clinic.facilitiesValue") },
            ].map((d) => (
              <div key={d.label} className="tile tile-mist p-7 flex gap-4">
                <span className="h-10 w-10 shrink-0 rounded-full bg-white text-[var(--purple)] flex items-center justify-center shadow-[var(--shadow-md)]">{d.icon}</span>
                <div>
                  <p className="text-sm text-[var(--grey)]">{d.label}</p>
                  <p className="font-semibold text-[var(--ink)]">{d.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BOOK ================= */}
      <section id="book" className="pb-24 sm:pb-32 bg-[var(--white)]">
        <div className="container-page">
          <div className="reveal tile text-center px-6 py-20 sm:py-28 bg-[radial-gradient(120%_100%_at_50%_110%,#c9b6f2_0%,#7a4fcf_40%,#3d1d78_80%)] text-white">
            <h2 className="text-white mx-auto max-w-[16ch]">{t("cta.title")}</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg sm:text-xl text-white/80">{t("cta.description")}</p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button label={t("cta.call")} href="tel:+919769682366" variant="light" size="lg" icon={<PhoneIcon />} />
              <Button label={t("cta.whatsapp")} href="https://wa.me/919769682366" variant="whatsapp" size="lg" newTab icon={<WhatsAppIcon />} />
            </div>
            <p className="mt-6 text-white/70 text-[15px]">+91 97696 82366 · {t("clinic.hoursValue")}</p>
          </div>
        </div>
      </section>

      {show3DViewer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative w-[90%] max-w-[800px] h-[90%] max-h-[800px]">
            <div className="absolute inset-0 z-10">
              <HumanBody3DViewer onClose={() => setShow3DViewer(false)} />
            </div>
            <button onClick={() => setShow3DViewer(false)} className="absolute top-2 right-2 z-20 rounded-full bg-white/20 backdrop-blur-sm py-1 px-3 text-white hover:bg-white/30 transition-colors" aria-label="Close">×</button>
          </div>
        </div>
      )}
    </div>
  );
}
