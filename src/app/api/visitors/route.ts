import { NextResponse, after } from "next/server";

// Visitor counter: all-time total and today's visitors (India time).
//
// Preferred storage: the site's own Upstash Redis database, connected through
// Vercel (Storage -> Upstash for Redis). Vercel adds KV_REST_API_URL and
// KV_REST_API_TOKEN automatically; nothing is stored in the code.
// Fallback until that is connected: the free abacus.jasoncameron.dev counter.

export const dynamic = "force-dynamic";
export const maxDuration = 20;

const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const PREFIX = "tpm:visitors";

function todayKey() {
  const d = new Date(Date.now() + 5.5 * 3600 * 1000); // IST
  return `day-${d.toISOString().slice(0, 10).replace(/-/g, "")}`;
}

/* ---------- Upstash Redis (REST) ---------- */
async function redis(cmds: (string | number)[][]): Promise<(number | null)[] | null> {
  try {
    const r = await fetch(`${REDIS_URL}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${REDIS_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify(cmds),
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!r.ok) return null;
    const out = (await r.json()) as { result: unknown }[];
    return out.map((x) => (x.result === null || x.result === undefined ? 0 : Number(x.result)));
  } catch {
    return null;
  }
}

async function viaRedis(isNew: boolean, isNewToday: boolean, day: string) {
  const totalKey = `${PREFIX}:total`, dayKey = `${PREFIX}:${day}`;
  const res = await redis([
    isNew ? ["INCR", totalKey] : ["GET", totalKey],
    isNewToday ? ["INCR", dayKey] : ["GET", dayKey],
    ["EXPIRE", dayKey, 60 * 60 * 24 * 40],
  ]);
  return res ? { total: res[0] ?? 0, today: res[1] ?? 0 } : null;
}

/* ---------- Fallback: free public counter ---------- */
const BASE = "https://abacus.jasoncameron.dev";
const NS = "thepainkillermd";
const cache = new Map<string, number>();

async function abacus(op: "hit" | "get", key: string): Promise<number | null> {
  try {
    const r = await fetch(`${BASE}/${op}/${NS}/${key}`, { cache: "no-store", signal: AbortSignal.timeout(8000) });
    if (r.status === 404 && op === "get") { cache.set(key, cache.get(key) ?? 0); return cache.get(key)!; }
    if (!r.ok) return null;
    const n = Number(((await r.json()) as { value: number }).value);
    if (!Number.isFinite(n)) return null;
    cache.set(key, Math.max(cache.get(key) ?? 0, n));
    return cache.get(key)!;
  } catch {
    return null;
  }
}

async function readAbacus(key: string, hit: boolean): Promise<number | null> {
  const known = cache.get(key);
  if (known !== undefined) {
    const value = hit ? known + 1 : known;
    cache.set(key, value);
    after(() => abacus(hit ? "hit" : "get", key));
    return value;
  }
  return abacus(hit ? "hit" : "get", key);
}

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const isNew = q.get("new") === "1", isNewToday = q.get("newToday") === "1";
  const day = todayKey();
  const headers = { "Cache-Control": "no-store" };

  if (REDIS_URL && REDIS_TOKEN) {
    const c = await viaRedis(isNew, isNewToday, day);
    if (c) return NextResponse.json({ ...c, store: "redis" }, { headers });
  }

  for (const k of cache.keys()) if (k.startsWith("day-") && k !== day) cache.delete(k);
  const [total, today] = await Promise.all([readAbacus("visitors", isNew), readAbacus(day, isNewToday)]);
  if (total === null) return NextResponse.json({ total: null, today: null }, { status: 503, headers });
  return NextResponse.json({ total, today: today ?? null, store: "public" }, { headers });
}
