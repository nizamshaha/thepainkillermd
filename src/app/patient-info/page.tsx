"use client";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useT } from "@/lib/useT";

export default function PatientInfoPage() {
  const t = useT();
  return (
    <>
      <Breadcrumbs items={[{ label: t("breadcrumb.patientInfo") }]} />
      <div className="max-w-3xl mx-auto px-5 sm:px-6 pt-10 pb-24">
        <h1 className="hero-line text-[var(--ink)] mb-10 !text-[clamp(2.4rem,3.6vw+0.8rem,4rem)]">Patient Information</h1>
        <div className="prose prose-stone max-w-none text-[var(--grey)] space-y-4 leading-[1.7] text-[17px] rounded-[1.75rem] bg-[var(--mist)] p-7 sm:p-10 reveal">
          <p>
            This page provides general information for patients considering consultation at THE PAINKILLER MD.
          </p>
          <h2 className="!text-[1.4rem] !leading-tight !tracking-[-0.02em] text-[var(--ink)] pt-4">What to Bring</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Any previous imaging reports (X-rays, MRI, CT scans)</li>
            <li>Current medication list</li>
            <li>Previous medical records related to your pain condition</li>
            <li>A list of questions you would like to discuss</li>
          </ul>
          <h2 className="!text-[1.4rem] !leading-tight !tracking-[-0.02em] text-[var(--ink)] pt-4">Insurance</h2>
          <p>
            Please contact the clinic directly for current insurance and TPA acceptance information.
          </p>
          <h2 className="!text-[1.4rem] !leading-tight !tracking-[-0.02em] text-[var(--ink)] pt-4">Your Rights</h2>
          <p>
            You have the right to receive clear information about your condition, treatment options,
            risks, and benefits. You also have the right to ask questions and participate in treatment
            decisions.
          </p>
        </div>
      </div>
    </>
  );
}
