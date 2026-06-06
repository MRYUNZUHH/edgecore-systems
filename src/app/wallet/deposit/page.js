'use client';

import { useState, useEffect } from 'react';

export default function DepositPage() {
  const [activeTab, setActiveTab] = useState('crypto');
  const [amountUSD, setAmountUSD] = useState('');
  const [amountKES, setAmountKES] = useState('');
  const [phone, setPhone] = useState('');
  const [exchangeRate, setExchangeRate] = useState(130);
  const [transactionHash, setTransactionHash] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('TRC20');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch real exchange rate
  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await res.json();
        if (data.rates.KES) setExchangeRate(data.rates.KES);
      } catch (error) {
        console.log('Using default rate');
      }
    };
    fetchRate();
  }, []);

  // Update KES when USD changes
  useEffect(() => {
    if (amountUSD && !isNaN(amountUSD) && amountUSD > 0) {
      const kes = parseFloat(amountUSD) * exchangeRate;
      setAmountKES(Math.round(kes).toString());
    } else {
      setAmountKES('');
    }
  }, [amountUSD, exchangeRate]);

  const handleMpesaDeposit = async () => {
    if (!phone) {
      setMessage('Please enter your M-Pesa phone number');
      return;
    }
    if (!amountUSD || parseFloat(amountUSD) < 10) {
      setMessage('Minimum deposit is  USD');
      return;
    }
    
    setLoading(true);
    setMessage('Sending STK Push for KES ' + amountKES + '...');
    
    try {
      const res = await fetch('/api/mpesa/stkpush', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone, amount: parseInt(amountKES) })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setMessage('STK Push sent! Check your phone and enter PIN.');
      } else {
        setMessage('Error: ' + (data.error || 'Payment failed'));
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    }
    setLoading(false);
  };

  const handleCryptoDeposit = async () => {
    if (!transactionHash) {
      setMessage('Please paste your transaction hash');
      return;
    }
    if (!amountUSD || parseFloat(amountUSD) < 10) {
      setMessage('Minimum deposit is  USDT');
      return;
    }
    
    setLoading(true);
    setMessage('Verifying transaction...');
    
    try {
      const res = await fetch('/api/crypto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          transactionHash, 
          amount: parseFloat(amountUSD),
          currency: 'USDT',
          network: selectedNetwork
        })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setMessage('Deposit confirmed! Added $' + data.creditedAmount + ' to wallet');
      } else {
        setMessage('Error: ' + (data.error || 'Verification failed'));
      }
    } catch (error) {
      setMessage('Verification failed');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(255, 215, 0, 0.05) 0%, transparent 50%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            fontSize: '42px', 
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '10px'
          }}>
            EdgeCore Systems
          </h1>
          <p style={{ color: '#888', fontSize: '16px' }}>Deposit Funds</p>
        </div>

        {/* Tab Buttons - BOTH TABS */}
        <div style={{ 
          display: 'flex', 
          gap: '15px', 
          marginBottom: '30px',
          background: 'rgba(26, 26, 26, 0.95)',
          padding: '8px',
          borderRadius: '16px',
          border: '1px solid rgba(255, 215, 0, 0.2)'
        }}>
          <button
            onClick={() => setActiveTab('crypto')}
            style={{
              flex: 1,
              padding: '16px',
              background: activeTab === 'crypto' ? 'linear-gradient(135deg, #FFD700, #FFA500)' : 'transparent',
              color: activeTab === 'crypto' ? '#0a0a0a' : '#FFD700',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Cryptocurrency USDT
          </button>
          <button
            onClick={() => setActiveTab('mpesa')}
            style={{
              flex: 1,
              padding: '16px',
              background: activeTab === 'mpesa' ? 'linear-gradient(135deg, #FFD700, #FFA500)' : 'transparent',
              color: activeTab === 'mpesa' ? '#0a0a0a' : '#FFD700',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            M-Pesa Kenya
          </button>
        </div>

        {/* Crypto USDT Tab */}
        {activeTab === 'crypto' && (
          <div style={{
            background: 'rgba(26, 26, 26, 0.95)',
            borderRadius: '20px',
            padding: '30px',
            border: '1px solid rgba(255, 215, 0, 0.2)'
          }}>
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '10px', color: '#FFD700', fontWeight: 'bold' }}>
                Select Network
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['TRC20', 'ERC20', 'BEP20'].map(net => (
                  <button
                    key={net}
                    onClick={() => setSelectedNetwork(net)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: selectedNetwork === net ? '#FFD700' : '#2a2a2a',
                      color: selectedNetwork === net ? '#0a0a0a' : '#FFD700',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    {net}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '10px', color: '#FFD700', fontWeight: 'bold' }}>
                Amount (USDT)
              </label>
              <input
                type="number"
                value={amountUSD}
                onChange={(e) => setAmountUSD(e.target.value)}
                placeholder="Enter amount"
                style={{
                  width: '100%',
                  padding: '14px',
                  background: '#2a2a2a',
                  border: '1px solid #333',
                  borderRadius: '10px',
                  color: 'white',
                  fontSize: '16px'
                }}
              />
            </div>

            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TJwU4edcrmU5Z1Tb4yvFQAYcQUQiUwBAMW"
                alt="USDT QR Code"
                style={{ width: '150px', height: '150px', marginBottom: '15px' }}
              />
              <div style={{
                background: '#2a2a2a',
                padding: '15px',
                borderRadius: '10px',
                wordBreak: 'break-all'
              }}>
                <code style={{ color: '#FFD700', fontSize: '12px' }}>
                  TJwU4edcrmU5Z1Tb4yvFQAYcQUQiUwBAMW
                </code>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {['20', '50', '100', '250', '500', '1000'].map(amt => (
                  <button
                    key={amt}
                    onClick={() => setAmountUSD(amt)}
                    style={{
                      padding: '8px 16px',
                      background: '#2a2a2a',
                      border: '1px solid #FFD700',
                      borderRadius: '8px',
                      color: '#FFD700',
                      cursor: 'pointer'
                    }}
                  >
                    
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '10px', color: '#FFD700', fontWeight: 'bold' }}>
                Transaction Hash
              </label>
              <textarea
                value={transactionHash}
                onChange={(e) => setTransactionHash(e.target.value)}
                placeholder="Paste transaction hash"
                rows="3"
                style={{
                  width: '100%',
                  padding: '14px',
                  background: '#2a2a2a',
                  border: '1px solid #333',
                  borderRadius: '10px',
                  color: 'white',
                  fontSize: '14px'
                }}
              />
            </div>

            <button
              onClick={handleCryptoDeposit}
              disabled={loading}
              style={{
                width: '100%',
                padding: '16px',
                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                color: '#0a0a0a',
                border: 'none',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Verifying...' : 'Verify USDT Payment'}
            </button>
          </div>
        )}

        {/* M-Pesa Tab */}
        {activeTab === 'mpesa' && (
          <div style={{
            background: 'rgba(26, 26, 26, 0.95)',
            borderRadius: '20px',
            padding: '30px',
            border: '1px solid rgba(255, 215, 0, 0.2)'
          }}>
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '10px', color: '#FFD700', fontWeight: 'bold' }}>
                Amount (USD)
              </label>
              <input
                type="number"
                value={amountUSD}
                onChange={(e) => setAmountUSD(e.target.value)}
                placeholder="Enter amount in USD"
                style={{
                  width: '100%',
                  padding: '14px',
                  background: '#2a2a2a',
                  border: '1px solid #333',
                  borderRadius: '10px',
                  color: 'white',
                  fontSize: '16px'
                }}
              />
              {amountUSD && !isNaN(amountUSD) && amountUSD > 0 && (
                <div style={{ 
                  marginTop: '10px', 
                  padding: '10px', 
                  background: '#2a2a2a', 
                  borderRadius: '8px',
                  color: '#aaa'
                }}>
                  You will pay: <strong style={{ color: '#FFD700' }}>KES {parseInt(amountKES).toLocaleString()}</strong>
                  <br/>
                  <small>Exchange rate: 1 USD = {exchangeRate} KES</small>
                </div>
              )}
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '10px', color: '#FFD700', fontWeight: 'bold' }}>
                M-Pesa Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0712 345 678"
                style={{
                  width: '100%',
                  padding: '14px',
                  background: '#2a2a2a',
                  border: '1px solid #333',
                  borderRadius: '10px',
                  color: 'white',
                  fontSize: '16px'
                }}
              />
              <small style={{ color: '#aaa', display: 'block', marginTop: '5px' }}>
                You will receive STK Push from EdgeCore Systems
              </small>
            </div>

            <button
              onClick={handleMpesaDeposit}
              disabled={loading}
              style={{
                width: '100%',
                padding: '16px',
                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                color: '#0a0a0a',
                border: 'none',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Processing...' : 'Pay with M-Pesa'}
            </button>
          </div>
        )}

        {message && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            background: message.includes('sent') || message.includes('confirmed') ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
            color: message.includes('sent') || message.includes('confirmed') ? '#4caf50' : '#f44336',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
