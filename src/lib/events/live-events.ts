// LIVE EVENT INGESTION ENGINE
// Fetches real events from public APIs — replace with paid APIs in production

export interface LiveWorldEvent {
  id: string;
  type: 'sports' | 'crypto' | 'news' | 'finance';
  title: string;
  source: string;
  timestamp: number;
  data: any;
}

// Simulated event stream — in production, use WebSockets from real APIs
const eventSources = {
  crypto: async () => {
    try {
      const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true", { cache: "no-store" });
      const data = await res.json();
      return Object.entries(data).map(([id, info]: any) => ({
        id: `crypto_${id}_${Date.now()}`,
        type: 'crypto' as const,
        title: `${id.toUpperCase()} — $${info.usd} (${info.usd_24h_change?.toFixed(2)}%)`,
        source: 'CoinGecko',
        timestamp: Date.now(),
        data: info,
      }));
    } catch { return []; }
  },
  sports: async () => {
    // Simulated sports events — replace with real OddsPapi/TickOdds API
    return [
      { id: `sport_${Date.now()}`, type: 'sports' as const, title: "Arsenal vs Chelsea — Live 2-1 (67')", source: 'LiveScore', timestamp: Date.now(), data: {} },
      { id: `sport_${Date.now()}_2`, type: 'sports' as const, title: "Lakers vs Celtics — Q3 78-72", source: 'ESPN', timestamp: Date.now(), data: {} },
    ];
  },
};

export async function fetchLiveEvents(): Promise<LiveWorldEvent[]> {
  const events: LiveWorldEvent[] = [];
  for (const source of Object.values(eventSources)) {
    try {
      const results = await source();
      events.push(...results);
    } catch (e) {
      console.error("Event fetch failed:", e);
    }
  }
  return events.sort((a, b) => b.timestamp - a.timestamp);
}