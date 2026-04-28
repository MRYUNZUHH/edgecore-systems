'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/game-store';
import { motion } from 'framer-motion';

export default function SignupPage() {
  const [u, setU] = useState(''); const [p, setP] = useState('');
  const [err, setErr] = useState('');
  const signup = useGameStore(s => s.signup);
  const router = useRouter();

  const handleSignup = () => {
    if (u.length < 3) { setErr('Username too short'); return; }
    const result = signup(u, p, u);
    if (result.success) router.push('/');
    else setErr(result.error || 'Signup failed');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <motion.div initial={{ scale:0.8, opacity:0 }} animate={{ scale:1, opacity:1 }} className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <motion.div animate={{ rotate: [0,10,-10,0] }} transition={{ repeat:Infinity, duration:3 }} className="text-6xl mb-4">🎰</motion.div>
          <h1 className="text-4xl font-black gold-text">EDGECORE</h1>
          <p className="text-white/70 mt-2">Join the winners</p>
        </div>
        {err && <p className="text-red-300 text-sm mb-4">{err}</p>}
        <input value={u} onChange={e => setU(e.target.value)} placeholder="Username" className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 mb-3" />
        <input value={p} onChange={e => setP(e.target.value)} type="password" placeholder="Password" className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 mb-6" />
        <button onClick={handleSignup} className="btn-primary w-full py-3 text-lg">Create Account</button>
        <p className="text-center text-white/70 mt-4 text-sm">Already a member? <a href="/auth/login" className="text-gold-400 font-bold">Login</a></p>
      </motion.div>
    </div>
  );
}
