"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SearchModal from "@/components/medical/SearchModal";
import Logo from "@/components/ui/Logo";
import LanguageToggle from "@/components/ui/LanguageToggle";
import Button from "@/components/ui/Button";
import Flag from "@/components/ui/Flag";
import { useT } from "@/lib/useT";

export default function Header() {
  const t = useT();
  const navLinks = [
    { label: t("header.painNavigator"), href: "/pain-navigator" },
    { label: t("header.conditions"), href: "/conditions" },
    { label: t("header.procedures"), href: "/procedures" },
    { label: t("header.medications"), href: "/medications" },
    { label: t("header.education"), href: "/education" },
    { label: t("header.videos"), href: "/videos" },
    { label: t("header.aboutDrShah"), href: "/doctor" },
    { label: t("header.clinic"), href: "/clinic" },
  ];
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-[80] transition-all ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[var(--color-surface-200)]"
          : "bg-white"
      }`}
      role="banner"
    >
      {/* Top Region & Clinic Strip */}
      <div className="bg-[var(--color-primary-950)] text-white/90 text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flag country="IN" size="sm" />
            <span className="font-semibold text-white/95">
              Dr. Shahnawaz F Shah
            </span>
            <span className="text-white/40">•</span>
            <span className="text-white/75">Interventional Spine & Pain Clinic</span>
            <span className="text-white/40">•</span>
            <span className="text-[var(--color-clinical-300)] font-medium">Surat, Gujarat, India</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-white/75">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>In-Person & Virtual Consultations</span>
            </span>
            <a
              href="tel:+919769682366"
              className="text-white/90 hover:text-white font-semibold transition-colors"
            >
              📞 +91 97696 82366
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="shrink-0" aria-label="THE PAINKILLER MD — Home">
            <Logo size="md" variant="dark" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-clinical-600)] hover:bg-[var(--color-surface-100)] rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <LanguageToggle />

            {/* Search */}
            <SearchModal />

            {/* Book CTA (desktop) */}
            <div className="hidden md:inline-flex">
              <Button
                label={t("header.bookConsultation")}
                href="/clinic#book"
                variant="primary"
                size="sm"
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-[var(--color-surface-100)] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg className="w-6 h-6 text-[var(--color-text-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-[var(--color-text-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[var(--color-surface-200)] bg-white/95 backdrop-blur-md">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--color-surface-50)] border border-[var(--color-surface-200)] text-xs text-[var(--color-text-secondary)] mb-2">
              <Flag country="IN" size="sm" />
              <span className="font-semibold text-[var(--color-text-primary)]">Surat, Gujarat, India</span>
              <span className="text-[var(--color-text-muted)]">•</span>
              <span>In-Person & Online</span>
            </div>
            <div className="pt-1 pb-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 rounded-lg text-base font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-surface-100)] transition-colors min-h-[44px] flex items-center"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-[var(--color-surface-200)] flex justify-center">
                <Button
                  label={t("header.bookConsultation")}
                  href="/clinic#book"
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                  onClick={() => setMobileOpen(false)}
                />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
