"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Securely log error without exposing sensitive internals to UI
    console.error("Application error:", error.digest || error.message);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center p-8 rounded-2xl bg-white border border-[var(--color-surface-200)] shadow-lg">
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4 text-2xl">
          ⚠️
        </div>
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
          Something went wrong
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">
          We encountered an unexpected issue while loading this content. Please try again or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 rounded-full bg-[var(--color-clinical-600)] text-white text-sm font-semibold hover:bg-[var(--color-clinical-700)] transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-full border border-[var(--color-surface-300)] text-[var(--color-text-primary)] text-sm font-medium hover:bg-[var(--color-surface-100)] transition-colors inline-block"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

