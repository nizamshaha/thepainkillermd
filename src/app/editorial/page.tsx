"use client";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useT } from "@/lib/useT";

export default function EditorialPage() {
  const t = useT();
  return (
    <>
      <Breadcrumbs items={[{ label: t("breadcrumb.editorial") }]} />
      <div className="max-w-3xl mx-auto px-5 sm:px-6 pt-10 pb-24">
        <h1 className="hero-line text-[var(--ink)] mb-10 !text-[clamp(2.4rem,3.6vw+0.8rem,4rem)]">Editorial Policy</h1>
        <div className="prose prose-stone max-w-none text-[var(--grey)] space-y-4 leading-[1.7] text-[17px] rounded-[1.75rem] bg-[var(--mist)] p-7 sm:p-10 reveal">
          <p>
            All medical content on this website is created or medically reviewed by Dr. Shahnawaz F Shah,
            an Interventional Spine &amp; Pain Physician.
          </p>
          <h2 className="!text-[1.4rem] !leading-tight !tracking-[-0.02em] text-[var(--ink)] pt-4">Content Standards</h2>
          <p>
            Content is evidence-based, reviewed for accuracy, and written in clear, accessible language.
            We cite sources where applicable and update content when new evidence becomes available.
          </p>
          <h2 className="!text-[1.4rem] !leading-tight !tracking-[-0.02em] text-[var(--ink)] pt-4">Medical Review</h2>
          <p>
            Every medical article undergoes review by a qualified physician before publication.
            Content is reviewed periodically and updated as medical guidelines evolve.
          </p>
          <h2 className="!text-[1.4rem] !leading-tight !tracking-[-0.02em] text-[var(--ink)] pt-4">Non-Diagnostic Approach</h2>
          <p>
            All content is educational in nature and explicitly avoids providing individualized
            medical diagnoses or treatment recommendations.
          </p>
          <h2 className="!text-[1.4rem] !leading-tight !tracking-[-0.02em] text-[var(--ink)] pt-4">Corrections</h2>
          <p>
            If you identify any inaccuracies in our content, please contact us so we can review
            and correct the information promptly.
          </p>
        </div>
      </div>
    </>
  );
}
