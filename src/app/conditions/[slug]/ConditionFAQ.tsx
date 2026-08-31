"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function ConditionFAQ({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2" role="list">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="rounded-lg border border-[var(--color-surface-200)] overflow-hidden"
            role="listitem"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-[var(--color-surface-50)] transition-colors"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-[var(--color-text-primary)]">{item.question}</span>
              <svg
                className={`w-5 h-5 text-[var(--color-text-muted)] flex-shrink-0 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isOpen && (
              <div className="px-5 pb-4 text-[var(--color-text-secondary)] leading-relaxed animate-fade-in">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
