const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const admin = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      email: "admin@edgecore.com",
      password: "admin", // plain text for demo only
      role: "ADMIN",
      demoBalance: 50000,
      vipLevel: 5,
    },
  });

  // Create demo games
  const games = [
    { slug: "dice", title: "Dice", category: "Originals", rtp: 96.0, houseEdge: 4.0, volatility: "LOW" },
    { slug: "crash", title: "Crash", category: "Crash", rtp: 97.0, houseEdge: 3.0, volatility: "HIGH" },
    { slug: "mines", title: "Mines", category: "Originals", rtp: 95.0, houseEdge: 5.0, volatility: "MEDIUM" },
    { slug: "plinko", title: "Plinko", category: "Originals", rtp: 96.5, houseEdge: 3.5, volatility: "LOW" },
    { slug: "coinflip", title: "Coin Flip", category: "Originals", rtp: 96.0, houseEdge: 4.0, volatility: "LOW" },
    { slug: "limbo", title: "Limbo", category: "Crash", rtp: 97.5, houseEdge: 2.5, volatility: "HIGH" },
    { slug: "roulette", title: "Roulette", category: "Table", rtp: 97.3, houseEdge: 2.7, volatility: "MEDIUM" },
  ];

  for (let g of games) {
    await prisma.game.upsert({
      where: { slug: g.slug },
      update: g,
      create: g,
    });
  }

  // Create promotions
  await prisma.promotion.createMany({
    data: [
      { title: "Welcome Demo Bonus", description: "Get 5000 demo credits on signup", type: "WELCOME", startsAt: new Date(), endsAt: new Date("2027-01-01") },
      { title: "Daily Reward", description: "Login each day for extra credits", type: "DAILY", startsAt: new Date(), endsAt: new Date("2027-01-01") },
    ],
    skipDuplicates: true,
  });

  console.log("? Seed complete");
}
main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => await prisma.$disconnect());
