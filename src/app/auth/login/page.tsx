"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function LoginPage() {
  const [u, setU] = useState(""); const [p, setP] = useState("");
  const [err, setErr] = useState(""); const router = useRouter();
  const handle = () => {
    if (u.length < 2) { setErr("Username too short"); return; }
    localStorage.setItem("edgecore_user", JSON.stringify({ username: u, balance: 10000, loggedIn: true }));
    router.push("/");
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md card p-8">
        <h1 className="text-2xl font-bold text-white mb-6">Welcome Back</h1>
        {err && <p className="text-red-400 text-sm mb-4 bg-red-400/10 p-3 rounded-lg">{err}</p>}
        <div className="space-y-3">
          <input value={u} onChange={e=>setU(e.target.value)} placeholder="Username (any)" className="input-field" />
          <input type="password" value={p} onChange={e=>setP(e.target.value)} placeholder="Password (any)" className="input-field" />
          <button onClick={handle} className="btn-gold w-full py-3">Sign In</button>
        </div>
        <p className="text-center text-muted text-sm mt-4">No account? <Link href="/auth/signup" className="text-gold">Sign up</Link></p>
        <p className="text-center text-muted text-xs mt-2">Demo: any username works</p>
      </div>
    </div>
  );
}