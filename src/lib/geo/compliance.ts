// GEO-COMPLIANCE ENGINE
// Handles country restrictions, game availability, and regulations

export interface CountryRules {
  code: string;
  name: string;
  allowedProviders: string[];
  restrictedGames: string[];
  minAge: number;
  requiresKYC: boolean;
  allowedCurrencies: string[];
}

const countryRules: Record<string, CountryRules> = {
  KE: {
    code: 'KE',
    name: 'Kenya',
    allowedProviders: ['spribe', 'edgecore', 'pragmatic'],
    restrictedGames: [],
    minAge: 18,
    requiresKYC: true,
    allowedCurrencies: ['KES', 'USD'],
  },
  NG: {
    code: 'NG',
    name: 'Nigeria',
    allowedProviders: ['spribe', 'edgecore', 'pragmatic'],
    restrictedGames: [],
    minAge: 18,
    requiresKYC: true,
    allowedCurrencies: ['NGN', 'USD'],
  },
  GB: {
    code: 'GB',
    name: 'United Kingdom',
    allowedProviders: ['evolution', 'pragmatic'],
    restrictedGames: ['crash', 'mines'],
    minAge: 18,
    requiresKYC: true,
    allowedCurrencies: ['GBP'],
  },
  DE: {
    code: 'DE',
    name: 'Germany',
    allowedProviders: ['evolution', 'pragmatic', 'spribe'],
    restrictedGames: [],
    minAge: 18,
    requiresKYC: true,
    allowedCurrencies: ['EUR'],
  },
  global: {
    code: 'global',
    name: 'Global',
    allowedProviders: ['edgecore', 'spribe', 'pragmatic', 'evolution'],
    restrictedGames: [],
    minAge: 18,
    requiresKYC: false,
    allowedCurrencies: ['USD', 'EUR'],
  },
};

export function getCountryRules(countryCode: string): CountryRules {
  return countryRules[countryCode.toUpperCase()] || countryRules['global'];
}

export function isGameAllowed(countryCode: string, gameId: string, providerId: string): boolean {
  const rules = getCountryRules(countryCode);
  if (rules.restrictedGames.includes(gameId)) return false;
  if (!rules.allowedProviders.includes(providerId)) return false;
  return true;
}

export function detectCountryFromIP(ip: string): string {
  // In production, use a geo-IP service like MaxMind
  // For now, return global
  return 'global';
}