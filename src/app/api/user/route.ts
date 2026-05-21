import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true, username: true, email: true, role: true,
      demoBalance: true, bonusBalance: true, wageringReq: true,
      vipLevel: true, kycVerified: true, country: true,
    },
  });
  
  return NextResponse.json({ user });
}