"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/game-store";
import { motion } from "framer-motion";
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useStore(s => s.login);
  const router = useRouter();

  const handleLogin = () => {
    if (username.length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }
    setLoading(true);
    setError("");
    
    // Call login directly — it's synchronous in Zustand
    const result = login(username, password);
    
    if (result.success) {
      router.push("/");
    } else {
      setError(result.error || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0D0F1A] via-[#131626] to-[#0D0F1A] p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#131626] border border-[#1E2235] rounded-2xl p-8 shadow-2xl">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#E6B84F] to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-black text-black">◆</div>
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-white/40 mt-2">Sign in to continue your journey</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-4 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Social login buttons */}
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
          <span className="text-xs text-white/30">OR</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="relative">
            <FiUser className="absolute left-4 top-3.5 text-white/30" />
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#E6B84F] transition"
            />
          </div>
          <div className="relative">
            <FiLock className="absolute left-4 top-3.5 text-white/30" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#E6B84F] transition"
            />
            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-white/30 hover:text-white/60">
              {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
            </button>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3.5 bg-[#E6B84F] text-black font-bold rounded-xl hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>

        {/* Demo login shortcut */}
        <button
          onClick={() => {
            useStore.getState().login("Demo Player");
            router.push("/");
          }}
          className="w-full mt-3 py-3 bg-green-500/10 border border-green-500/20 text-green-400 font-bold rounded-xl hover:bg-green-500/20 transition text-sm"
        >
          🎰 Demo Login (Instant $10,000 Play)
        </button>

        <p className="text-center text-white/40 text-sm mt-6">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-[#E6B84F] font-bold hover:underline">Create one</Link>
        </p>
      </motion.div>
    </div>
  );
}