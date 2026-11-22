"use client";

import { useEffect, useRef, useState } from "react";

/** Counts each browser once (remembered in localStorage) and shows the site total with a soft count-up. */
let request: Promise<number | null> | null = null; // one request per page load
function load(): Promise<number | null> {
  if (request) return request;
  let first = false;
  try { first = !localStorage.getItem("tpm-visited"); } catch {}
  request = fetch(`/api/visitors${first ? "?hit=1" : ""}`)
    .then((r) => r.json())
    .then((d: { count: number | null }) => {
      if (typeof d.count !== "number" || d.count < 1) return null;
      if (first) { try { localStorage.setItem("tpm-visited", "1"); } catch {} }
      return d.count;
    })
    .catch(() => null);
  return request;
}

export default function VisitorCount() {
  const [total, setTotal] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  const [shown, setShown] = useState(0);
  const from = useRef(0);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Show the last known total straight away; the counting service can take a few seconds.
    try { const c = Number(localStorage.getItem("tpm-visitors-last")); if (c > 0) setTotal(c); } catch {}
    load().then((n) => {
      if (n === null) { setFailed(true); return; }
      try { localStorage.setItem("tpm-visitors-last", String(n)); } catch {}
      setTotal((prev) => (prev === null ? n : Math.max(prev, n)));
    });
  }, []);

  useEffect(() => {
    if (total === null || !ref.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setShown(total); return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(), dur = 1400, start = from.current;
      const step = (t: number) => {
        const p = Math.min(1, Math.max(0, (t - t0) / dur)), eased = 1 - Math.pow(1 - p, 3);
        const v = Math.round(start + (total - start) * eased);
        from.current = v; setShown(v);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [total]);

  if (total === null && failed) return null;
  const loading = total === null;
  return (
    <p ref={ref} className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-[13px] text-white/70 ring-1 ring-white/15 bg-white/[0.04]" aria-live="polite" aria-label={loading ? "Loading visitor count" : `${total.toLocaleString("en-IN")} visitors`}>
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--lilac)] opacity-60 motion-safe:animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--lilac)]" />
      </span>
      {loading ? <span className="inline-block h-3 w-10 rounded-full bg-white/15 motion-safe:animate-pulse" aria-hidden="true" /> : null}
      {loading ? null : <span className="font-semibold text-white tabular-nums">{shown.toLocaleString("en-IN")}</span>}
      <span>visitors</span>
    </p>
  );
}
