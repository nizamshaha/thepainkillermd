import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold text-[var(--color-clinical-500)] mb-4">404</p>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">Page Not Found</h1>
        <p className="text-[var(--color-text-secondary)] mb-6">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link href="/" className="inline-flex items-center px-6 py-3 rounded-full bg-[var(--color-clinical-600)] text-white font-semibold hover:bg-[var(--color-clinical-700)] transition-colors">
          Return Home
        </Link>
      </div>
    </div>
  );
}
