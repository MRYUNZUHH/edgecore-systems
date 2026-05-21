// PREDICTION MARKET ENGINE
// Real-time market generation, pricing, and settlement

export interface PredictionMarket {
  id: string;
  question: string;
  category: 'sports' | 'crypto' | 'politics' | 'entertainment' | 'tech' | 'finance';
  yesPrice: number;    // Current YES price (0-100)
  noPrice: number;     // Current NO price (always 100 - yesPrice)
  volume: number;      // Total volume traded
  liquidity: number;   // Available liquidity
  expiry: number;      // Settlement timestamp
  status: 'active' | 'settled' | 'disputed';
  outcome?: 'yes' | 'no';
  traders: number;     // Number of unique traders
  createdAt: number;
  priceHistory: { time: number; price: number }[];
}

// Live market generation — simulates real-time market creation
const trendingTopics = [
  { q: "Will Bitcoin reach $150K before July 2026?", cat: "crypto" },
  { q: "Will Arsenal win the Premier League 2026/27?", cat: "sports" },
  { q: "Will OpenAI release GPT-6 in 2026?", cat: "tech" },
  { q: "Will the Fed cut rates in Q3 2026?", cat: "finance" },
  { q: "Will Drake drop a new album this year?", cat: "entertainment" },
  { q: "Will Ethereum flip Bitcoin in market cap?", cat: "crypto" },
  { q: "Will Trump win the 2028 election?", cat: "politics" },
  { q: "Will Tesla stock close above $500 by December?", cat: "finance" },
  { q: "Will Spain win the 2026 World Cup?", cat: "sports" },
  { q: "Will Apple release AR glasses in 2026?", cat: "tech" },
  { q: "Will Mbappe score 40+ goals this season?", cat: "sports" },
  { q: "Will the UK rejoin the EU by 2030?", cat: "politics" },
];

const markets: Map<string, PredictionMarket> = new Map();

// Initialize markets
trendingTopics.forEach((topic, i) => {
  const yesPrice = Math.floor(Math.random() * 60) + 20; // 20-80 range
  markets.set(`market_${i}`, {
    id: `market_${i}`,
    question: topic.q,
    category: topic.cat as any,
    yesPrice,
    noPrice: 100 - yesPrice,
    volume: Math.floor(Math.random() * 500000) + 10000,
    liquidity: Math.floor(Math.random() * 200000) + 5000,
    expiry: Date.now() + Math.floor(Math.random() * 90) * 86400000,
    status: 'active',
    traders: Math.floor(Math.random() * 5000) + 100,
    createdAt: Date.now() - Math.floor(Math.random() * 30) * 86400000,
    priceHistory: Array.from({ length: 24 }, (_, i) => ({
      time: Date.now() - (24 - i) * 3600000,
      price: Math.floor(Math.random() * 60) + 20,
    })),
  });
});

// Update prices every 3 seconds
setInterval(() => {
  markets.forEach((market, id) => {
    const volatility = Math.random() * 4 - 2;
    const newYes = Math.max(1, Math.min(99, market.yesPrice + volatility));
    market.yesPrice = parseFloat(newYes.toFixed(1));
    market.noPrice = parseFloat((100 - newYes).toFixed(1));
    market.volume += Math.floor(Math.random() * 5000);
    market.priceHistory.push({ time: Date.now(), price: newYes });
    if (market.priceHistory.length > 100) market.priceHistory.shift();
  });
}, 3000);

export const marketEngine = {
  getAllMarkets: () => Array.from(markets.values()),
  getMarket: (id: string) => markets.get(id) || null,
  getMarketsByCategory: (cat: string) => Array.from(markets.values()).filter(m => m.category === cat),
  getTrending: () => Array.from(markets.values()).sort((a, b) => b.volume - a.volume).slice(0, 8),
  getActive: () => Array.from(markets.values()).filter(m => m.status === 'active'),
  trade: (marketId: string, side: 'yes' | 'no', amount: number) => {
    const market = markets.get(marketId);
    if (!market || market.status !== 'active') return { success: false, error: 'Market not available' };
    const price = side === 'yes' ? market.yesPrice : market.noPrice;
    const shares = amount / (price / 100);
    market.volume += amount;
    return { success: true, shares: Math.floor(shares), price };
  },
};