'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/game-store';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiArrowRight } from 'react-icons/fi';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const signup = useGameStore(s => s.signup);
  const router = useRouter();

  const handleSignup = () => {
    if (username.length < 3) { setError('Username too short'); return; }
    const result = signup(username, password, username);
    if (result.success) router.push('/');
    else setError(result.error || 'Signup failed');
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] relative overflow-hidden">
      {/* Left decorative panel (same as login) */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-500/20 backdrop-blur-xl" />
        <div className="relative z-10 text-center max-w-md">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="mx-auto w-48 h-48 rounded-full bg-gradient-to-br from-gold-400 to-yellow-600 flex items-center justify-center shadow-2xl mb-8"
          >
            <span className="text-6xl">🎰</span>
          </motion.div>
          <h1 className="text-6xl font-black gold-text mb-4">EDGECORE</h1>
          <p className="text-xl text-white/80 leading-relaxed">
            Join the elite. <br />Every spin a chance to win.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl relative"
        >
          <div className="absolute -top-3 -right-3 w-12 h-12 bg-gold-400 rounded-full flex items-center justify-center text-black font-bold shadow-gold">NEW</div>

          <h2 className="text-3xl font-heading font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-400 mb-8">Start your winning streak today</p>

          {error && <p className="text-red-400 text-sm mb-4 bg-red-400/10 p-2 rounded-lg">{error}</p>}

          <div className="space-y-4">
            <div className="relative">
              <FiUser className="absolute left-3 top-3.5 text-white/50" />
              <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-gold-400 transition"
              />
            </div>
            <div className="relative">
              <FiLock className="absolute left-3 top-3.5 text-white/50" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-gold-400 transition"
              />
            </div>
            <button onClick={handleSignup} className="btn-primary w-full py-3 flex items-center justify-center gap-2">
              Create Account <FiArrowRight />
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <a href="/auth/login" className="text-gold-400 font-bold hover:underline">Sign in</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
