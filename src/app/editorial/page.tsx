import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata = { title: "Editorial Policy" };

export default function EditorialPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Editorial Policy" }]} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-6">Editorial Policy</h1>
        <div className="prose prose-stone max-w-none text-[var(--color-text-secondary)] space-y-4 leading-relaxed text-sm">
          <p>
            All medical content on this website is created or medically reviewed by Dr. Shahnawaz F Shah,
            an Interventional Spine &amp; Pain Physician.
          </p>
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Content Standards</h2>
          <p>
            Content is evidence-based, reviewed for accuracy, and written in clear, accessible language.
            We cite sources where applicable and update content when new evidence becomes available.
          </p>
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Medical Review</h2>
          <p>
            Every medical article undergoes review by a qualified physician before publication.
            Content is reviewed periodically and updated as medical guidelines evolve.
          </p>
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Non-Diagnostic Approach</h2>
          <p>
            All content is educational in nature and explicitly avoids providing individualized
            medical diagnoses or treatment recommendations.
          </p>
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Corrections</h2>
          <p>
            If you identify any inaccuracies in our content, please contact us so we can review
            and correct the information promptly.
          </p>
        </div>
      </div>
    </>
  );
}
