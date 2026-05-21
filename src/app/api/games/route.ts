import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  try {
    const games = await prisma.game.findMany({ where: { isActive: true } });
    return NextResponse.json(games.length ? games : defaultGames);
  } catch {
    return NextResponse.json(defaultGames);
  }
}

const defaultGames = [
  { id: "1", slug: "dice", title: "Dice", category: "Originals", rtp: 96.0, provider: "EdgeCore Originals", volatility: "LOW" },
  { id: "2", slug: "crash", title: "Crash", category: "Crash", rtp: 97.0, provider: "EdgeCore Originals", volatility: "HIGH" },
  { id: "3", slug: "roulette", title: "Roulette", category: "Table", rtp: 97.3, provider: "EdgeCore Originals", volatility: "MEDIUM" },
  { id: "4", slug: "plinko", title: "Plinko", category: "Originals", rtp: 96.5, provider: "EdgeCore Originals", volatility: "LOW" },
  { id: "5", slug: "blackjack", title: "Blackjack", category: "Table", rtp: 99.5, provider: "EdgeCore Originals", volatility: "LOW" },
];