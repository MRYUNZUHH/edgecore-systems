import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { action, email, password, username } = await request.json();
  
  // Simulated backend validation - replace with real Firebase calls
  if (action === 'login') {
    if (email && password) {
      return NextResponse.json({ 
        success: true, 
        user: { id: '1', email, username: email.split('@')[0] },
        token: 'fake-jwt-token'
      });
    }
    return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
  }
  
  if (action === 'register') {
    if (email && password && username) {
      return NextResponse.json({ 
        success: true, 
        user: { id: '1', email, username },
        token: 'fake-jwt-token'
      });
    }
    return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 });
  }
  
  return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
}
