import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    if (!username || username.length < 3) {
      return NextResponse.json({ error: "Username must be at least 3 characters" }, { status: 400 });
    }
    
    const existing = await prisma.user.findUnique({ where: { username } });
    if (existing) {
      return NextResponse.json({ error: "Username already exists" }, { status: 400 });
    }
    
    const hashedPassword = await bcrypt.hash(password || "default", 10);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        demoBalance: 10000,
        bonusBalance: 5000,
        wageringReq: 15000,
      },
    });
    
    return NextResponse.json({ success: true, user: { id: user.id, username: user.username } });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}