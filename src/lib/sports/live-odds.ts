// LIVE SPORTS ODDS SIMULATOR
// In production, replace with real API (Sportradar, Betradar, Odds API)

export interface SportEvent {
  id: string;
  sport: string;
  homeTeam: string;
  awayTeam: string;
  startTime: number;
  status: 'upcoming' | 'live' | 'finished';
  score?: { home: number; away: number };
  odds: {
    home: number;
    draw?: number;
    away: number;
  };
}

const events: SportEvent[] = [
  {
    id: 'evt_1',
    sport: 'Football',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    startTime: Date.now() + 3600000,
    status: 'upcoming',
    odds: { home: 2.10, draw: 3.50, away: 3.20 },
  },
  {
    id: 'evt_2',
    sport: 'Basketball',
    homeTeam: 'Lakers',
    awayTeam: 'Celtics',
    startTime: Date.now() + 7200000,
    status: 'upcoming',
    odds: { home: 1.80, away: 2.00 },
  },
  {
    id: 'evt_3',
    sport: 'Tennis',
    homeTeam: 'Nadal',
    awayTeam: 'Djokovic',
    startTime: Date.now(),
    status: 'live',
    score: { home: 2, away: 1 },
    odds: { home: 1.55, away: 2.50 },
  },
  {
    id: 'evt_4',
    sport: 'Cricket',
    homeTeam: 'India',
    awayTeam: 'Australia',
    startTime: Date.now() + 86400000,
    status: 'upcoming',
    odds: { home: 1.90, away: 1.95 },
  },
];

export function getLiveEvents(): SportEvent[] {
  return events;
}

export function getEventsBySport(sport: string): SportEvent[] {
  return events.filter(e => e.sport.toLowerCase() === sport.toLowerCase());
}

// Simulates odds movement (in production, this comes from a real WebSocket feed)
export function simulateOddsUpdate(): SportEvent[] {
  return events.map(event => ({
    ...event,
    odds: {
      ...event.odds,
      home: parseFloat((event.odds.home + (Math.random() - 0.5) * 0.1).toFixed(2)),
      away: parseFloat((event.odds.away + (Math.random() - 0.5) * 0.1).toFixed(2)),
    },
  }));
}