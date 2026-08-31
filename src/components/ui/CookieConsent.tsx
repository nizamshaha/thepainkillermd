"use client";

import { useState, useEffect } from "react";
import { t } from "@/data/translations";
import { useLocale } from "@/lib/LanguageContext";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const { locale } = useLocale();

  useEffect(() => {
    const consent = localStorage.getItem("tpm-cookie-consent");
    if (!consent) {
      // Small delay so it doesn't block first paint
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("tpm-cookie-consent", "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("tpm-cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 animate-slide-up"
      role="dialog"
      aria-label={t("cookie.title", locale)}
    >
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-[var(--color-surface-200)] p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-100)] flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🍪</span>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">
              {t("cookie.title", locale)}
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-1">
              {t("cookie.message", locale)}
            </p>
            <a
              href="/cookie-policy"
              className="text-sm text-[var(--color-clinical-600)] hover:underline font-medium"
            >
              {t("cookie.policy", locale)} →
            </a>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 flex-shrink-0 w-full sm:w-auto">
            <button
              onClick={handleDecline}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full border border-[var(--color-surface-300)] text-[var(--color-text-secondary)] text-sm font-semibold hover:bg-[var(--color-surface-100)] transition-colors min-h-[44px]"
            >
              {t("cookie.decline", locale)}
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full bg-[var(--color-clinical-600)] text-white text-sm font-semibold hover:bg-[var(--color-clinical-700)] transition-colors min-h-[44px]"
            >
              {t("cookie.accept", locale)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
