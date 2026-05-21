import { NextResponse } from "next/server";
import { marketEngine } from "@/lib/prediction-market/market-engine";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const trending = marketEngine.getTrending();
  return NextResponse.json(trending, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "CDN-Cache-Control": "no-store",
      "Vercel-CDN-Cache-Control": "no-store",
    },
  });
}