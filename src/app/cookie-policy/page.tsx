import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata = { title: "Cookie Policy" };

export default function CookiePolicyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Cookie Policy" }]} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-6">Cookie Policy</h1>
        <div className="prose prose-stone max-w-none text-[var(--color-text-secondary)] space-y-4 leading-relaxed text-sm">
          <p>
            This website uses minimal cookies to ensure proper functionality. We do not use tracking
            cookies or third-party advertising cookies.
          </p>
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Essential Cookies</h2>
          <p>
            Necessary cookies are used for basic website functionality and are always active.
            They cannot be disabled.
          </p>
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Third-Party Cookies</h2>
          <p>
            Embedded YouTube videos may set cookies when played. These are subject to YouTube&apos;s
            own cookie policy.
          </p>
        </div>
      </div>
    </>
  );
}
