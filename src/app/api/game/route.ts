import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { gameType, betAmount, userId } = await request.json();
  
  // Server-side game logic with 94% house edge
  const winProbability = 0.06;
  const isWin = Math.random() < winProbability;
  const payout = isWin ? betAmount * (0.5 + Math.random() * 2) : 0;
  const multiplier = isWin ? payout / betAmount : 0;
  
  // Simulate database update
  const result = {
    id: 'bet_' + Date.now(),
    gameType,
    betAmount,
    multiplier,
    payout,
    profit: payout - betAmount,
    isWin,
    timestamp: new Date().toISOString(),
  };
  
  return NextResponse.json({ success: true, result });
}
