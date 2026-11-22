"use client";

import { useEffect, useRef, useState } from "react";

type Counts = { total: number; today: number | null };

function istDay() {
  return new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10);
}

// Each browser is counted once in the total and once per day (India time) in "today".
let request: Promise<Counts | null> | null = null;
function load(): Promise<Counts | null> {
  if (request) return request;
  let isNew = false, isNewToday = false;
  const day = istDay();
  try {
    isNew = !localStorage.getItem("tpm-visited");
    isNewToday = localStorage.getItem("tpm-visited-day") !== day;
  } catch {}
  const qs = [isNew && "new=1", isNewToday && "newToday=1"].filter(Boolean).join("&");
  const attempt = (): Promise<Counts | null> =>
    fetch(`/api/visitors${qs ? `?${qs}` : ""}`)
      .then((r) => r.json())
      .then((d: { total: number | null; today: number | null }) => {
        if (typeof d.total !== "number") return null;
        try {
          localStorage.setItem("tpm-visited", "1");
          localStorage.setItem("tpm-visited-day", day);
        } catch {}
        return { total: d.total, today: typeof d.today === "number" ? d.today : null };
      })
      .catch(() => null);
  // The counting service can be slow; try again a couple of times before giving up.
  request = (async () => {
    for (let i = 0; i < 3; i++) {
      const c = await attempt();
      if (c) return c;
      await new Promise((r) => setTimeout(r, 2500 * (i + 1)));
    }
    return null;
  })();
  return request;
}

function useCountUp(target: number | null) {
  const [shown, setShown] = useState(0);
  const from = useRef(0);
  useEffect(() => {
    if (target === null) return;
    let raf = 0;
    const t0 = performance.now(), dur = 1400, start = from.current;
    const step = (t: number) => {
      const p = Math.min(1, Math.max(0, (t - t0) / dur)), eased = 1 - Math.pow(1 - p, 3);
      const v = Math.round(start + (target - start) * eased);
      from.current = v; setShown(v);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return shown;
}

export default function VisitorCount() {
  const [counts, setCounts] = useState<Counts | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // Show the last known numbers straight away, then the fresh ones.
    try {
      const last = JSON.parse(localStorage.getItem("tpm-visitors-last2") || "null") as (Counts & { day?: string }) | null;
      if (last && last.total > 0) setCounts({ total: last.total, today: last.day === istDay() ? last.today : null });
    } catch {}
    load().then((c) => {
      if (!c) { setFailed(true); return; }
      try { localStorage.setItem("tpm-visitors-last2", JSON.stringify({ ...c, day: istDay() })); } catch {}
      setCounts((prev) => ({
        total: Math.max(prev?.total ?? 0, c.total),
        today: c.today === null ? prev?.today ?? null : Math.max(prev?.today ?? 0, c.today),
      }));
    });
  }, []);

  // Live: refresh the numbers every 30 seconds while the page is open.
  useEffect(() => {
    const id = window.setInterval(() => {
      if (document.hidden) return;
      fetch("/api/visitors", { cache: "no-store" })
        .then((r) => r.json())
        .then((d: { total: number | null; today: number | null }) => {
          if (typeof d.total !== "number") return;
          setCounts((prev) => ({
            total: Math.max(prev?.total ?? 0, d.total as number),
            today: typeof d.today === "number" ? Math.max(prev?.today ?? 0, d.today) : prev?.today ?? null,
          }));
        })
        .catch(() => {});
    }, 30000);
    return () => window.clearInterval(id);
  }, []);

  const total = useCountUp(counts?.total ?? null);
  const today = useCountUp(counts?.today ?? null);

  if (!counts && failed) return null; // only when there has never been any number to show
  const loading = !counts;
  const skeleton = <span className="inline-block h-3 w-8 rounded-full bg-white/15 animate-pulse" aria-hidden="true" />;

  return (
    <div
      className="inline-flex items-center rounded-full ring-1 ring-white/15 bg-white/[0.04] text-[13px] text-white/70 divide-x divide-white/10"
      aria-live="polite"
      aria-label={loading ? "Loading visitor count" : `${counts.today ?? 0} visitors today, ${counts.total} in total`}
    >
      <span className="inline-flex items-center gap-2 px-4 py-1.5">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#4ade80] opacity-60 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ade80]" />
        </span>
        {loading || counts.today === null ? skeleton : <span className="font-semibold text-white tabular-nums">{today.toLocaleString("en-IN")}</span>}
        <span>today</span>
      </span>
      <span className="inline-flex items-center gap-2 px-4 py-1.5">
        {loading ? skeleton : <span className="font-semibold text-white tabular-nums">{total.toLocaleString("en-IN")}</span>}
        <span>total visitors</span>
      </span>
    </div>
  );
}
