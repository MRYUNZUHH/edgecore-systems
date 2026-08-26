"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useBalance } from "@/lib/useBalance";
import Link from "next/link";

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { login } = useBalance();
  const router = useRouter();

  const handle = async () => {
    setErr("");

    if (!username.trim()) {
      setErr("Username is required.");
      return;
    }

    if (password.length < 8) {
      setErr("Password must be at least 8 characters.");
      return;
    }

    const result = await signIn("credentials", {
      redirect: false,
      username: username.trim(),
      password,
    });

    if (result?.error) {
      setErr("Invalid username or password.");
      return;
    }

    login(username.trim());
    router.push("/casino");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0f1520] border border-[#ffffff0f] rounded-2xl p-8">
        <h1 className="text-2xl font-heading font-bold text-white mb-6">Welcome Back</h1>
        {err && <p className="text-red-400 text-sm mb-4">{err}</p>}
        <div className="space-y-3">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg text-white px-4 py-3"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg text-white px-4 py-3"
          />
          <button onClick={handle} className="w-full py-3 bg-[#f0b429] text-black font-bold rounded-lg">Sign In</button>
        </div>
        <p className="text-center text-gray-400 text-sm mt-4">
          No account? <Link href="/auth/signup" className="text-[#f0b429]">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
