"use client";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useT } from "@/lib/useT";

export default function PatientInfoPage() {
  const t = useT();
  return (
    <>
      <Breadcrumbs items={[{ label: t("breadcrumb.patientInfo") }]} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-6">Patient Information</h1>
        <div className="prose prose-stone max-w-none text-[var(--color-text-secondary)] space-y-4 leading-relaxed text-sm">
          <p>
            This page provides general information for patients considering consultation at THE PAINKILLER MD.
          </p>
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">What to Bring</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Any previous imaging reports (X-rays, MRI, CT scans)</li>
            <li>Current medication list</li>
            <li>Previous medical records related to your pain condition</li>
            <li>A list of questions you would like to discuss</li>
          </ul>
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Insurance</h2>
          <p>
            Please contact the clinic directly for current insurance and TPA acceptance information.
          </p>
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Your Rights</h2>
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
