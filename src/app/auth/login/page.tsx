"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiUser, FiLock, FiArrowRight } from "react-icons/fi";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (username.length < 2) { setError("Username too short"); return; }
    setLoading(true);
    setError("");
    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError("Invalid credentials. Use admin / admin");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] relative overflow-hidden">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-500/20 backdrop-blur-xl" />
        <div className="relative z-10 text-center max-w-md">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="mx-auto w-48 h-48 rounded-full bg-gradient-to-br from-gold-400 to-yellow-600 flex items-center justify-center shadow-2xl mb-8"
          >
            <span className="text-6xl">🎰</span>
          </motion.div>
          <h1 className="text-6xl font-black gold-text mb-4">EDGECORE</h1>
          <p className="text-xl text-white/80 leading-relaxed">
            The house always glitters, <br />but the smart play inside.
          </p>
          <div className="mt-10 flex gap-4 justify-center">
            {["♠️","♥️","♦️","♣️"].map(suit => (
              <motion.span
                key={suit}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: Math.random() }}
                className="text-4xl opacity-40"
              >{suit}</motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl relative"
        >
          <div className="absolute -top-3 -right-3 w-12 h-12 bg-gold-400 rounded-full flex items-center justify-center text-black font-bold shadow-gold">VIP</div>

          <h2 className="text-3xl font-heading font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400 mb-8">Sign in to continue your journey</p>

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
            <button onClick={handleLogin} disabled={loading} className="btn-primary w-full py-3 flex items-center justify-center gap-2">
              Sign In <FiArrowRight />
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-400">
            Don’t have an account?{' '}
            <a href="/auth/signup" className="text-gold-400 font-bold hover:underline">Create one</a>
          </div>

          {/* Demo credentials hint */}
          <p className="text-center text-gray-500 text-xs mt-6">Demo: admin / admin</p>
        </motion.div>
      </div>
    </div>
  );
}