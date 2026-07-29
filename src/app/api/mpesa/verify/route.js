// src/app/api/mpesa/verify/route.js
import { NextResponse } from 'next/server';

// Store pending verifications (in production, use a database)
const pendingVerifications = [];

export async function POST(request) {
    try {
        const { phone, amount, transactionId, mpesaMessage } = await request.json();
        
        console.log('Verification Request:', { phone, amount, transactionId });
        
        // Validate inputs
        if (!phone || !amount || !transactionId) {
            return NextResponse.json({
                success: false,
                error: 'Missing required fields'
            }, { status: 400 });
        }
        
        // Extract amount from M-Pesa message if provided
        let extractedAmount = amount;
        if (mpesaMessage) {
            const match = mpesaMessage.match(/Ksh\s*([\d,]+)/i);
            if (match) {
                extractedAmount = parseFloat(match[1].replace(/,/g, ''));
            }
        }
        
        // Create verification record
        const verification = {
            id: Date.now(),
            phone,
            amount: extractedAmount,
            transactionId,
            mpesaMessage,
            status: 'pending',
            timestamp: new Date().toISOString()
        };
        
        pendingVerifications.push(verification);
        
        return NextResponse.json({
            success: true,
            verificationId: verification.id,
            message: 'Payment verification submitted. Awaiting confirmation.'
        });
        
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (id) {
        const verification = pendingVerifications.find(v => v.id === parseInt(id));
        return NextResponse.json(verification || { status: 'not_found' });
    }
    
    return NextResponse.json(pendingVerifications);
}

// Admin function to confirm payment
export async function PUT(request) {
    try {
        const { verificationId, confirmed } = await request.json();
        
        const verification = pendingVerifications.find(v => v.id === verificationId);
        if (!verification) {
            return NextResponse.json({
                success: false,
                error: 'Verification not found'
            }, { status: 404 });
        }
        
        if (confirmed) {
            verification.status = 'confirmed';
            // Credit the user's balance
            const currentBalance = parseFloat(localStorage.getItem("ec_real_balance") || "0");
            const newBalance = currentBalance + verification.amount;
            localStorage.setItem("ec_real_balance", newBalance.toString());
        } else {
            verification.status = 'rejected';
        }
        
        return NextResponse.json({
            success: true,
            status: verification.status
        });
        
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
