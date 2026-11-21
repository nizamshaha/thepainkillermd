"use client";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useT } from "@/lib/useT";

export default function PrivacyPage() {
  const t = useT();
  return (
    <>
      <Breadcrumbs items={[{ label: t("breadcrumb.privacy") }]} />
      <div className="max-w-3xl mx-auto px-5 sm:px-6 pt-10 pb-24">
        <h1 className="hero-line text-[var(--ink)] mb-10 !text-[clamp(2.4rem,3.6vw+0.8rem,4rem)]">Privacy Policy</h1>
        <div className="prose prose-stone max-w-none text-[var(--grey)] space-y-4 leading-[1.7] text-[17px] rounded-[1.75rem] bg-[var(--mist)] p-7 sm:p-10 reveal">
          <p><em>Last updated: August 2026</em></p>
          <h2 className="!text-[1.4rem] !leading-tight !tracking-[-0.02em] text-[var(--ink)] pt-4">Information We Collect</h2>
          <p>
            This website is primarily informational. We do not collect personal medical information through
            this website. Contact information provided through appointment booking forms is used solely for
            the purpose of scheduling consultations.
          </p>
          <h2 className="!text-[1.4rem] !leading-tight !tracking-[-0.02em] text-[var(--ink)] pt-4">How We Use Information</h2>
          <p>
            Any information you provide is used only to respond to your inquiries and schedule appointments.
            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.
          </p>
          <h2 className="!text-[1.4rem] !leading-tight !tracking-[-0.02em] text-[var(--ink)] pt-4">Data Protection</h2>
          <p>
            We implement appropriate security measures to protect your personal information. Patient data
            is handled in accordance with applicable medical privacy regulations.
          </p>
          <h2 className="!text-[1.4rem] !leading-tight !tracking-[-0.02em] text-[var(--ink)] pt-4">Third-Party Services</h2>
          <p>
            This website may use third-party services (e.g., YouTube for video embedding) which may collect
            usage data according to their own privacy policies.
          </p>
          <h2 className="!text-[1.4rem] !leading-tight !tracking-[-0.02em] text-[var(--ink)] pt-4">Contact</h2>
          <p>
            For questions about this privacy policy, please contact us through the clinic contact information
            provided on the website.
          </p>
        </div>
      </div>
    </>
  );
}
