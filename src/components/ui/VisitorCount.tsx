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
  const [shown, setShown] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => { load().then((n) => { if (n !== null) setTotal(n); }); }, []);

  useEffect(() => {
    if (total === null || !ref.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setShown(total); return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(), dur = 1400;
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / dur), eased = 1 - Math.pow(1 - p, 3);
        setShown(Math.round(total * eased));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [total]);

  if (total === null) return null;
  return (
    <p ref={ref} className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-[13px] text-white/70 ring-1 ring-white/15 bg-white/[0.04]" aria-label={`${total.toLocaleString("en-IN")} visitors`}>
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--lilac)] opacity-60 motion-safe:animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--lilac)]" />
      </span>
      <span className="font-semibold text-white tabular-nums">{shown.toLocaleString("en-IN")}</span>
      <span>visitors</span>
    </p>
  );
}
