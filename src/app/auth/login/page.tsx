"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (username.length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }
    setLoading(true);
    setError("");
    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError("Invalid credentials. Try admin / admin.");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-orange-600 flex items-center justify-center p-6">
      <div className="w-full max-w-md glass-panel p-8 rounded-3xl border border-white/20 shadow-2xl">
        <h1 className="text-3xl font-heading font-bold text-white mb-2">Welcome back 👋</h1>
        <p className="text-white/70 mb-6">Sign in to your EdgeCore account</p>
        {error && <p className="text-red-400 text-sm mb-4 bg-red-400/10 p-2 rounded-lg">{error}</p>}
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="w-full p-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 mb-3 focus:outline-none focus:border-gold-400 transition" />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 mb-6 focus:outline-none focus:border-gold-400 transition" />
        <button onClick={handleLogin} disabled={loading} className="btn-primary w-full py-3 text-lg font-bold">
          {loading ? "Signing in…" : "Sign In"}
        </button>
        <p className="text-center text-white/50 mt-4 text-sm">Demo credentials: admin / admin</p>
      </div>
    </div>
  );
}