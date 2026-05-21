import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const { gameId, amount } = await request.json();
  
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user || user.demoBalance < amount) {
    return NextResponse.json({ error: "Insufficient funds" }, { status: 400 });
  }
  
  // Real game engine logic
  const houseEdge = 0.06;
  const win = Math.random() > houseEdge;
  const multiplier = win ? parseFloat((0.5 + Math.random() * 3).toFixed(2)) : 0;
  const payout = win ? amount * multiplier : 0;
  const profit = payout - amount;
  
  // Update user balance
  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: { demoBalance: { increment: profit } },
  });
  
  // Record bet
  const bet = await prisma.bet.create({
    data: {
      userId: session.user.id,
      gameId: gameId || "unknown",
      amount,
      payout,
      multiplier,
      outcome: win ? "win" : "loss",
      profit,
    },
  });
  
  // Record transaction
  await prisma.transaction.create({
    data: {
      userId: session.user.id,
      type: "BET",
      amount: payout || -amount,
      balanceBefore: user.demoBalance,
      balanceAfter: updatedUser.demoBalance,
    },
  });
  
  return NextResponse.json({ success: true, bet, balance: updatedUser.demoBalance });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const bets = await prisma.bet.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  
  return NextResponse.json({ bets });
}