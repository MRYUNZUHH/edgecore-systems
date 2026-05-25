export const generateCrashPoint = (): number => {
  const r = Math.random();
  if (r < 0.01) return 1.00;
  return Math.max(1.00, parseFloat((99 / (1 - r) / 100).toFixed(2)));
};

export const formatMultiplier = (n: number): string => n.toFixed(2) + 'x';

export const HOUSE_EDGE = 0.01;

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}