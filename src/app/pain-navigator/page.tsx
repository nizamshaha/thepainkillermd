"use client";

import PainNavigator from "@/components/medical/PainNavigator";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useT } from "@/lib/useT";

export default function PainNavigatorPage() {
  const t = useT();

  return (
    <div className="min-h-screen">
      <Breadcrumbs items={[{ label: t("nav.painNavigator") }]} />

      <section className="bg-gradient-to-br from-[var(--color-primary-900)] to-[var(--color-primary-700)] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t("painNav.title")}
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-3">
            {t("painNav.subtitle")}
          </p>
          <p className="text-sm text-white/50">
            {t("painNav.disclaimer")}
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <PainNavigator />
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface-50)] border-t border-[var(--color-surface-200)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm text-[var(--color-text-muted)]">
            <strong>Dr Shahnawaz F Shah</strong> — {t("doctor.specialty")}
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            THE PAINKILLER MD — {t("footer.brand")}
          </p>
        </div>
      </section>
    </div>
  );
}
