"use client";

import { useMemo, useState } from "react";

export type CatalogItem = { href: string; title: string; desc: string; group: string; tag?: string };

// Searchable, filterable grid of tiles with Apple-style motion.
export default function Catalog({
  items,
  groupLabels,
  placeholder,
  ctaLabel,
}: {
  items: CatalogItem[];
  groupLabels: Record<string, string>;
  placeholder: string;
  ctaLabel: string;
}) {
  const [q, setQ] = useState("");
  const [group, setGroup] = useState<string>("all");
  const groups = useMemo(() => Array.from(new Set(items.map((i) => i.group))), [items]);
  const shown = items.filter(
    (i) =>
      (group === "all" || i.group === group) &&
      (q.trim() === "" || (i.title + " " + i.desc).toLowerCase().includes(q.trim().toLowerCase()))
  );

  return (
    <section className="pb-24 sm:pb-32 bg-[var(--white)]">
      <div className="container-page">
        {/* search + filters */}
        <div className="sticky top-[3.4rem] z-30 -mx-2 px-2 py-3 frost rounded-[1.25rem] mb-8">
          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <label className="relative flex-1 max-w-md">
              <span className="sr-only">{placeholder}</span>
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--grey)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={placeholder}
                className="w-full h-11 rounded-full bg-white ring-1 ring-[var(--hairline)] pl-11 pr-4 text-[15px] outline-none focus:ring-2 focus:ring-[var(--purple)] transition"
              />
            </label>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter">
              {["all", ...groups].map((g) => (
                <button
                  key={g}
                  role="tab"
                  aria-selected={group === g}
                  onClick={() => setGroup(g)}
                  className={`h-9 px-4 rounded-full text-sm font-medium transition-colors ${group === g ? "bg-[var(--purple)] text-white" : "bg-white ring-1 ring-inset ring-[var(--hairline)] text-[var(--grey)] hover:text-[var(--ink)]"}`}
                >
                  {g === "all" ? "All" : groupLabels[g] || g}
                  <span className={`ml-1.5 text-xs ${group === g ? "text-white/70" : "text-[var(--grey)]/70"}`}>
                    {g === "all" ? items.length : items.filter((i) => i.group === g).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="sr-only" aria-live="polite">{shown.length} results</p>

        {shown.length === 0 ? (
          <div className="rounded-[1.75rem] bg-[var(--mist)] p-12 text-center">
            <p className="text-lg font-semibold text-[var(--ink)]">No matches for “{q}”</p>
            <p className="mt-1 text-[var(--grey)]">Try a different word, or clear the search to see everything.</p>
            <button onClick={() => { setQ(""); setGroup("all"); }} className="mt-5 glass-btn glass-clear border h-10 px-5 text-sm">Clear search</button>
          </div>
        ) : (
          <div key={group + q} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {shown.map((it, i) => (
              <a
                key={it.href}
                href={it.href}
                className="tile-in group relative rounded-[1.5rem] bg-[var(--mist)] p-7 flex flex-col min-h-[14rem] transition-[transform,box-shadow,background-color] duration-500 hover:bg-white hover:shadow-[var(--shadow-lg)] hover:-translate-y-1"
                style={{ animationDelay: `${Math.min(i, 12) * 35}ms` }}
              >
                <span className="text-sm font-medium text-[var(--purple)]">{it.tag || groupLabels[it.group] || it.group}</span>
                <h2 className="mt-3 !text-[1.4rem] !leading-tight !tracking-[-0.02em] text-[var(--ink)]">{it.title}</h2>
                <p className="mt-2 text-[15px] text-[var(--grey)] line-clamp-3 flex-1">{it.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-medium text-[var(--purple)]">
                  {ctaLabel}
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
