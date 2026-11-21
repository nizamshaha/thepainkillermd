"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchModal from "@/components/medical/SearchModal";
import Logo from "@/components/ui/Logo";
import LanguageToggle from "@/components/ui/LanguageToggle";
import Button from "@/components/ui/Button";
import { PhoneIcon, CalendarIcon } from "@/components/ui/Icons";
import { useT } from "@/lib/useT";

export default function Header() {
  const t = useT();
  const pathname = usePathname();

  // Primary links stay visible on desktop; the rest live in "More"
  const primaryLinks = [
    { label: t("header.conditions"), href: "/conditions" },
    { label: t("header.procedures"), href: "/procedures" },
    { label: t("header.painNavigator"), href: "/pain-navigator" },
    { label: t("header.videos"), href: "/videos" },
    { label: t("header.aboutDrShah"), href: "/doctor" },
  ];
  const secondaryLinks = [
    { label: t("header.clinic"), href: "/clinic" },
    { label: t("header.medications"), href: "/medications" },
    { label: t("header.education"), href: "/education" },
  ];
  const allLinks = [...primaryLinks, ...secondaryLinks];

  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + "/");

  return (
    <header
      className={`sticky top-0 z-[80] transition-[background-color,box-shadow] duration-300 ${
        scrolled || mobileOpen
          ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_0_var(--line),0_12px_30px_-20px_rgba(23,20,46,0.35)]"
          : "bg-[var(--paper)]"
      }`}
      role="banner"
    >
      {/* Utility strip */}
      <div className="hidden md:block bg-[var(--ink)] text-white/75 text-[13px]">
        <div className="container-page flex items-center justify-between h-9">
          <p>
            <span className="text-white font-medium">Dr. Shahnawaz F Shah</span>
            <span className="mx-2 text-white/30">/</span>
            Interventional spine &amp; pain clinic, Surat
          </p>
          <div className="flex items-center gap-5">
            <div className="hidden xl:block [&_button]:h-7 [&_button]:bg-transparent [&_button]:ring-white/20 [&_button]:text-white/80 [&_span]:!text-white">
              <LanguageToggle />
            </div>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              In-person &amp; video consultations
            </span>
            <a href="tel:+919769682366" className="flex items-center gap-1.5 text-white font-medium hover:text-[var(--color-primary-200)] transition-colors">
              <PhoneIcon className="w-3.5 h-3.5" />
              +91 97696 82366
            </a>
          </div>
        </div>
      </div>

      <div className="container-page">
        <div className="flex items-center justify-between gap-4 h-[4.5rem]">
          <Link href="/" className="shrink-0 min-w-0" aria-label="THE PAINKILLER MD — Home">
            <Logo size="md" variant="dark" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-0.5" aria-label="Main navigation">
            {primaryLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`relative px-2.5 py-2 text-[0.94rem] font-medium rounded-full transition-colors whitespace-nowrap ${
                  isActive(link.href)
                    ? "text-[var(--ink)] bg-[var(--panel)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--ink)] hover:bg-[var(--panel)]"
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="relative" onMouseLeave={() => setMoreOpen(false)}>
              <button
                type="button"
                onClick={() => setMoreOpen((v) => !v)}
                onMouseEnter={() => setMoreOpen(true)}
                aria-expanded={moreOpen}
                className="flex items-center gap-1 px-2.5 py-2 text-[0.94rem] font-medium rounded-full text-[var(--color-text-secondary)] hover:text-[var(--ink)] hover:bg-[var(--panel)] transition-colors"
              >
                More
                <svg className={`w-3.5 h-3.5 transition-transform ${moreOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="m6 9 6 6 6-6" /></svg>
              </button>
              {moreOpen && (
                <div className="absolute right-0 top-full pt-2 w-56">
                  <div className="bg-white rounded-2xl p-2 shadow-[var(--shadow-xl)] ring-1 ring-[var(--line)]">
                    {secondaryLinks.map((link) => (
                      <a key={link.href} href={link.href} className="block px-3 py-2.5 rounded-xl text-[0.95rem] text-[var(--color-text-secondary)] hover:bg-[var(--panel)] hover:text-[var(--ink)]">
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:block xl:hidden"><LanguageToggle /></div>
            <SearchModal />
            <div className="hidden md:inline-flex">
              <Button label={t("header.bookConsultation")} href="/clinic#book" variant="primary" size="sm" icon={<CalendarIcon />} />
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden h-10 w-10 rounded-full bg-[var(--ink)] text-white flex items-center justify-center"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d="M6 18 18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d="M4 8h16M4 16h10" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / tablet menu */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-[var(--line)] bg-white h-[calc(100dvh-4.5rem)] overflow-y-auto">
          <nav className="container-page py-6" aria-label="Mobile navigation">
            <ul className="divide-y divide-[var(--line)]">
              {allLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex items-center justify-between py-4 font-display text-2xl text-[var(--ink)]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                    <svg className="w-5 h-5 text-[var(--color-text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 sm:hidden"><LanguageToggle /></div>
            <div className="mt-6 grid gap-3">
              <Button label={t("header.bookConsultation")} href="/clinic#book" variant="primary" size="lg" className="w-full" onClick={() => setMobileOpen(false)} icon={<CalendarIcon />} />
              <Button label="+91 97696 82366" href="tel:+919769682366" variant="outline" size="lg" className="w-full" icon={<PhoneIcon />} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
