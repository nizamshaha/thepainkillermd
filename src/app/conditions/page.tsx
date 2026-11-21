"use client";

import { conditions } from "@/data/conditions";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageHero from "@/components/apple/PageHero";
import Catalog from "@/components/apple/Catalog";
import Button from "@/components/ui/Button";
import { useT } from "@/lib/useT";

const categoryLabels: Record<string, string> = {
  spine: "Spine & Back",
  nerve: "Nerve Pain",
  joint: "Joint Pain",
  chronic: "Chronic Pain",
  head: "Head & Face",
  "soft-tissue": "Soft Tissue",
};

export default function ConditionsPage() {
  const t = useT();
  return (
    <>
      <Breadcrumbs items={[{ label: t("nav.conditions") }]} />
      <PageHero kicker="Conditions we treat" title={t("index.painConditions")} subtitle={t("index.evidenceBased")}>
        <Button label="Not sure? Find your pain" href="/pain-navigator" variant="outline" />
      </PageHero>
      <Catalog
        items={conditions.map((c) => ({ href: `/conditions/${c.slug}`, title: c.name, desc: c.overview, group: c.category }))}
        groupLabels={categoryLabels}
        placeholder="Search conditions, e.g. sciatica"
        ctaLabel={t("common.readMore")}
      />
    </>
  );
}
