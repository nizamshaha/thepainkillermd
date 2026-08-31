"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { conditions } from "@/data/conditions";
import { procedures } from "@/data/procedures";
import { medications } from "@/data/medications";
import { painSensations } from "@/data/sensations";
import { anatomyRegions } from "@/data/anatomy";
import { testimonials, educationalVideos } from "@/data/testimonials";
import type { SearchResult } from "@/lib/types";

// Build search index from all data sources
function buildSearchIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  for (const c of conditions) {
    results.push({
      id: c.id,
      type: "condition",
      title: c.name,
      description: c.overview.slice(0, 120) + "...",
      slug: `/conditions/${c.slug}`,
      category: c.category,
    });
  }

  for (const p of procedures) {
    results.push({
      id: p.id,
      type: "procedure",
      title: p.name,
      description: p.description.slice(0, 120) + "...",
      slug: `/procedures/${p.slug}`,
      category: p.category,
    });
  }

  for (const m of medications) {
    results.push({
      id: m.id,
      type: "medication",
      title: m.name,
      description: m.description.slice(0, 120) + "...",
      slug: `/medications/${m.slug}`,
      category: m.category,
    });
  }

  for (const s of painSensations) {
    results.push({
      id: s.id,
      type: "sensation",
      title: s.label,
      description: s.description.slice(0, 120) + "...",
      slug: `#sensation-${s.id}`,
    });
  }

  for (const r of anatomyRegions) {
    results.push({
      id: r.id,
      type: "region",
      title: r.label,
      description: `Common conditions: ${r.conditions.join(", ")}`,
      slug: `#body-map-${r.id}`,
    });
  }

  for (const t of testimonials) {
    results.push({
      id: t.id,
      type: "article",
      title: `${t.patientName}'s Recovery — ${t.condition}`,
      description: t.quote.slice(0, 120) + "...",
      slug: `#videos-${t.id}`,
    });
  }

  for (const v of educationalVideos) {
    results.push({
      id: v.id,
      type: "article",
      title: v.title,
      description: v.description.slice(0, 120),
      slug: `#videos-${v.id}`,
    });
  }

  return results;
}

const typeLabels: Record<string, { label: string; color: string }> = {
  condition: { label: "Condition", color: "var(--color-clinical-500)" },
  procedure: { label: "Procedure", color: "var(--color-pathway-neuropathic)" },
  medication: { label: "Medication", color: "var(--color-medical-600)" },
  sensation: { label: "Sensation", color: "var(--color-pathway-nociceptive)" },
  region: { label: "Region", color: "var(--color-primary-600)" },
  article: { label: "Article", color: "var(--color-pathway-nociplastic)" },
};

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const searchIndex = useMemo(() => buildSearchIndex(), []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return searchIndex
      .filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q)
      )
      .slice(0, 12);
  }, [query, searchIndex]);

  // Open with Cmd/Ctrl + K
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Focus input on open and reset state
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        setQuery("");
        setSelectedIndex(0);
      }, 50);
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        // Navigate (would use router in full app)
        console.log("Navigate to:", results[selectedIndex].slug);
        setIsOpen(false);
      }
    },
    [results, selectedIndex]
  );

  // Scroll selected into view
  useEffect(() => {
    const el = listRef.current?.children[selectedIndex] as HTMLElement;
    el?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-surface-100)] border border-[var(--color-surface-300)] text-sm text-[var(--color-text-muted)] hover:border-[var(--color-clinical-300)] transition-colors"
        aria-label="Open search (Ctrl+K)"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span>Search</span>
        <kbd className="hidden sm:inline px-1.5 py-0.5 text-xs bg-[var(--color-surface-200)] rounded">
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={() => setIsOpen(false)}
      />

      {/* Search Panel */}
      <div className="relative w-full max-w-xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--color-surface-200)]">
          <svg className="w-5 h-5 text-[var(--color-text-muted)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search conditions, procedures, medications..."
            className="flex-1 text-lg outline-none placeholder:text-[var(--color-text-muted)]"
            aria-label="Search"
          />
          <kbd className="px-2 py-0.5 text-xs bg-[var(--color-surface-100)] rounded text-[var(--color-text-muted)] border border-[var(--color-surface-200)]">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-80 overflow-y-auto" role="listbox">
          {query.trim() && results.length === 0 && (
            <div className="p-8 text-center text-[var(--color-text-muted)]">
              <p className="text-lg mb-1">No results found</p>
              <p className="text-sm">Try a different search term</p>
            </div>
          )}

          {results.map((result, i) => {
            const typeInfo = typeLabels[result.type] || { label: result.type, color: "var(--color-text-muted)" };
            return (
              <button
                key={result.id}
                role="option"
                aria-selected={i === selectedIndex}
                className={`w-full text-left px-5 py-3 flex items-start gap-3 transition-colors ${
                  i === selectedIndex
                    ? "bg-[var(--color-clinical-500)] bg-opacity-5"
                    : "hover:bg-[var(--color-surface-50)]"
                }`}
                onClick={() => {
                  console.log("Navigate to:", result.slug);
                  setIsOpen(false);
                }}
                onMouseEnter={() => setSelectedIndex(i)}
              >
                <span
                  className="inline-block px-2 py-0.5 text-xs font-semibold rounded mt-0.5 flex-shrink-0"
                  style={{
                    background: `${typeInfo.color}15`,
                    color: typeInfo.color,
                  }}
                >
                  {typeInfo.label}
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-[var(--color-text-primary)] truncate">
                    {result.title}
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)] truncate">
                    {result.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer hints */}
        <div className="px-5 py-3 border-t border-[var(--color-surface-200)] flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 bg-[var(--color-surface-100)] rounded border border-[var(--color-surface-200)]">↑↓</kbd>
            Navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 bg-[var(--color-surface-100)] rounded border border-[var(--color-surface-200)]">↵</kbd>
            Open
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 bg-[var(--color-surface-100)] rounded border border-[var(--color-surface-200)]">esc</kbd>
            Close
          </span>
        </div>
      </div>
    </div>
  );
}
