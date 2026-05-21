import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  return NextResponse.json({
    cashBalance: user?.demoBalance || 0,
    bonusBalance: user?.bonusBalance || 0,
    wageringRequirement: user?.wageringReq || 0,
  });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const { action, amount } = await request.json();
  
  if (action === "add_demo_funds") {
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: { demoBalance: { increment: amount || 1000 } },
    });
    await prisma.transaction.create({
      data: {
        userId: session.user.id,
        type: "DEMO_DEPOSIT",
        amount: amount || 1000,
        balanceBefore: user.demoBalance - (amount || 1000),
        balanceAfter: user.demoBalance,
      },
    });
    return NextResponse.json({ success: true, balance: user.demoBalance });
  }
  
  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}