"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/game-store";
import Link from "next/link";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLoggedIn } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) router.push("/");
  }, [isLoggedIn, router]);

  const handleSignup = () => {
    if (username.length < 3) { setError("Username too short"); return; }
    const result = login(username, password);
    if (!result.success) setError(result.error || "Signup failed");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0f1520] border border-[#ffffff0f] rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#f5c842] rounded-xl flex items-center justify-center text-black font-bold text-lg">◆</div>
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
        </div>
        {error && <p className="text-[#ef4444] text-sm mb-4 bg-[#ef4444]/10 p-3 rounded-lg">{error}</p>}
        <div className="space-y-3">
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="w-full bg-[#1a2235] border border-[#ffffff0f] rounded-lg text-white px-4 py-3" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full bg-[#1a2235] border border-[#ffffff0f] rounded-lg text-white px-4 py-3" />
          <button onClick={handleSignup} className="w-full py-3 bg-[#f5c842] text-black font-bold rounded-lg">Create Account</button>
        </div>
        <p className="text-center text-[#5a6a85] text-sm mt-4">
          Already have an account? <Link href="/auth/login" className="text-[#f5c842]">Sign in</Link>
        </p>
      </div>
    </div>
  );
}