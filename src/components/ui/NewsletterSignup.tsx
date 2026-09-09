"use client";

import { useState } from "react";
import { useT } from "@/lib/useT";
import { isValidEmail, sanitizeInput } from "@/lib/security";
import Button from "@/components/ui/Button";

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
      <p className="text-sm text-white/60">
        {t("newsletter.description")}
      </p>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <input
          type="email"
          value={email}
          maxLength={128}
          onChange={(e) => setEmail(e.target.value.slice(0, 128))}
          placeholder={t("newsletter.placeholder")}
          className="flex-1 px-5 py-3 rounded-full border border-white/20 bg-white/5 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-[var(--color-clinical-400)] focus:ring-2 focus:ring-[var(--color-clinical-400)]/30 backdrop-blur-sm transition-all"
          aria-label={t("newsletter.ariaLabel")}
        />
        <div className="flex justify-end sm:justify-start">
          <Button
            type="submit"
            label={t("newsletter.subscribe")}
            variant="primary"
            size="md"
          />
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
      <p className="text-xs text-white/40">
        {t("newsletter.privacy")}
      </p>
    </form>
  );
}
