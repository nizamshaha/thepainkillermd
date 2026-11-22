import { NextResponse, after } from "next/server";

// Site-wide visitor counter. The total is kept by a free public counting
// service (abacus.jasoncameron.dev). That service can be slow, so this route
// remembers the latest total and answers at once, updating the service after
// the response has been sent.
const BASE = "https://abacus.jasoncameron.dev";
const KEY = "thepainkillermd/visitors";

export const dynamic = "force-dynamic";

let cached: number | null = null;

async function remote(op: "hit" | "get"): Promise<number | null> {
  try {
    const r = await fetch(`${BASE}/${op}/${KEY}`, { cache: "no-store", signal: AbortSignal.timeout(9000) });
    if (!r.ok) return null;
    const { value } = (await r.json()) as { value: number };
    const n = Number(value);
    if (Number.isFinite(n) && n > 0) cached = Math.max(cached ?? 0, n);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const hit = new URL(req.url).searchParams.get("hit") === "1";
  const headers = { "Cache-Control": "no-store" };

  if (cached !== null) {
    // Fast path: answer from memory, record the visit in the background.
    const count = hit ? (cached += 1) : cached;
    after(() => remote(hit ? "hit" : "get"));
    return NextResponse.json({ count }, { headers });
  }

  const n = await remote(hit ? "hit" : "get");
  if (n === null) return NextResponse.json({ count: null }, { status: 503, headers });
  return NextResponse.json({ count: n }, { headers });
}
