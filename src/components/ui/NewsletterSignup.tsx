"use client";

import { useState } from "react";
import { useT } from "@/lib/useT";
import { isValidEmail, sanitizeInput } from "@/lib/security";

export default function NewsletterSignup() {
  const t = useT();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanEmail = sanitizeInput(email, 128);

    if (!cleanEmail) {
      setError(t("newsletter.errorEmpty"));
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setError(t("newsletter.errorInvalid"));
      return;
    }

    // In production, this would POST to a secure API route
    setSubmitted(true);
    setEmail("");
  };

  if (submitted) {
    return (
      <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-center">
        <p className="text-sm font-medium text-green-800">
          ✅ {t("newsletter.success")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-sm text-[var(--color-text-secondary)]">
        {t("newsletter.description")}
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          maxLength={128}
          onChange={(e) => setEmail(e.target.value.slice(0, 128))}
          placeholder={t("newsletter.placeholder")}
          className="flex-1 px-4 py-2.5 rounded-lg border border-[var(--color-surface-300)] bg-white text-[var(--color-text-primary)] text-sm placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-clinical-500)] focus:ring-2 focus:ring-[var(--color-clinical-500)] focus:ring-opacity-20 transition-all"
          aria-label={t("newsletter.ariaLabel")}
        />
        <button
          type="submit"
          className="px-5 py-2.5 rounded-lg bg-[var(--color-clinical-600)] text-white text-sm font-semibold hover:bg-[var(--color-clinical-700)] transition-colors whitespace-nowrap"
        >
          {t("newsletter.subscribe")}
        </button>
      </div>
      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
      <p className="text-xs text-[var(--color-text-muted)]">
        {t("newsletter.privacy")}
      </p>
    </form>
  );
}
