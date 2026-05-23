"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/game-store";
import { motion } from "framer-motion";
import { FiUser, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import Link from "next/link";

const floatingElements = ["🎰","🎲","💰","💎","♠️","♦️"];

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const signup = useStore(s => s.signup);
  const router = useRouter();

  const handleSignup = () => {
    if (username.length < 3) { setError("Username must be at least 3 characters."); return; }
    setLoading(true);
    setError("");
    setTimeout(() => {
      const result = signup(username, password);
      if (result.success) router.push("/");
      else setError(result.error || "Signup failed");
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0a0a1a] via-[#1a0a3e] to-[#0a0a1a] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((el, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl opacity-10"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -40, 0], rotate: [0, 15, -15, 0], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 6 + Math.random() * 6, repeat: Infinity, delay: Math.random() * 4 }}
          >
            {el}
          </motion.div>
        ))}
      </div>

      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-gold-400/5 backdrop-blur-sm" />
        <div className="relative z-10 text-center max-w-md">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="mx-auto w-40 h-40 rounded-full bg-gradient-to-br from-gold-400 via-yellow-500 to-gold-600 flex items-center justify-center shadow-2xl shadow-gold-400/30 mb-8"
          >
            <span className="text-7xl">🎰</span>
          </motion.div>
          <h1 className="text-6xl font-black gold-text mb-4">EDGECORE</h1>
          <p className="text-xl text-white/70 leading-relaxed">Join the elite. Start winning today.</p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md">
          <div className="glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
            <h2 className="text-3xl font-heading font-bold text-white mb-2">Create Account</h2>
            <p className="text-gray-400 mb-8">Start your winning streak today</p>
            {error && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-rose-400 text-sm mb-4 bg-rose-400/10 p-3 rounded-xl border border-rose-400/20">{error}</motion.p>}

            <div className="grid grid-cols-2 gap-3 mb-6">
              <button className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm hover:bg-white/10 transition"><FcGoogle className="w-5 h-5" /> Google</button>
              <button className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm hover:bg-white/10 transition"><FaApple className="w-5 h-5" /> Apple</button>
            </div>

            <div className="flex items-center gap-4 mb-6"><div className="flex-1 h-px bg-white/10" /><span className="text-xs text-gray-500">OR</span><div className="flex-1 h-px bg-white/10" /></div>

            <div className="space-y-4">
              <div className="relative group">
                <FiUser className="absolute left-4 top-3.5 text-white/30 group-focus-within:text-gold-400 transition-colors" />
                <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-gold-400 focus:bg-white/[0.07] transition-all duration-300" />
              </div>
              <div className="relative group">
                <FiLock className="absolute left-4 top-3.5 text-white/30 group-focus-within:text-gold-400 transition-colors" />
                <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-gold-400 focus:bg-white/[0.07] transition-all duration-300" />
                <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-white/30 hover:text-white/60 transition-colors">{showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}</button>
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSignup} disabled={loading} className="btn-primary w-full py-4 text-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50">
                {loading ? <span className="flex items-center gap-2"><motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-5 h-5 border-2 border-black border-t-transparent rounded-full" />Creating...</span> : <>Create Account <FiArrowRight /></>}
              </motion.button>
            </div>
            <p className="text-center text-gray-400 mt-6 text-sm">Already a member? <Link href="/auth/login" className="text-gold-400 font-bold hover:underline">Sign in</Link></p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}