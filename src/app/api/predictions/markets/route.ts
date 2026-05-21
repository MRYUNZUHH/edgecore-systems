import { NextResponse } from "next/server";
import { marketEngine } from "@/lib/prediction-market/market-engine";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const markets = category ? marketEngine.getMarketsByCategory(category) : marketEngine.getAllMarkets();
  
  return NextResponse.json(markets, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "CDN-Cache-Control": "no-store",
      "Vercel-CDN-Cache-Control": "no-store",
    },
  });
}