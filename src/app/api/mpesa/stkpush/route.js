import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Your MPesa credentials
const consumerKey = 'vFsF0ZqmbvzJPinZvLusiodQOmqUuDcwic7UBjM5uHaoTWA5';
const consumerSecret = 'Y48Lc4M2fIBsEbWRFoACj7ouyGp0AUnbtfAGh2uvAXy2PQGQ7bDqXIOPW9izPykf';
const shortCode = '174379';
const passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';

async function getAccessToken() {
    const auth = Buffer.from(consumerKey + ':' + consumerSecret).toString('base64');
    
    const response = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
        method: 'GET',
        headers: { 'Authorization': 'Basic ' + auth }
    });
    
    const data = await response.json();
    return data.access_token;
}

function formatPhoneNumber(phone) {
    let cleaned = phone.toString().replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
        cleaned = '254' + cleaned.substring(1);
    } else if (cleaned.startsWith('+')) {
        cleaned = cleaned.substring(1);
    }
    return cleaned;
}

function getTimestamp() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return year + month + day + hours + minutes + seconds;
}

function generatePassword(timestamp) {
    const str = shortCode + passkey + timestamp;
    const buffer = crypto.createHash('sha256').update(str).digest();
    return buffer.toString('base64');
}

export async function POST(request) {
    try {
        const { phone, amount } = await request.json();
        
        console.log('Payment request:', { phone, amount });
        
        if (!phone || phone.length < 10) {
            return NextResponse.json({
                success: false,
                error: 'Enter valid M-Pesa number'
            }, { status: 400 });
        }
        
        if (!amount || amount < 10) {
            return NextResponse.json({
                success: false,
                error: 'Minimum KES 10'
            }, { status: 400 });
        }
        
        const formattedPhone = formatPhoneNumber(phone);
        const timestamp = getTimestamp();
        const password = generatePassword(timestamp);
        const token = await getAccessToken();
        
        const stkRequest = {
            BusinessShortCode: shortCode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: 'CustomerPayBillOnline',
            Amount: Math.round(amount),
            PartyA: formattedPhone,
            PartyB: shortCode,
            PhoneNumber: formattedPhone,
            CallBackURL: 'https://edgecore-systems.vercel.app/api/mpesa/callback',
            AccountReference: 'EDGECORE',
            TransactionDesc: 'Wallet Deposit'
        };
        
        const response = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(stkRequest)
        });
        
        const data = await response.json();
        
        if (data.ResponseCode === '0') {
            return NextResponse.json({
                success: true,
                checkoutRequestID: data.CheckoutRequestID,
                message: 'STK Push sent! Check your phone.'
            });
        } else {
            return NextResponse.json({
                success: false,
                error: data.errorMessage || 'STK Push failed'
            }, { status: 400 });
        }
        
    } catch (error) {
        console.error('MPesa Error:', error);
        return NextResponse.json({
            success: false,
            error: error.message || 'Payment failed'
        }, { status: 500 });
    }
}
