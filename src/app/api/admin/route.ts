import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  
  const [totalUsers, totalBets, activeSessions] = await Promise.all([
    prisma.user.count(),
    prisma.bet.count(),
    prisma.session.count(),
  ]);
  
  const bets = await prisma.bet.findMany({ select: { amount: true, payout: true } });
  const totalWagered = bets.reduce((s, b) => s + b.amount, 0);
  const totalPayout = bets.reduce((s, b) => s + b.payout, 0);
  const rtp = totalWagered > 0 ? ((totalPayout / totalWagered) * 100).toFixed(1) : "0";
  
  return NextResponse.json({
    totalUsers,
    totalBets,
    activeSessions,
    rtp: parseFloat(rtp),
    totalWagered,
    totalPayout,
  });
}