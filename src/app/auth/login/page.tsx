"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (username.length < 2) { setError("Username too short"); return; }
    // Store login in localStorage for demo
    localStorage.setItem("edgecore-user", JSON.stringify({ username, balance: 10000 }));
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0f1520] border border-[#ffffff0f] rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#f5c842] rounded-xl flex items-center justify-center text-black font-bold text-lg">◆</div>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
        </div>
        {error && <p className="text-[#ef4444] text-sm mb-4 bg-[#ef4444]/10 p-3 rounded-lg">{error}</p>}
        <div className="space-y-3">
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="w-full bg-[#1a2235] border border-[#ffffff0f] rounded-lg text-white px-4 py-3" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full bg-[#1a2235] border border-[#ffffff0f] rounded-lg text-white px-4 py-3" />
          <button onClick={handleLogin} className="w-full py-3 bg-[#f5c842] text-black font-bold rounded-lg">Sign In</button>
        </div>
        <p className="text-center text-[#5a6a85] text-sm mt-4">
          No account? <Link href="/auth/signup" className="text-[#f5c842]">Create one</Link>
        </p>
        <p className="text-center text-[#5a6a85] text-xs mt-2">Demo: enter any username</p>
      </div>
    </div>
  );
}