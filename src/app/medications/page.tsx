"use client";

import { medications } from "@/data/medications";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageHero from "@/components/apple/PageHero";
import Catalog from "@/components/apple/Catalog";
import { useT } from "@/lib/useT";

const categoryLabels: Record<string, string> = {
  neuropathic: "Nerve pain medicines",
  nsaid: "Anti-inflammatories (NSAIDs)",
  "muscle-relaxant": "Muscle relaxants",
  topical: "Creams & patches",
};

export default function MedicationsPage() {
  const t = useT();
  return (
    <>
      <Breadcrumbs items={[{ label: t("nav.medications") }]} />
      <PageHero kicker="Medicine guide" title={t("index.painMedications")} subtitle={t("index.nonPrescriptive")}>
        <span className="disclaimer-badge">{t("index.eduDisclaimer")}</span>
      </PageHero>
      <Catalog
        items={medications.map((m) => ({ href: `/medications/${m.slug}`, title: m.name, desc: m.mechanism, group: m.category }))}
        groupLabels={categoryLabels}
        placeholder="Search medicines"
        ctaLabel={t("common.learnMore")}
      />
    </>
  );
}
