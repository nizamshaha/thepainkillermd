import { NextResponse } from "next/server";
import { getInstanceStatus, isEvolutionConfigured } from "@/lib/evolution/client";

export async function GET() {
  if (!isEvolutionConfigured()) {
    return NextResponse.json({ connected: false, configured: false });
  }
  const status = await getInstanceStatus();
  return NextResponse.json({ connected: status.connected, configured: true, error: status.error });
}