import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin", 10);
  
  // Admin user
  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      email: "admin@edgecore.com",
      password: hashedPassword,
      role: "ADMIN",
      demoBalance: 50000,
      vipLevel: 5,
      kycVerified: true,
    },
  });

  // Games
  const games = [
    { slug: "dice", title: "Dice", category: "Originals", rtp: 96.0, houseEdge: 4.0, volatility: "LOW" },
    { slug: "crash", title: "Crash", category: "Crash", rtp: 97.0, houseEdge: 3.0, volatility: "HIGH" },
    { slug: "roulette", title: "Roulette", category: "Table", rtp: 97.3, houseEdge: 2.7, volatility: "MEDIUM" },
    { slug: "plinko", title: "Plinko", category: "Originals", rtp: 96.5, houseEdge: 3.5, volatility: "LOW" },
    { slug: "blackjack", title: "Blackjack", category: "Table", rtp: 99.5, houseEdge: 0.5, volatility: "LOW" },
    { slug: "mines", title: "Mines", category: "Originals", rtp: 95.0, houseEdge: 5.0, volatility: "MEDIUM" },
    { slug: "aviator", title: "Aviator", category: "Crash", rtp: 97.0, houseEdge: 3.0, volatility: "HIGH" },
  ];

  for (const g of games) {
    await prisma.game.upsert({ where: { slug: g.slug }, update: g, create: g });
  }

  console.log("✅ Seed complete");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());