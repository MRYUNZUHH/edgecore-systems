import { NextResponse } from "next/server";
import { marketEngine } from "@/lib/prediction-market/market-engine";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  const { marketId, side, amount } = await request.json();
  const result = marketEngine.trade(marketId, side, amount);
  if (result.success) {
    return NextResponse.json(result);
  }
  return NextResponse.json(result, { status: 400 });
}