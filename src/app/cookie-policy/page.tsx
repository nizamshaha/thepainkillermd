"use client";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useT } from "@/lib/useT";

export default function CookiePolicyPage() {
  const t = useT();
  return (
    <>
      <Breadcrumbs items={[{ label: t("breadcrumb.cookiePolicy") }]} />
      <div className="max-w-3xl mx-auto px-5 sm:px-6 pt-10 pb-24">
        <h1 className="hero-line text-[var(--ink)] mb-10 !text-[clamp(2.4rem,3.6vw+0.8rem,4rem)]">Cookie Policy</h1>
        <div className="prose prose-stone max-w-none text-[var(--grey)] space-y-4 leading-[1.7] text-[17px] rounded-[1.75rem] bg-[var(--mist)] p-7 sm:p-10 reveal">
          <p>
            This website uses minimal cookies to ensure proper functionality. We do not use tracking
            cookies or third-party advertising cookies.
          </p>
          <h2 className="!text-[1.4rem] !leading-tight !tracking-[-0.02em] text-[var(--ink)] pt-4">Essential Cookies</h2>
          <p>
            Necessary cookies are used for basic website functionality and are always active.
            They cannot be disabled.
          </p>
          <h2 className="!text-[1.4rem] !leading-tight !tracking-[-0.02em] text-[var(--ink)] pt-4">Third-Party Cookies</h2>
          <p>
            Embedded YouTube videos may set cookies when played. These are subject to YouTube&apos;s
            own cookie policy.
          </p>
        </div>
      </div>
    </>
  );
}
