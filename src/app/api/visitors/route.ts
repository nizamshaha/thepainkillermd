import { NextResponse } from "next/server";

// Site-wide visitor counter. Stored with a free public counting service
// (abacus.jasoncameron.dev); the browser only ever talks to this route.
const BASE = "https://abacus.jasoncameron.dev";
const KEY = "thepainkillermd/visitors";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const hit = new URL(req.url).searchParams.get("hit") === "1";
  try {
    const r = await fetch(`${BASE}/${hit ? "hit" : "get"}/${KEY}`, { cache: "no-store", signal: AbortSignal.timeout(9000) });
    if (r.status === 404 && !hit) return NextResponse.json({ count: 0 });
    if (!r.ok) throw new Error(String(r.status));
    const { value } = (await r.json()) as { value: number };
    return NextResponse.json({ count: Number(value) || 0 }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ count: null }, { status: 503 });
  }
}
