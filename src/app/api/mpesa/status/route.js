import { NextResponse } from 'next/server';

// Store transactions in memory (use database in production)
const transactions = new Map();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const checkoutID = searchParams.get('checkoutID');
    
    if (!checkoutID) {
        return NextResponse.json({ error: 'No checkout ID' }, { status: 400 });
    }
    
    const transaction = transactions.get(checkoutID);
    
    return NextResponse.json({
        status: transaction?.status || 'pending',
        message: transaction?.message || 'Waiting for payment confirmation'
    });
}

// Export for storing transactions (import in callback)
export { transactions };
