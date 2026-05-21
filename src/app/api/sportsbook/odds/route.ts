import { NextResponse } from "next/server";
import { oddsEngine } from "@/lib/sportsbook/odds-engine";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const events = oddsEngine.getAllEvents().map(e => ({
    id: e.id,
    match: `${e.homeTeam} vs ${e.awayTeam}`,
    odds: e.odds,
    status: e.status,
    minute: e.minute,
  }));
  return NextResponse.json(events, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "CDN-Cache-Control": "no-store",
      "Vercel-CDN-Cache-Control": "no-store",
    },
  });
}