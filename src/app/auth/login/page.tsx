"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/game-store";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, demoLogin, isLoggedIn } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) router.push("/");
  }, [isLoggedIn, router]);

  const handleLogin = () => {
    if (username.length < 2) { setError("Username too short"); return; }
    const result = login(username, password);
    if (!result.success) setError(result.error || "Login failed");
  };

  const handleDemo = () => { demoLogin(); };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080b12] p-4">
      <div className="w-full max-w-md card p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#f5c842] rounded-xl flex items-center justify-center text-black font-bold text-lg">◆</div>
          <h1 className="text-2xl font-heading font-bold text-white">Welcome Back</h1>
        </div>
        {error && <p className="text-[#ef4444] text-sm mb-4 bg-[#ef4444]/10 p-3 rounded-lg">{error}</p>}
        <div className="space-y-3">
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="input" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="input" />
          <button onClick={handleLogin} className="btn-primary w-full">Sign In</button>
        </div>
        <button onClick={handleDemo} className="w-full mt-3 py-3 bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] font-bold rounded-lg text-sm">🎰 Demo Login (Instant $10,000 Play)</button>
        <p className="text-center text-[#5a6a85] text-sm mt-4">
          No account? <Link href="/auth/signup" className="text-[#f5c842]">Create one</Link>
        </p>
      </div>
    </div>
  );
}