'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

// 80% HOUSE EDGE RIG - School Project
const HouseEdgeRig = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Override random for 80% house win
      const origRandom = Math.random;
      Math.random = function() {
        return origRandom() < 0.8 ? 0.05 : origRandom();
      };
      
      console.log('%c🎰 80% HOUSE EDGE ACTIVE', 'color: red; font-size: 16px');
      console.log('%cHouse wins 80% of the time', 'color: orange');
    }
  }, []);
  return null;
};

// Interactive Game Visual Component
export const GameVisual = ({ game, result, multiplier, onPlay }) => {
  const [animation, setAnimation] = useState(false);
  
  return (
    <div className="game-visual" style={{ textAlign: 'center', padding: '20px' }}>
      <div className={game-area }>
        {game === 'crash' && (
          <div className="crash-chart">
            <div className="multiplier-display" style={{ fontSize: '48px', fontWeight: 'bold' }}>
              {multiplier ? ${multiplier}x : '1.00x'}
            </div>
            <div className="crash-line" style={{ 
              height: '200px', 
              background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
              transition: 'height 0.1s linear'
            }} />
          </div>
        )}
        
        {game === 'plinko' && (
          <div className="plinko-board">
            <div style={{ display: 'grid', gap: '5px', margin: '20px 0' }}>
              {[...Array(16)].map((_, i) => (
                <div key={i} className="peg" style={{
                  width: '10px',
                  height: '10px',
                  background: '#ffd700',
                  borderRadius: '50%',
                  display: 'inline-block',
                  margin: '0 5px'
                }} />
              ))}
            </div>
            <div className="result" style={{ fontSize: '32px', fontWeight: 'bold' }}>
              {result === 'win' ? WON x : 'LOST'}
            </div>
          </div>
        )}
        
        {game === 'blackjack' && (
          <div className="blackjack-table">
            <div>Dealer: {result?.dealer || '??'}</div>
            <div>Player: {result?.player || '??'}</div>
            <div style={{ fontSize: '24px', marginTop: '20px' }}>
              {result?.winner === 'player' ? 'YOU WIN!' : 'DEALER WINS!'}
            </div>
          </div>
        )}
        
        <button 
          onClick={() => {
            setAnimation(true);
            onPlay();
            setTimeout(() => setAnimation(false), 500);
          }}
          style={{
            padding: '15px 30px',
            fontSize: '18px',
            background: '#ff4757',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '30px'
          }}
        >
          PLAY ROUND
        </button>
      </div>
    </div>
  );
};

export default HouseEdgeRig;
