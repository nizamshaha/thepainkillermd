"use client";

import Logo from "@/components/ui/Logo";
import Flag from "@/components/ui/Flag";
import VisitorCount from "@/components/ui/VisitorCount";
import { useT } from "@/lib/useT";
import NewsletterSignup from "@/components/ui/NewsletterSignup";
import { PhoneIcon, WhatsAppIcon, CalendarIcon } from "@/components/ui/Icons";

export default function Footer() {
  const t = useT();

  return (
    <>
      {/* Footer */}
      <footer className="bg-[var(--color-primary-950)] text-white pt-16 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 mb-12">
            {/* Brand */}
            <div>
              <Logo size="md" variant="light" />
              <div className="flex items-center gap-2 mt-5 text-sm text-white/80">
                <Flag country="IN" size="sm" />
                <span className="font-medium">Surat, Gujarat, India</span>
              </div>
              <p className="text-[0.95rem] text-white/60 leading-relaxed mt-5 max-w-xs">
                {t("footer.brand")}
              </p>
            </div>

            {/* Conditions */}
            <div>
              <h4 className="font-semibold text-[0.95rem] text-white mb-4">{t("nav.conditions")}</h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Sciatica", slug: "sciatica" },
                  { label: "Spinal Stenosis", slug: "lumbar-spinal-stenosis" },
                  { label: "Cervical Radiculopathy", slug: "cervical-radiculopathy" },
                  { label: "CRPS", slug: "complex-regional-pain-syndrome" },
                  { label: "Trigeminal Neuralgia", slug: "trigeminal-neuralgia" },
                ].map((c) => (
                  <li key={c.slug}>
                    <a href={`/conditions/${c.slug}`} className="text-[0.95rem] text-white/60 hover:text-white transition-colors">
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Procedures */}
            <div>
              <h4 className="font-semibold text-[0.95rem] text-white mb-4">{t("nav.procedures")}</h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Radiofrequency Ablation", slug: "radiofrequency-ablation" },
                  { label: "Epidural Injections", slug: "lumbar-epidural-injection" },
                  { label: "Medial Branch Blocks", slug: "medial-branch-block" },
                  { label: "SI Joint Injections", slug: "si-joint-injection" },
                  { label: "Spinal Cord Stimulation", slug: "spinal-cord-stimulation" },
                ].map((p) => (
                  <li key={p.slug}>
                    <a href={`/procedures/${p.slug}`} className="text-[0.95rem] text-white/60 hover:text-white transition-colors">
                      {p.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal / Information */}
            <div>
              <h4 className="font-semibold text-[0.95rem] text-white mb-4">{t("footer.quickLinks")}</h4>
              <ul className="space-y-2.5">
                {[
                  { label: t("header.videos"), href: "/videos" },
                  { label: t("footer.privacy"), href: "/privacy" },
                  { label: t("footer.terms"), href: "/terms" },
                  { label: t("footer.editorial"), href: "/editorial" },
                  { label: t("footer.patientInfo"), href: "/patient-info" },
                ].map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-[0.95rem] text-white/60 hover:text-white transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="py-10 border-t border-white/10 grid lg:grid-cols-[1fr_1.3fr] gap-6 items-center">
            <h4 className="font-display text-3xl text-white">{t("newsletter.title")}</h4>
            <NewsletterSignup />
          </div>

          {/* Medical Disclaimer */}
          <div className="pt-8 border-t border-white/10">
            <p className="text-[13px] text-white/45 max-w-3xl leading-relaxed">
              <strong className="text-white/60">Medical Disclaimer:</strong>{" "}
              {t("footer.disclaimer").replace("Medical Disclaimer: ", "")}
            </p>
            <div className="mt-4 pb-40 md:pb-0 flex flex-wrap items-center justify-between gap-4">
              <p className="text-[13px] text-white/35">
                © {new Date().getFullYear()} THE PAINKILLER MD. All rights reserved.
              </p>
              <VisitorCount />
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Action Bar */}
      <div className="mobile-action-bar !gap-2 !px-3" role="complementary" aria-label="Quick actions">
        <a
          href="tel:+919769682366"
          className="flex-1 justify-center whitespace-nowrap flex items-center gap-1.5 px-3 py-2 rounded-full text-[13px] bg-[var(--color-primary-900)] text-white text-sm font-semibold hover:bg-[var(--color-primary-800)] transition-colors min-h-[44px]"
        >
          <PhoneIcon className="w-4 h-4" /> {t("cta.call")}
        </a>
        <a
          href="https://wa.me/919769682366"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 justify-center whitespace-nowrap flex items-center gap-1.5 px-3 py-2 rounded-full text-[13px] bg-[#178a4c] text-white text-sm font-semibold hover:bg-[#127440] transition-colors min-h-[44px]"
        >
          <WhatsAppIcon className="w-4 h-4" /> {t("cta.whatsapp")}
        </a>
        <a
          href="/#book"
          className="flex-1 justify-center whitespace-nowrap flex items-center gap-1.5 px-3 py-2 rounded-full text-[13px] bg-[var(--signal)] text-white text-sm font-semibold hover:bg-[var(--signal-dark)] transition-colors min-h-[44px]"
        >
          <CalendarIcon className="w-4 h-4" /> {t("nav.contact").split(" ")[0]}
        </a>
      </div>
    </>
  );
}
