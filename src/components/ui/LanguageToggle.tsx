"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLocale } from "@/lib/LanguageContext";
import { locales } from "@/data/translations";
import { trackEvent } from "@/lib/analytics";
import Flag from "@/components/ui/Flag";

export default function LanguageToggle() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = locales.find((l) => l.code === locale) || locales[0];

  // Fix hydration mismatch by only rendering locale-specific content after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [open]);

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const select = (code: typeof locale) => {
    setLocale(code);
    setOpen(false);
    trackEvent({ event: "language_changed", metadata: { language: code } });
  };

  // Render default English flag on server, then switch to actual locale after hydration
  const displayLocale = mounted ? current : locales[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={toggle}
        className="flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-clinical-600)] hover:bg-[var(--color-surface-100)] border border-[var(--color-surface-200)]/80 rounded-xl transition-all min-h-[42px] shadow-2xs hover:shadow-xs active:scale-95"
        aria-label={`Language & Region: ${displayLocale.label} (${displayLocale.region})`}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Flag country={displayLocale.countryCode} size="md" className="shadow-xs" />
        <span className="font-bold text-xs text-[var(--color-text-primary)] uppercase tracking-wide">
          {displayLocale.code}
        </span>
        <span className="hidden xl:inline-block text-[11px] text-[var(--color-text-muted)] font-normal border-l border-[var(--color-surface-300)] pl-2">
          {displayLocale.regionLabel.split(",")[0]}
        </span>
        <svg
          className={`w-3.5 h-3.5 text-[var(--color-text-muted)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-[var(--color-surface-200)] py-3 z-50 animate-fade-in backdrop-blur-xl"
          role="listbox"
          aria-label="Select language and region"
        >
          {/* Header */}
          <div className="px-4 pb-2.5 mb-2 border-b border-[var(--color-surface-100)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-clinical-700)]">
                Language & Region
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[var(--color-clinical-700)] bg-[var(--color-clinical-50)] px-2.5 py-0.5 rounded-full border border-[var(--color-clinical-200)]">
                <Flag country="IN" size="sm" className="w-3.5 h-2.5" /> Surat, India
              </span>
            </div>
            <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
              Select your preferred language and regional context
            </p>
          </div>

          {/* Locales list */}
          <div className="px-2 space-y-1">
            {locales.map((l) => (
              <button
                type="button"
                key={l.code}
                onClick={() => select(l.code)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                  locale === l.code
                    ? "bg-[var(--color-primary-50)] border border-[var(--color-clinical-200)] text-[var(--color-clinical-700)] font-semibold shadow-xs"
                    : "text-[var(--color-text-primary)] hover:bg-[var(--color-surface-100)] border border-transparent"
                }`}
                role="option"
                aria-selected={locale === l.code}
              >
                <Flag country={l.countryCode} size="md" className="shrink-0 shadow-xs" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-sm font-semibold truncate">{l.label}</span>
                    <span className="text-[11px] text-[var(--color-text-muted)] font-normal uppercase tracking-wider">
                      {l.code}
                    </span>
                  </div>
                  <div className="text-[11px] text-[var(--color-text-secondary)] truncate">
                    {l.region}
                  </div>
                </div>
                {locale === l.code && (
                  <svg className="w-4 h-4 ml-1 text-[var(--color-clinical-600)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-2.5 pt-2 px-4 border-t border-[var(--color-surface-100)] flex items-center gap-2 text-[11px] text-[var(--color-text-muted)]">
            <span>🏥</span>
            <span>Multilingual spine & pain care across Gujarat, Maharashtra & India</span>
          </div>
        </div>
      )}
    </div>
  );
}
