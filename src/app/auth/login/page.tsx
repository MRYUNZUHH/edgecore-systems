"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function LoginPage() {
  const [u, setU] = useState(""); const [p, setP] = useState("");
  const [err, setErr] = useState(""); const [loading, setLoading] = useState(false);
  const { login } = useAuth(); const router = useRouter();

  const handle = async () => {
    if (!u.trim()) { setErr("Username required"); return; }
    setLoading(true); setErr("");
    await new Promise(r => setTimeout(r, 300));
    login(u.trim());
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{background:'radial-gradient(ellipse at 30% 20%, rgba(245,200,66,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(77,159,255,0.06) 0%, transparent 50%), var(--bg)'}}>
      <div className="w-full max-w-md card p-8">
        <div className="text-center mb-6"><span className="text-4xl">🎰</span><h1 className="text-3xl font-heading font-bold text-white mt-2">Welcome Back</h1><p className="text-muted text-sm mt-1">Sign in to your EdgeCore account</p></div>
        {err && <p className="text-red-400 text-sm mb-4 bg-red-400/10 p-3 rounded-lg">{err}</p>}
        <div className="space-y-3">
          <input value={u} onChange={e=>setU(e.target.value)} placeholder="Username (any)" className="input-field" />
          <input type="password" value={p} onChange={e=>setP(e.target.value)} placeholder="Password (any)" className="input-field" />
          <button onClick={handle} disabled={loading} className="btn-gold w-full py-3 flex items-center justify-center gap-2">
            {loading ? <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" /> : null}
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>
        <p className="text-center text-muted text-sm mt-4">No account? <Link href="/auth/signup" className="text-gold">Create one</Link></p>
        <p className="text-center text-muted text-xs mt-2">Demo: any username works</p>
      </div>
    </div>
  );
}