"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLocale } from "@/lib/LanguageContext";
import { locales } from "@/data/translations";
import { trackEvent } from "@/lib/analytics";

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
        onPointerDown={(e) => e.stopPropagation()}
        onClick={toggle}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-clinical-600)] hover:bg-[var(--color-surface-100)] rounded-lg transition-colors min-w-[44px] min-h-[44px]"
        aria-label={`Language: ${displayLocale.label}`}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="text-base">{displayLocale.flag}</span>
        <span className="hidden sm:inline text-xs font-semibold uppercase">{displayLocale.code}</span>
        <svg
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
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
          className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-[var(--color-surface-200)] py-1 z-50 animate-fade-in"
          role="listbox"
          aria-label="Select language"
        >
          {locales.map((l) => (
            <button
              key={l.code}
              onClick={() => select(l.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors min-h-[44px] ${
                locale === l.code
                  ? "bg-[var(--color-primary-50)] text-[var(--color-clinical-600)] font-semibold"
                  : "text-[var(--color-text-primary)] hover:bg-[var(--color-surface-100)]"
              }`}
              role="option"
              aria-selected={locale === l.code}
            >
              <span className="text-lg">{l.flag}</span>
              <span>{l.label}</span>
              {locale === l.code && (
                <svg className="w-4 h-4 ml-auto text-[var(--color-clinical-600)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
