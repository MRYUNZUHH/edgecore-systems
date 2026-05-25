export function generateCrashPoint(): number {
  const r = Math.random();
  if (r < 0.01) return 1.00;
  return Math.max(1.01, parseFloat((Math.floor(99/(1-r))/100).toFixed(2)));
}
export function generateMinesGrid(rows: number, cols: number, mineCount: number): boolean[][] {
  const total = rows * cols;
  const positions = new Set<number>();
  while (positions.size < mineCount) positions.add(Math.floor(Math.random() * total));
  const grid: boolean[][] = [];
  for (let r = 0; r < rows; r++) {
    grid[r] = [];
    for (let c = 0; c < cols; c++) grid[r][c] = positions.has(r * cols + c);
  }
  return grid;
}
export function shuffleDeck(): { suit: string; rank: string; value: number }[] {
  const suits = ["♠","♥","♦","♣"];
  const ranks = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
  const deck = suits.flatMap(s => ranks.map(r => ({ suit: s, rank: r, value: r==="A"?11:["J","Q","K"].includes(r)?10:parseInt(r) })));
  return deck.sort(() => Math.random() - 0.5);
}
export function rollDice(): number { return Math.floor(Math.random() * 10000) / 100; }
export function drawKeno(count: number, from: number): number[] {
  const nums = Array.from({length: from}, (_,i) => i + 1).sort(() => Math.random() - 0.5);
  return nums.slice(0, count).sort((a,b) => a - b);
}
export function spinWheel(risk: "low"|"medium"|"high"): number {
  const segments: Record<string, number[]> = {
    low: [1.2,1.2,1.2,1.5,1.5,1.5,2,2,2,3],
    medium: [1.5,1.5,2,2,2,3,3,5,5,10],
    high: [2,2,3,3,3,5,5,10,10,50]
  };
  return segments[risk][Math.floor(Math.random() * segments[risk].length)];
}
export function calculateMultiplier(revealed: number, total: number, mines: number): number {
  const safe = total - mines;
  if (revealed >= safe) return 100;
  let mult = 1;
  for (let i = 0; i < revealed; i++) mult *= (safe - i) / (total - i);
  return parseFloat((mult * 0.97).toFixed(2));
}