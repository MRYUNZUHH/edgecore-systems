import { NextResponse } from "next/server";
import { oddsEngine } from "@/lib/sportsbook/odds-engine";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const events = oddsEngine.getAllEvents();
  return NextResponse.json(events, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "CDN-Cache-Control": "no-store",
      "Vercel-CDN-Cache-Control": "no-store",
    },
  });
}