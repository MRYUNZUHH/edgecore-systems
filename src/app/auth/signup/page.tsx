"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handle = async () => {
    if (username.length < 3) { setError("Username too short"); return; }
    if (!email.includes("@")) { setError("Invalid email"); return; }
    setLoading(true); setError("");
    await new Promise(r => setTimeout(r, 300));
    login(username.trim(), email.trim(), phone.trim());
    router.push("/");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md card p-8">
        <div className="text-center mb-6">
          <span className="text-4xl">🎰</span>
          <h1 className="text-3xl font-heading font-bold text-white mt-2">Create Account</h1>
          <p className="text-muted text-sm mt-1">Join EdgeCore today and get $10,000 demo credits</p>
        </div>
        {error && <p className="text-red-400 text-sm mb-4 bg-red-400/10 p-3 rounded-lg">{error}</p>}
        <div className="space-y-3">
          <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username (3+ chars)" className="input-field" />
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" className="input-field" />
          <input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone (optional)" className="input-field" />
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="input-field" />
          <button onClick={handle} disabled={loading} className="btn-gold w-full py-3 flex items-center justify-center gap-2">
            {loading ? <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" /> : null}
            {loading ? "Creating..." : "Create Account"}
          </button>
        </div>
        <p className="text-center text-muted text-sm mt-4">Already have an account? <Link href="/auth/login" className="text-gold">Sign in</Link></p>
      </div>
    </div>
  );
}