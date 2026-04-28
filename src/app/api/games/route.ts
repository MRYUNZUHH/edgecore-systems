import { NextResponse } from "next/server";

const mockGames = [
  { id: "1", slug: "dice", title: "Dice", category: "Originals", rtp: 96.0, volatility: "LOW", provider: "EdgeCore Originals" },
  { id: "2", slug: "crash", title: "Crash", category: "Crash", rtp: 97.0, volatility: "HIGH", provider: "EdgeCore Originals" },
  { id: "3", slug: "roulette", title: "Roulette", category: "Table", rtp: 97.3, volatility: "MEDIUM", provider: "EdgeCore Originals" },
  { id: "4", slug: "plinko", title: "Plinko", category: "Originals", rtp: 96.5, volatility: "LOW", provider: "EdgeCore Originals" },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    // Dynamic import so build doesn't break if Prisma isn't generated yet
    const prisma = (await import("@/lib/db/prisma")).default;
    const games = await prisma.game.findMany({
      where: category ? { category } : {},
      orderBy: { title: "asc" },
    });
    return NextResponse.json(games.length ? games : mockGames);
  } catch (error) {
    return NextResponse.json(mockGames);
  }
}
