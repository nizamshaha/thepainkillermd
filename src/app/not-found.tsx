import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* 404 Number */}
        <div className="mb-6">
          <span className="text-8xl font-bold bg-gradient-to-br from-[var(--color-primary-600)] to-[var(--color-clinical-600)] bg-clip-text text-transparent">
            404
          </span>
        </div>

        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">
          Page Not Found
        </h1>
        <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. 
          Let us help you find what you need.
        </p>

        {/* Quick Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          <Link
            href="/"
            className="p-4 rounded-xl border border-[var(--color-surface-200)] bg-white hover:border-[var(--color-clinical-300)] hover:shadow-md transition-all text-center"
          >
            <span className="text-2xl block mb-1">🏠</span>
            <span className="text-sm font-semibold text-[var(--color-text-primary)]">Home</span>
          </Link>
          <Link
            href="/pain-navigator"
            className="p-4 rounded-xl border border-[var(--color-surface-200)] bg-white hover:border-[var(--color-clinical-300)] hover:shadow-md transition-all text-center"
          >
            <span className="text-2xl block mb-1">🗺️</span>
            <span className="text-sm font-semibold text-[var(--color-text-primary)]">Pain Navigator</span>
          </Link>
          <Link
            href="/conditions"
            className="p-4 rounded-xl border border-[var(--color-surface-200)] bg-white hover:border-[var(--color-clinical-300)] hover:shadow-md transition-all text-center"
          >
            <span className="text-2xl block mb-1">📋</span>
            <span className="text-sm font-semibold text-[var(--color-text-primary)]">Conditions</span>
          </Link>
          <Link
            href="/procedures"
            className="p-4 rounded-xl border border-[var(--color-surface-200)] bg-white hover:border-[var(--color-clinical-300)] hover:shadow-md transition-all text-center"
          >
            <span className="text-2xl block mb-1">💉</span>
            <span className="text-sm font-semibold text-[var(--color-text-primary)]">Procedures</span>
          </Link>
          <Link
            href="/doctor"
            className="p-4 rounded-xl border border-[var(--color-surface-200)] bg-white hover:border-[var(--color-clinical-300)] hover:shadow-md transition-all text-center"
          >
            <span className="text-2xl block mb-1">👨‍⚕️</span>
            <span className="text-sm font-semibold text-[var(--color-text-primary)]">Dr. Shah</span>
          </Link>
          <Link
            href="/clinic"
            className="p-4 rounded-xl border border-[var(--color-surface-200)] bg-white hover:border-[var(--color-clinical-300)] hover:shadow-md transition-all text-center"
          >
            <span className="text-2xl block mb-1">🏥</span>
            <span className="text-sm font-semibold text-[var(--color-text-primary)]">Clinic</span>
          </Link>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--color-clinical-600)] text-white font-semibold hover:bg-[var(--color-clinical-700)] transition-colors"
          >
            ← Back to Home
          </Link>
          <Link
            href="/pain-navigator"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-[var(--color-clinical-600)] text-[var(--color-clinical-600)] font-semibold hover:bg-[var(--color-clinical-50)] transition-colors"
          >
            Explore Pain Navigator
          </Link>
        </div>

        <p className="mt-8 text-xs text-[var(--color-text-muted)]">
          Need help? Contact us at the clinic or call for assistance.
        </p>
      </div>
    </div>
  );
}
