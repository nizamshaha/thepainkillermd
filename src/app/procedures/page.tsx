"use client";

import { procedures } from "@/data/procedures";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageHero from "@/components/apple/PageHero";
import Catalog from "@/components/apple/Catalog";
import Button from "@/components/ui/Button";
import { useT } from "@/lib/useT";

const categoryLabels: Record<string, string> = {
  injection: "Injections",
  ablation: "Ablation",
  stimulation: "Neuromodulation",
  rehabilitation: "Rehabilitation",
};

export default function ProceduresPage() {
  const t = useT();
  return (
    <>
      <Breadcrumbs items={[{ label: t("nav.procedures") }]} />
      <PageHero kicker="Image-guided, minimally invasive" title={t("index.painProcedures")} subtitle={t("index.imageGuided")}>
        <Button label={t("hero.cta.primary")} href="/#book" variant="primary" />
      </PageHero>
      <Catalog
        items={procedures.map((p) => ({ href: `/procedures/${p.slug}`, title: p.name, desc: p.description, group: p.category }))}
        groupLabels={categoryLabels}
        placeholder="Search procedures, e.g. epidural"
        ctaLabel={t("common.learnMore")}
      />
    </>
  );
}
