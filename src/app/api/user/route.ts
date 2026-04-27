import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Simulate getting user from database
  const userData = {
    id: '1',
    username: 'Player1',
    email: 'player@edgecore.com',
    avatar: '😎',
    balance: 10000,
    vipTier: 0,
    totalBets: 0,
    totalWins: 0,
    totalLosses: 0,
  };
  
  return NextResponse.json({ success: true, user: userData });
}

export async function PUT(request: Request) {
  const updates = await request.json();
  // Simulate updating user in database
  return NextResponse.json({ success: true, updates });
}
