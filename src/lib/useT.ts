"use client";

import { useLocale } from "@/lib/LanguageContext";
import { t as translate } from "@/data/translations";
import type { Locale } from "@/lib/types";

/**
 * Hook that returns the `t()` function bound to the current locale.
 * Use in any client component that needs translated strings.
 *
 * Usage:
 *   const t = useT();
 *   <h1>{t("hero.headline")}</h1>
 */
export function useT() {
  const { locale } = useLocale();
  return (key: string) => translate(key, locale);
}

/**
 * Helper to get locale-aware attribute values (like HTML lang).
 */
export function useLang() {
  const { locale } = useLocale();
  const langMap: Record<Locale, string> = {
    en: "en",
    hi: "hi",
    mr: "mr",
    gu: "gu",
  };
  return langMap[locale] || "en";
}
