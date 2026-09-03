"use client";

interface SkeletonProps {
  className?: string;
  count?: number;
  variant?: "text" | "circle" | "rect" | "card";
}

function Skeleton({ className = "", variant = "text" }: { className?: string; variant?: string }) {
  const baseClass = "animate-pulse bg-[var(--color-surface-200)] rounded";
  const variantClass =
    variant === "circle"
      ? "rounded-full"
      : variant === "rect"
      ? "rounded-xl"
      : variant === "card"
      ? "rounded-xl"
      : "rounded";

  return <div className={`${baseClass} ${variantClass} ${className}`} />;
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="bg-[var(--color-primary-900)] py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-4 w-32 mb-4" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-2/3 mb-8" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-40 rounded-full" />
            <Skeleton className="h-12 w-40 rounded-full" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="p-5 rounded-xl border border-[var(--color-surface-200)]">
              <Skeleton className="h-4 w-4 mb-3" variant="circle" />
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ConditionCardSkeleton() {
  return (
    <div className="p-5 rounded-xl border border-[var(--color-surface-200)] bg-white">
      <Skeleton className="h-2 w-2 rounded-full mb-3" variant="circle" />
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

export function ArticleCardSkeleton() {
  return (
    <div className="p-6 rounded-xl border border-[var(--color-surface-200)] bg-white">
      <div className="flex items-center gap-2 mb-3">
        <Skeleton className="h-5 w-16 rounded" />
        <Skeleton className="h-4 w-12" />
      </div>
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-1/2 mt-4" />
    </div>
  );
}

export function DetailPageSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[var(--color-primary-900)] to-[var(--color-primary-700)] py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-10 w-10 mb-3 rounded-lg" variant="rect" />
          <Skeleton className="h-10 w-2/3 mb-3" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <div className="space-y-3">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-6 w-48" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
        <div className="space-y-3">
          <Skeleton className="h-6 w-48" />
          <div className="grid grid-cols-2 gap-2">
            <Skeleton className="h-10 rounded-lg" variant="rect" />
            <Skeleton className="h-10 rounded-lg" variant="rect" />
            <Skeleton className="h-10 rounded-lg" variant="rect" />
            <Skeleton className="h-10 rounded-lg" variant="rect" />
          </div>
        </div>
      </div>
    </div>
  );
}
