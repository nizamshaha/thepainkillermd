"use client";

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Global application failure:", error.digest || error.message);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans antialiased">
        <div className="max-w-md w-full text-center p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
          <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            !
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            System Temporarily Unavailable
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            An unexpected error occurred. Our team has been notified.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </body>
    </html>
  );
}

