"use client";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useT } from "@/lib/useT";

export default function TermsPage() {
  const t = useT();
  return (
    <>
      <Breadcrumbs items={[{ label: t("breadcrumb.terms") }]} />
      <div className="max-w-3xl mx-auto px-5 sm:px-6 pt-10 pb-24">
        <h1 className="hero-line text-[var(--ink)] mb-10 !text-[clamp(2.4rem,3.6vw+0.8rem,4rem)]">Terms of Use</h1>
        <div className="prose prose-stone max-w-none text-[var(--grey)] space-y-4 leading-[1.7] text-[17px] rounded-[1.75rem] bg-[var(--mist)] p-7 sm:p-10 reveal">
          <p>
            By accessing this website, you agree to these terms of use. The content provided is for
            educational purposes and should not be used as a substitute for professional medical advice.
          </p>
          <h2 className="!text-[1.4rem] !leading-tight !tracking-[-0.02em] text-[var(--ink)] pt-4">Intellectual Property</h2>
          <p>
            All content on this website, including text, diagrams, and graphics, is the property of
            THE PAINKILLER MD and is protected by applicable intellectual property laws.
          </p>
          <h2 className="!text-[1.4rem] !leading-tight !tracking-[-0.02em] text-[var(--ink)] pt-4">Limitation of Liability</h2>
          <p>
            THE PAINKILLER MD shall not be liable for any damages arising from the use of or inability
            to use this website or its content.
          </p>
        </div>
      </div>
    </>
  );
}
