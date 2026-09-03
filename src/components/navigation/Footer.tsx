"use client";

import Logo from "@/components/ui/Logo";
import { useT } from "@/lib/useT";
import NewsletterSignup from "@/components/ui/NewsletterSignup";

export default function Footer() {
  const t = useT();

  return (
    <>
      {/* Footer */}
      <footer className="bg-[var(--color-primary-900)] text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <Logo size="md" variant="light" />
              <p className="text-sm text-white/60 leading-relaxed mt-3">
                {t("footer.brand")}
              </p>
            </div>

            {/* Conditions */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-white/80 mb-3">{t("nav.conditions")}</h4>
              <ul className="space-y-1.5">
                {[
                  { label: "Sciatica", slug: "sciatica" },
                  { label: "Spinal Stenosis", slug: "lumbar-spinal-stenosis" },
                  { label: "Cervical Radiculopathy", slug: "cervical-radiculopathy" },
                  { label: "CRPS", slug: "complex-regional-pain-syndrome" },
                  { label: "Trigeminal Neuralgia", slug: "trigeminal-neuralgia" },
                ].map((c) => (
                  <li key={c.slug}>
                    <a href={`/conditions/${c.slug}`} className="text-sm text-white/50 hover:text-white transition-colors">
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Procedures */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-white/80 mb-3">{t("nav.procedures")}</h4>
              <ul className="space-y-1.5">
                {[
                  { label: "Radiofrequency Ablation", slug: "radiofrequency-ablation" },
                  { label: "Epidural Injections", slug: "lumbar-epidural-injection" },
                  { label: "Medial Branch Blocks", slug: "medial-branch-block" },
                  { label: "SI Joint Injections", slug: "si-joint-injection" },
                  { label: "Spinal Cord Stimulation", slug: "spinal-cord-stimulation" },
                ].map((p) => (
                  <li key={p.slug}>
                    <a href={`/procedures/${p.slug}`} className="text-sm text-white/50 hover:text-white transition-colors">
                      {p.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal / Information */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-white/80 mb-3">{t("footer.quickLinks")}</h4>
              <ul className="space-y-1.5">
                {[
                  { label: t("header.videos"), href: "/videos" },
                  { label: t("footer.privacy"), href: "/privacy" },
                  { label: t("footer.terms"), href: "/terms" },
                  { label: t("footer.editorial"), href: "/editorial" },
                  { label: t("footer.patientInfo"), href: "/patient-info" },
                ].map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-sm text-white/50 hover:text-white transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="pt-8 border-t border-white/10">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/80 mb-3">{t("newsletter.title")}</h4>
            <NewsletterSignup />
          </div>

          {/* Medical Disclaimer */}
          <div className="pt-8 border-t border-white/10">
            <p className="text-xs text-white/40 text-center max-w-3xl mx-auto leading-relaxed">
              <strong className="text-white/60">Medical Disclaimer:</strong>{" "}
              {t("footer.disclaimer").replace("Medical Disclaimer: ", "")}
            </p>
            <p className="text-xs text-white/30 text-center mt-4">
              © {new Date().getFullYear()} THE PAINKILLER MD. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Action Bar */}
      <div className="mobile-action-bar" role="complementary" aria-label="Quick actions">
        <a
          href="tel:+919769682366"
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--color-primary-900)] text-white text-sm font-semibold hover:bg-[var(--color-primary-800)] transition-colors min-h-[44px]"
        >
          📞 {t("cta.call")}
        </a>
        <a
          href="https://wa.me/919769682366"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors min-h-[44px]"
        >
          💬 {t("cta.whatsapp")}
        </a>
        <a
          href="#book"
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--color-clinical-600)] text-white text-sm font-semibold hover:bg-[var(--color-clinical-700)] transition-colors min-h-[44px]"
        >
          📅 {t("nav.contact")}
        </a>
      </div>
    </>
  );
}
