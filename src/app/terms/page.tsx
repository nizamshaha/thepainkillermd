import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata = { title: "Terms of Use" };

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Terms of Use" }]} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-6">Terms of Use</h1>
        <div className="prose prose-stone max-w-none text-[var(--color-text-secondary)] space-y-4 leading-relaxed text-sm">
          <p>
            By accessing this website, you agree to these terms of use. The content provided is for
            educational purposes and should not be used as a substitute for professional medical advice.
          </p>
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Intellectual Property</h2>
          <p>
            All content on this website, including text, diagrams, and graphics, is the property of
            THE PAINKILLER MD and is protected by applicable intellectual property laws.
          </p>
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Limitation of Liability</h2>
          <p>
            THE PAINKILLER MD shall not be liable for any damages arising from the use of or inability
            to use this website or its content.
          </p>
        </div>
      </div>
    </>
  );
}
