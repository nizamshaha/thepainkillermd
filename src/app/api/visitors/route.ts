import { NextResponse, after } from "next/server";

// Visitor counter: all-time total and today's visitors (India time).
// Totals are kept by a free public counting service (abacus.jasoncameron.dev).
// That service can be slow, so this route remembers the latest numbers and
// answers at once, recording visits with the service after the response.
const BASE = "https://abacus.jasoncameron.dev";
const NS = "thepainkillermd";
const TOTAL = "visitors";

export const dynamic = "force-dynamic";

const cache = new Map<string, number>();

function todayKey() {
  const d = new Date(Date.now() + 5.5 * 3600 * 1000); // IST
  return `day-${d.toISOString().slice(0, 10).replace(/-/g, "")}`;
}

async function remote(op: "hit" | "get", key: string): Promise<number | null> {
  try {
    const r = await fetch(`${BASE}/${op}/${NS}/${key}`, { cache: "no-store", signal: AbortSignal.timeout(9000) });
    if (r.status === 404 && op === "get") { cache.set(key, Math.max(cache.get(key) ?? 0, 0)); return 0; }
    if (!r.ok) return null;
    const n = Number(((await r.json()) as { value: number }).value);
    if (!Number.isFinite(n)) return null;
    cache.set(key, Math.max(cache.get(key) ?? 0, n));
    return cache.get(key)!;
  } catch {
    return null;
  }
}

async function read(key: string, hit: boolean): Promise<number | null> {
  const known = cache.get(key);
  if (known !== undefined) {
    // Fast path: answer from memory, update the service in the background.
    const value = hit ? known + 1 : known;
    cache.set(key, value);
    after(() => remote(hit ? "hit" : "get", key));
    return value;
  }
  return remote(hit ? "hit" : "get", key);
}

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const day = todayKey();
  for (const k of cache.keys()) if (k.startsWith("day-") && k !== day) cache.delete(k);
  const [total, today] = await Promise.all([read(TOTAL, q.get("new") === "1"), read(day, q.get("newToday") === "1")]);
  const headers = { "Cache-Control": "no-store" };
  if (total === null) return NextResponse.json({ total: null, today: null }, { status: 503, headers });
  return NextResponse.json({ total, today: today ?? null }, { headers });
}
