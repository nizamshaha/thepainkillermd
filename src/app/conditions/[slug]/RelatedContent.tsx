import { conditions } from "@/data/conditions";
import type { Condition } from "@/lib/types";

export default function RelatedContent({ currentCondition }: { currentCondition: Condition }) {
  // Find conditions that share the same body regions or are in the same category
  const related = conditions
    .filter(
      (c) =>
        c.id !== currentCondition.id &&
        (c.bodyRegions.some((r) => currentCondition.bodyRegions.includes(r)) ||
          c.category === currentCondition.category)
    )
    .slice(0, 5);

  if (related.length === 0) return null;

  return (
    <section className="mb-10 p-6 rounded-xl bg-[var(--color-primary-50)] border border-[var(--color-primary-200)]">
      <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
        You May Also Want to Understand
      </h3>
      <div className="space-y-2">
        {related.map((c) => (
          <a
            key={c.id}
            href={`/conditions/${c.slug}`}
            className="block p-3 rounded-lg bg-white hover:shadow-md transition-all border border-transparent hover:border-[var(--color-primary-200)]"
          >
            <h4 className="font-semibold text-[var(--color-text-primary)] text-sm">{c.name}</h4>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5 line-clamp-1">{c.overview}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
