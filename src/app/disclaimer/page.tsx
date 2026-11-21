"use client";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useT } from "@/lib/useT";

export default function DisclaimerPage() {
  const t = useT();
  return (
    <>
      <Breadcrumbs items={[{ label: t("breadcrumb.disclaimer") }]} />
      <div className="max-w-3xl mx-auto px-5 sm:px-6 pt-10 pb-24">
        <h1 className="hero-line text-[var(--ink)] mb-10 !text-[clamp(2.4rem,3.6vw+0.8rem,4rem)]">Medical Disclaimer</h1>
        <div className="prose prose-stone max-w-none text-[var(--color-text-secondary)] space-y-4 leading-relaxed">
          <p>
            The information provided on this website (thepainkillermd.in) is for educational and informational
            purposes only. It is not intended as a substitute for professional medical advice, diagnosis, or treatment.
          </p>
          <p>
            Always seek the advice of your physician or other qualified health provider with any questions you may
            have regarding a medical condition. Never disregard professional medical advice or delay in seeking it
            because of something you have read on this website.
          </p>
          <p>
            If you think you may have a medical emergency, call your doctor or emergency services immediately.
            THE PAINKILLER MD does not recommend or endorse any specific tests, physicians, products, procedures,
            opinions, or other information that may be mentioned on this website.
          </p>
          <p>
            Reliance on any information provided by this website is solely at your own risk. The content is
            reviewed by medical professionals but may not reflect the most recent medical research or guidelines.
          </p>
          <p>
            Interactive tools, including the &quot;Find Your Pain&quot; assessment, are educational aids and do not
            constitute medical diagnosis. A clinical assessment by a qualified healthcare professional is required
            for accurate diagnosis and treatment planning.
          </p>
        </div>
      </div>
    </>
  );
}
