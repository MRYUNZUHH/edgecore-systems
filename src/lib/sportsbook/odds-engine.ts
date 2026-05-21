// REAL-TIME ODDS ENGINE
// Simulates live odds feeds — replace with Sportradar/Betradar in production

export interface LiveEvent {
  id: string;
  sport: string;
  homeTeam: string;
  awayTeam: string;
  startTime: number;
  status: 'upcoming' | 'live' | 'finished';
  minute: number;
  score: { home: number; away: number };
  odds: {
    home: number;
    draw: number | null;
    away: number;
  };
  stats: {
    possession: { home: number; away: number };
    shots: { home: number; away: number };
    corners: { home: number; away: number };
    cards: { home: number; away: number };
  };
  momentum: 'home' | 'away' | 'neutral';
}

// Live odds generator — updates every 2 seconds
export function createLiveOddsEngine() {
  const events: Map<string, LiveEvent> = new Map();
  
  // Seed events
  const seedEvents: LiveEvent[] = [
    {
      id: 'evt_1', sport: 'Football', homeTeam: 'Real Madrid', awayTeam: 'Barcelona',
      startTime: Date.now() - 1800000, status: 'live', minute: 32,
      score: { home: 1, away: 1 },
      odds: { home: 2.10, draw: 3.50, away: 3.20 },
      stats: { possession: { home: 52, away: 48 }, shots: { home: 8, away: 6 }, corners: { home: 4, away: 3 }, cards: { home: 1, away: 2 } },
      momentum: 'home',
    },
    {
      id: 'evt_2', sport: 'Basketball', homeTeam: 'Lakers', awayTeam: 'Celtics',
      startTime: Date.now() - 3600000, status: 'live', minute: 24,
      score: { home: 56, away: 52 },
      odds: { home: 1.80, draw: null, away: 2.00 },
      stats: { possession: { home: 50, away: 50 }, shots: { home: 45, away: 42 }, corners: { home: 0, away: 0 }, cards: { home: 0, away: 0 } },
      momentum: 'away',
    },
    {
      id: 'evt_3', sport: 'Tennis', homeTeam: 'Djokovic', awayTeam: 'Nadal',
      startTime: Date.now() - 7200000, status: 'live', minute: 0,
      score: { home: 2, away: 1 },
      odds: { home: 1.55, draw: null, away: 2.50 },
      stats: { possession: { home: 0, away: 0 }, shots: { home: 0, away: 0 }, corners: { home: 0, away: 0 }, cards: { home: 0, away: 0 } },
      momentum: 'home',
    },
    {
      id: 'evt_4', sport: 'Football', homeTeam: 'Arsenal', awayTeam: 'Chelsea',
      startTime: Date.now() + 3600000, status: 'upcoming', minute: 0,
      score: { home: 0, away: 0 },
      odds: { home: 2.40, draw: 3.30, away: 2.80 },
      stats: { possession: { home: 50, away: 50 }, shots: { home: 0, away: 0 }, corners: { home: 0, away: 0 }, cards: { home: 0, away: 0 } },
      momentum: 'neutral',
    },
  ];
  
  seedEvents.forEach(e => events.set(e.id, e));
  
  // Update odds randomly
  setInterval(() => {
    events.forEach((event, id) => {
      if (event.status === 'live') {
        const updated = { ...event };
        updated.odds.home = parseFloat((event.odds.home + (Math.random() - 0.5) * 0.08).toFixed(2));
        updated.odds.away = parseFloat((event.odds.away + (Math.random() - 0.5) * 0.08).toFixed(2));
        if (updated.odds.draw) {
          updated.odds.draw = parseFloat((updated.odds.draw + (Math.random() - 0.5) * 0.05).toFixed(2));
        }
        updated.minute = event.status === 'live' ? event.minute + 1 : event.minute;
        events.set(id, updated);
      }
    });
  }, 2000);
  
  return {
    getAllEvents: () => Array.from(events.values()),
    getEvent: (id: string) => events.get(id) || null,
    getEventsBySport: (sport: string) => Array.from(events.values()).filter(e => e.sport === sport),
    getLiveEvents: () => Array.from(events.values()).filter(e => e.status === 'live'),
  };
}

export const oddsEngine = createLiveOddsEngine();