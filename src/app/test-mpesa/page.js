'use client';

import { useState } from 'react';

export default function TestMPesaPage() {
  const [phone, setPhone] = useState('254708374149');
  const [amount, setAmount] = useState('10');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const testPayment = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const res = await fetch('/api/mpesa/stkpush', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, amount: parseInt(amount) })
      });
      
      const data = await res.json();
      setResult(data);
      
      if (data.success) {
        let attempts = 0;
        const interval = setInterval(async () => {
          attempts++;
          const statusRes = await fetch('/api/mpesa/status?checkoutID=' + data.checkoutRequestID);
          const statusData = await statusRes.json();
          
          if (statusData.status === 'completed') {
            clearInterval(interval);
            setResult(prev => ({ ...prev, completed: true, message: 'Payment completed successfully!' }));
          } else if (attempts > 20) {
            clearInterval(interval);
          }
        }, 3000);
      }
    } catch (error) {
      setResult({ success: false, error: error.message });
    }
    
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px' }}>
      <h1>Test MPesa Payment</h1>
      <p>Sandbox Mode - No real money</p>
      
      <div style={{ marginBottom: '20px' }}>
        <label>Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '5px' }}
        />
        <small>Test number: 254708374149</small>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label>Amount (KES)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '5px' }}
        />
        <small>Minimum: 10 KES</small>
      </div>
      
      <button
        onClick={testPayment}
        disabled={loading}
        style={{
          width: '100%',
          padding: '15px',
          background: loading ? '#ccc' : '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Processing...' : 'Make Payment'}
      </button>
      
      {result && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: result.success ? '#d4edda' : '#f8d7da',
          color: result.success ? '#155724' : '#721c24',
          borderRadius: '5px'
        }}>
          <strong>{result.success ? 'Success!' : 'Failed'}</strong>
          <pre style={{ marginTop: '10px', fontSize: '12px', overflow: 'auto' }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
