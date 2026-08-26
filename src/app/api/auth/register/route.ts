import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import bcrypt from "bcryptjs";

function isEmailValid(email: string) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL) {
    console.error("Auth register failed: DATABASE_URL is not configured.");
    return NextResponse.json({ error: "Server database is not configured." }, { status: 500 });
  }

  try {
    const { username, email, password } = await request.json();
    const normalizedUsername = String(username || "").trim();
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const normalizedPassword = String(password || "");

    if (normalizedUsername.length < 3) {
      return NextResponse.json({ error: "Username must be at least 3 characters." }, { status: 400 });
    }
    if (!isEmailValid(normalizedEmail)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }
    if (normalizedPassword.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username: normalizedUsername },
          { email: normalizedEmail },
        ],
      },
    });

    if (existingUser) {
      if (existingUser.username === normalizedUsername) {
        return NextResponse.json({ error: "Username already exists." }, { status: 400 });
      }
      return NextResponse.json({ error: "Email already exists." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(normalizedPassword, 10);
    const user = await prisma.user.create({
      data: {
        username: normalizedUsername,
        email: normalizedEmail,
        password: hashedPassword,
        demoBalance: 10000,
        bonusBalance: 5000,
        wageringReq: 15000,
      },
    });

    return NextResponse.json({ success: true, user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error("Auth register failed:", error);
    return NextResponse.json({ error: "Unable to create account at this time." }, { status: 500 });
  }
}
