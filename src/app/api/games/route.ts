import { NextResponse } from "next/server";

export async function GET() {
  const games = [
    { id: "1", slug: "dice", title: "Dice", category: "Originals", rtp: 96.0, volatility: "LOW", provider: "EdgeCore Originals" },
    { id: "2", slug: "crash", title: "Crash", category: "Crash", rtp: 97.0, volatility: "HIGH", provider: "EdgeCore Originals" },
    { id: "3", slug: "roulette", title: "Roulette", category: "Table", rtp: 97.3, volatility: "MEDIUM", provider: "EdgeCore Originals" },
    { id: "4", slug: "plinko", title: "Plinko", category: "Originals", rtp: 96.5, volatility: "LOW", provider: "EdgeCore Originals" },
  ];
  return NextResponse.json(games);
}
