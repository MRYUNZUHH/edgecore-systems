// GAME PROVIDER AGGREGATION LAYER
// Simulates real provider integration (Pragmatic Play, Evolution, Spribe, etc.)

export interface GameProvider {
  id: string;
  name: string;
  type: 'slots' | 'live' | 'crash' | 'table' | 'virtual';
  launchUrl: string;
  requiresAuth: boolean;
  supportedRegions: string[];
}

export interface GameSession {
  sessionId: string;
  playerId: string;
  gameId: string;
  providerId: string;
  token: string;
  launchUrl: string;
  expiresAt: number;
}

// Simulated providers (in production, these would be real API endpoints)
const providers: Record<string, GameProvider> = {
  pragmatic: {
    id: 'pragmatic',
    name: 'Pragmatic Play',
    type: 'slots',
    launchUrl: '/api/provider/launch',
    requiresAuth: true,
    supportedRegions: ['global', 'europe', 'africa'],
  },
  evolution: {
    id: 'evolution',
    name: 'Evolution Gaming',
    type: 'live',
    launchUrl: '/api/provider/launch',
    requiresAuth: true,
    supportedRegions: ['global', 'europe'],
  },
  spribe: {
    id: 'spribe',
    name: 'Spribe',
    type: 'crash',
    launchUrl: '/api/provider/launch',
    requiresAuth: true,
    supportedRegions: ['global', 'africa', 'europe'],
  },
  edgecore: {
    id: 'edgecore',
    name: 'EdgeCore Originals',
    type: 'crash',
    launchUrl: '/api/provider/launch',
    requiresAuth: false,
    supportedRegions: ['global'],
  },
};

export function getProvider(providerId: string): GameProvider | null {
  return providers[providerId] || null;
}

export function getProvidersByType(type: string): GameProvider[] {
  return Object.values(providers).filter(p => p.type === type);
}

export function getProvidersByRegion(region: string): GameProvider[] {
  return Object.values(providers).filter(p => p.supportedRegions.includes(region) || p.supportedRegions.includes('global'));
}

export function createGameSession(playerId: string, gameId: string, providerId: string): GameSession {
  const provider = getProvider(providerId);
  if (!provider) throw new Error('Provider not found');
  
  return {
    sessionId: `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    playerId,
    gameId,
    providerId,
    token: `token_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`,
    launchUrl: `${provider.launchUrl}?token=xxx&game=${gameId}`,
    expiresAt: Date.now() + 3600000, // 1 hour
  };
}

export function validateSession(session: GameSession): boolean {
  return session.expiresAt > Date.now();
}