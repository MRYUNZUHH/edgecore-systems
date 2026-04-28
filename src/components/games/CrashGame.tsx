'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/game-store';
import { RuleModal } from '@/components/ui/RuleModal';

export function CrashGame() {
  const { placeBet, balance } = useGameStore();
  const [bet, setBet] = useState(100);
  const [multiplier, setMultiplier] = useState(1.0);
  const [status, setStatus] = useState<'idle'|'running'|'cashed'|'crashed'>('idle');
  const [graph, setGraph] = useState<number[]>([1.0]);
  const [showRules, setShowRules] = useState(false);
  const crashRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  const start = useCallback(() => {
    setStatus('running');
    setMultiplier(1.0);
    setGraph([1.0]);
    crashRef.current = Math.random() < 0.94 ? 1.0 + Math.random()*0.3 : 2 + Math.random()*3;
  }, []);

  useEffect(() => {
    if (status !== 'running') return;
    intervalRef.current = setInterval(() => {
      setMultiplier(prev => {
        const next = prev + 0.01;
        setGraph(g => [...g, next]);
        if (next >= crashRef.current) {
          clearInterval(intervalRef.current!);
          setStatus('crashed');
          placeBet('crash', bet);
          return next;
        }
        return next;
      });
    }, 100);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [status, bet]);

  const cashout = () => {
    if (status !== 'running') return;
    clearInterval(intervalRef.current!);
    setStatus('cashed');
    placeBet('crash', bet);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="glass-panel p-8 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-black gold-text">🚀 Crash</h2>
          <button onClick={() => setShowRules(true)} className="text-sm text-white/60 hover:text-white">How to Play</button>
        </div>
        <div className="h-48 bg-black/20 rounded-xl relative overflow-hidden mb-6">
          <div className="absolute top-4 left-4 text-4xl font-bold text-white">{multiplier.toFixed(2)}x</div>
          {/* Simple graph */}
          <svg className="w-full h-full">
            <polyline
              fill="none"
              stroke={status==='crashed'?'#ef4444':'#22c55e'}
              strokeWidth="2"
              points={graph.map((v,i)=>`${(i/graph.length)*100},${100-(v/Math.max(...graph,2))*100}`).join(' ')}
            />
          </svg>
        </div>
        <div className="space-y-4">
          <div className="flex gap-2 justify-center">
            {[10,50,100,500,1000].map(amt => (
              <button key={amt} onClick={()=>setBet(amt)} className={`px-4 py-2 rounded-xl ${bet===amt?'btn-gold':'bg-white/10 text-white'}`}>${amt}</button>
            ))}
          </div>
          {status==='idle' && <button onClick={start} className="btn-primary w-full py-4">Start</button>}
          {status==='running' && <button onClick={cashout} className="btn-primary w-full py-4 bg-red-500">Cash Out ${(bet*multiplier).toFixed(0)}</button>}
          {(status==='crashed'||status==='cashed') && <button onClick={start} className="btn-primary w-full py-4">Play Again</button>}
        </div>
      </div>
      <RuleModal isOpen={showRules} onClose={()=>setShowRules(false)} title="Crash Rules">
        <p>Watch the multiplier rise and cash out before it crashes! The earlier you cash out, the safer. The house usually crashes early.</p>
      </RuleModal>
    </div>
  );
}
