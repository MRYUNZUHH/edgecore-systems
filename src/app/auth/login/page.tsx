"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/game-store";
import { motion } from "framer-motion";
import { FiUser, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import Link from "next/link";
import CountUp from "react-countup";

const floatingElements = ["🎰","🎲","💰","💎","♠️","♦️","🃏","🎯","🚀","👑"];

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [jackpot, setJackpot] = useState(34200);
  const login = useGameStore(s => s.login);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => setJackpot(prev => prev + Math.floor(Math.random() * 50)), 2000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    if (username.length < 3) { setError("Username must be at least 3 characters."); return; }
    setLoading(true);
    setError("");
    setTimeout(() => {
      const result = login(username, password);
      if (result.success) router.push("/");
      else setError(result.error || "Login failed");
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0a0a1a] via-[#1a0a3e] to-[#0a0a1a] relative overflow-hidden">
      {/* Animated background particles */}
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

      {/* Left panel — cinematic visuals */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-gold-400/5 backdrop-blur-sm" />
        <div className="relative z-10 text-center max-w-md">
          {/* Animated slot machine */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="mx-auto w-40 h-40 rounded-full bg-gradient-to-br from-gold-400 via-yellow-500 to-gold-600 flex items-center justify-center shadow-2xl shadow-gold-400/30 mb-8"
          >
            <span className="text-7xl">🎰</span>
          </motion.div>

          <h1 className="text-6xl font-black gold-text mb-4">EDGECORE</h1>
          <p className="text-xl text-white/70 leading-relaxed mb-8">
            The house always glitters, <br /> but the smart play inside.
          </p>

          {/* Live jackpot */}
          <div className="glass-panel inline-flex items-center gap-3 px-6 py-3">
            <span className="text-sm text-gray-400">Live Jackpot</span>
            <span className="text-2xl font-black text-gold-400">
              $<CountUp end={jackpot} duration={3} separator="," />
            </span>
          </div>

          {/* Trust badges */}
          <div className="flex justify-center gap-4 mt-8">
            <div className="text-xs text-gray-400 flex items-center gap-1">🔒 SSL Encrypted</div>
            <div className="text-xs text-gray-400 flex items-center gap-1">✅ Provably Fair</div>
            <div className="text-xs text-gray-400 flex items-center gap-1">🛡️ Secure</div>
          </div>
        </div>
      </div>

      {/* Right panel — login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Glass card */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
            {/* Glow effect on top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

            <h2 className="text-3xl font-heading font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400 mb-8">Sign in to continue your journey</p>

            {error && (
              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="text-rose-400 text-sm mb-4 bg-rose-400/10 p-3 rounded-xl border border-rose-400/20">
                {error}
              </motion.p>
            )}

            {/* Social logins */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm hover:bg-white/10 transition">
                <FcGoogle className="w-5 h-5" /> Google
              </button>
              <button className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm hover:bg-white/10 transition">
                <FaApple className="w-5 h-5" /> Apple
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-gray-500">OR</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Form inputs */}
            <div className="space-y-4">
              <div className="relative group">
                <FiUser className="absolute left-4 top-3.5 text-white/30 group-focus-within:text-gold-400 transition-colors" />
                <input
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Username"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-gold-400 focus:bg-white/[0.07] transition-all duration-300"
                />
              </div>

              <div className="relative group">
                <FiLock className="absolute left-4 top-3.5 text-white/30 group-focus-within:text-gold-400 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-gold-400 focus:bg-white/[0.07] transition-all duration-300"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                  <input type="checkbox" className="accent-gold-400" />
                  Remember me
                </label>
                <a href="#" className="text-gold-400 hover:underline">Forgot password?</a>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogin}
                disabled={loading}
                className="btn-primary w-full py-4 text-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-5 h-5 border-2 border-black border-t-transparent rounded-full" />
                    Signing in...
                  </span>
                ) : (
                  <>Sign In <FiArrowRight /></>
                )}
              </motion.button>
            </div>

            <p className="text-center text-gray-400 mt-6 text-sm">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-gold-400 font-bold hover:underline">Create one</Link>
            </p>

            {/* Demo hint */}
            <p className="text-center text-gray-600 text-xs mt-4">Demo: any username (3+ chars)</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}