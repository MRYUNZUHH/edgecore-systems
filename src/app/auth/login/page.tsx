'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/game-store';

export default function LoginPage() {
  const [u, setU] = useState(''); const [p, setP] = useState(''); const [err, setErr] = useState('');
  const login = useGameStore(s => s.login); const router = useRouter();

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-gold"><span className="text-2xl">◆</span></div>
          <h1 className="text-3xl font-heading font-bold gold-text">EDGECORE</h1>
        </div>
        <div className="glass-panel rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-2">Welcome back</h2>
          <p className="text-gray-400 mb-6">Login to your account</p>
          {err && <p className="text-lose text-sm mb-4">{err}</p>}
          <input value={u} onChange={e => setU(e.target.value)} placeholder="Username" className="w-full p-3 bg-navy-900 border border-white/10 rounded-lg text-white mb-3 focus:border-gold-400/50 focus:outline-none" />
          <input value={p} onChange={e => setP(e.target.value)} type="password" placeholder="Password" className="w-full p-3 bg-navy-900 border border-white/10 rounded-lg text-white mb-6 focus:border-gold-400/50 focus:outline-none" />
          <button onClick={() => { if (login(u,p)) router.push('/'); else setErr('Username must be at least 3 characters.'); }} className="btn-gold w-full py-3 text-lg">Login</button>
          <p className="text-center text-gray-400 mt-4 text-sm">New here? <a href="/auth/signup" className="text-gold-400">Sign up</a></p>
        </div>
      </div>
    </div>
  );
}
