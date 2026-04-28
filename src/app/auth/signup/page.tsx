"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/game-store";
import Link from "next/link";
import { FiUser, FiLock } from "react-icons/fi";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const signup = useGameStore(s => s.signup);
  const router = useRouter();

  const handleSubmit = () => {
    if (username.length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }
    const result = signup(username, password);
    if (result.success) {
      router.push("/");
    } else {
      setError(result.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-800 to-orange-600">
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl">
        <h1 className="text-3xl font-heading font-bold text-white mb-2">Create Account</h1>
        <p className="text-gray-400 mb-6">Join EdgeCore today</p>
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <div className="space-y-4">
          <div className="relative">
            <FiUser className="absolute left-3 top-3.5 text-white/50" />
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-gold-400"
            />
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-3.5 text-white/50" />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-gold-400"
            />
          </div>
          <button onClick={handleSubmit} className="btn-primary w-full py-3 text-lg font-bold">
            Sign Up
          </button>
        </div>
        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-gold-400 font-bold">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
