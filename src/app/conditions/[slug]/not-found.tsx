"use client";

import Link from "next/link";
import { useT } from "@/lib/useT";
import { conditions } from "@/data/conditions";

export default function ConditionNotFound() {
  const t = useT();
  const popular = conditions.slice(0, 6);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="text-center max-w-lg">
        <div className="mb-6">
          <span className="text-7xl font-bold bg-gradient-to-br from-[var(--color-primary-600)] to-[var(--color-clinical-600)] bg-clip-text text-transparent">
            404
          </span>
        </div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">
          Condition Not Found
        </h1>
        <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed">
          The condition page you&apos;re looking for doesn&apos;t exist or has been moved.
          Browse our conditions directory or try one of the popular conditions below.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {popular.map((c) => (
            <Link
              key={c.slug}
              href={`/conditions/${c.slug}`}
              className="group p-3 rounded-lg border border-[var(--color-surface-200)] bg-white hover:shadow-md hover:border-[var(--color-clinical-300)] transition-all text-left"
            >
              <h3 className="font-semibold text-[var(--color-text-primary)] text-sm group-hover:text-[var(--color-clinical-600)] transition-colors">
                {c.name}
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5 line-clamp-1">
                {c.overview}
              </p>
            </Link>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/conditions"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--color-clinical-600)] text-white font-semibold hover:bg-[var(--color-clinical-700)] transition-colors"
          >
            Browse All Conditions
          </Link>
          <Link
            href="/pain-navigator"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-[var(--color-clinical-600)] text-[var(--color-clinical-600)] font-semibold hover:bg-[var(--color-clinical-50)] transition-colors"
          >
            Explore Pain Navigator
          </Link>
        </div>
      </div>
    </div>
  );
}
