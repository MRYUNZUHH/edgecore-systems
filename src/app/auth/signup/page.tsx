"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function SignupPage() {
  const [u, setU] = useState(""); const [e, setE] = useState(""); const [p, setP] = useState("");
  const [err, setErr] = useState(""); const router = useRouter();
  const handle = () => {
    if (u.length < 3) { setErr("Username too short"); return; }
    if (!e.includes("@")) { setErr("Invalid email"); return; }
    localStorage.setItem("edgecore_user", JSON.stringify({ username: u, email: e, balance: 10000, loggedIn: true }));
    router.push("/");
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md card p-8">
        <h1 className="text-2xl font-bold text-white mb-6">Create Account</h1>
        {err && <p className="text-red-400 text-sm mb-4 bg-red-400/10 p-3 rounded-lg">{err}</p>}
        <div className="space-y-3">
          <input value={u} onChange={e=>setU(e.target.value)} placeholder="Username" className="input-field" />
          <input value={e} onChange={ev=>setE(ev.target.value)} placeholder="Email" className="input-field" />
          <input type="password" value={p} onChange={ev=>setP(ev.target.value)} placeholder="Password" className="input-field" />
          <button onClick={handle} className="btn-gold w-full py-3">Create Account</button>
        </div>
        <p className="text-center text-muted text-sm mt-4">Already have an account? <Link href="/auth/login" className="text-gold">Sign in</Link></p>
      </div>
    </div>
  );
}