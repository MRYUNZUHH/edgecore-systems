import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const callbackData = await request.json();
        console.log('Callback received:', JSON.stringify(callbackData, null, 2));
        
        const resultCode = callbackData?.Body?.stkCallback?.ResultCode;
        
        if (resultCode === '0') {
            console.log('Payment successful');
            return NextResponse.json({ success: true });
        } else {
            console.log('Payment failed');
            return NextResponse.json({ success: false });
        }
    } catch (error) {
        console.error('Callback error:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
