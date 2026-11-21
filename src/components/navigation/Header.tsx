"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SearchModal from "@/components/medical/SearchModal";
import LanguageToggle from "@/components/ui/LanguageToggle";
import Button from "@/components/ui/Button";
import { useT } from "@/lib/useT";

// Apple-style global nav: one slim frosted-glass bar.
export default function Header() {
  const t = useT();
  const pathname = usePathname();
  const links = [
    { label: t("header.conditions"), href: "/conditions" },
    { label: t("header.procedures"), href: "/procedures" },
    { label: t("header.painNavigator"), href: "/pain-navigator" },
    { label: t("header.videos"), href: "/videos" },
    { label: t("header.education"), href: "/education" },
    { label: t("header.aboutDrShah"), href: "/doctor" },
    { label: t("header.clinic"), href: "/clinic" },
  ];
  const mobileExtra = [{ label: t("header.medications"), href: "/medications" }];
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const active = (href: string) => pathname === href || pathname?.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-[80] frost border-b border-[rgba(91,46,166,0.08)]" role="banner">
      <div className="container-page h-[3.25rem] flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="THE PAINKILLER MD — Home">
          <span className="rounded-lg overflow-hidden ring-1 ring-black/5">
            <Image src="/logo.jpeg" alt="THE PAINKILLER MD" width={62} height={28} className="block" style={{ width: 62, height: 28 }} priority />
          </span>
          <span className="hidden min-[420px]:block text-[15px] font-semibold tracking-[-0.02em] text-[var(--ink)]">Dr. Shahnawaz F Shah</span>
        </Link>

        <nav className="hidden xl:flex items-center gap-7" aria-label="Main navigation">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active(l.href) ? "page" : undefined}
              className={`text-[13.5px] tracking-[-0.01em] transition-colors ${active(l.href) ? "text-[var(--purple)] font-medium" : "text-[var(--ink)]/80 hover:text-[var(--purple)]"}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden sm:block [&_button]:!h-9"><LanguageToggle /></div>
          <div className="[&_button]:!h-9 [&_button]:!w-9 [&_button]:!ring-0 [&_button]:!bg-transparent"><SearchModal /></div>
          <div className="hidden md:block">
            <Button label={t("header.bookConsultation")} href="/#book" variant="primary" size="sm" />
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="xl:hidden h-9 w-9 rounded-full flex items-center justify-center text-[var(--ink)] hover:bg-[var(--lavender)]"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
              {open ? <path strokeLinecap="round" d="M6 18 18 6M6 6l12 12" /> : <path strokeLinecap="round" d="M4 9h16M4 15h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="xl:hidden h-[calc(100dvh-3.25rem)] overflow-y-auto bg-white/95 backdrop-blur-xl animate-fade-in">
          <nav className="container-page pt-6 pb-10" aria-label="Mobile navigation">
            <ul>
              {[...links, ...mobileExtra].map((l, i) => (
                <li key={l.href} className="hero-line" style={{ animationDelay: `${i * 40}ms` }}>
                  <a href={l.href} onClick={() => setOpen(false)} className="block py-2.5 text-[1.75rem] font-semibold tracking-[-0.03em] text-[var(--ink)] hover:text-[var(--purple)]">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 sm:hidden"><LanguageToggle /></div>
            <div className="mt-6 grid gap-3">
              <Button label={t("header.bookConsultation")} href="/#book" variant="primary" size="lg" className="w-full" onClick={() => setOpen(false)} />
              <Button label="Call +91 97696 82366" href="tel:+919769682366" variant="outline" size="lg" className="w-full" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
