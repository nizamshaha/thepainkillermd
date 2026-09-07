"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SearchModal from "@/components/medical/SearchModal";
import Logo from "@/components/ui/Logo";
import LanguageToggle from "@/components/ui/LanguageToggle";
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
      <div className="w-full pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-6 lg:pr-8">
        <div className="flex items-center justify-between h-24">
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
            <a
              href="/clinic#book"
              className="hidden md:inline-flex items-center px-4 py-2 rounded-full bg-[var(--color-clinical-600)] text-white text-sm font-semibold hover:bg-[var(--color-clinical-700)] transition-colors"
            >
              {t("header.bookConsultation")}
            </a>

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

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden animate-fade-in">
          <div className="absolute inset-0 top-24 bg-black/20" onClick={() => setMobileOpen(false)} />            <nav className="relative bg-white border-t border-[var(--color-surface-200)] shadow-lg max-h-[calc(100vh-6rem)] overflow-y-auto" aria-label="Mobile navigation">
            <div className="px-4 py-4 space-y-1">
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
              <div className="pt-3 border-t border-[var(--color-surface-200)]">
                <a
                  href="/clinic#book"
                  className="block px-4 py-3 rounded-lg text-center bg-[var(--color-clinical-600)] text-white font-semibold min-h-[44px] flex items-center justify-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Book Consultation
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
