"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useBalance } from "@/lib/useBalance";
import Link from "next/link";

export default function Page() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { login } = useBalance();
  const router = useRouter();

  const isEmailValid = (value: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);

  const handle = async () => {
    setErr("");

    if (username.trim().length < 3) {
      setErr("Username must be at least 3 characters.");
      return;
    }
    if (!isEmailValid(email.trim())) {
      setErr("A valid email address is required.");
      return;
    }
    if (password.length < 8) {
      setErr("Password must be at least 8 characters.");
      return;
    }

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username.trim(), email: email.trim(), password }),
    });

    const data = await response.json();
    if (!response.ok || data?.error) {
      setErr(data?.error || "Unable to create account.");
      return;
    }

    const result = await signIn("credentials", {
      redirect: false,
      username: username.trim(),
      password,
    });

    if (result?.error) {
      setErr("Account created, but automatic sign in failed. Please sign in manually.");
      return;
    }

    login(username.trim());
    router.push("/casino");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0f1520] border border-[#ffffff0f] rounded-2xl p-8">
        <h1 className="text-2xl font-heading font-bold text-white mb-6">Create Account</h1>
        <p className="text-sm text-[#00ff88] mb-4">🎁 10,000 demo credits on signup!</p>
        {err && <p className="text-red-400 text-sm mb-4">{err}</p>}
        <div className="space-y-3">
          <input
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
            placeholder="Username (3+ chars)"
            className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg text-white px-4 py-3"
          />
          <input
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            placeholder="Email"
            className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg text-white px-4 py-3"
          />
          <input
            type="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            placeholder="Password"
            className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg text-white px-4 py-3"
          />
          <button onClick={handle} className="w-full py-3 bg-[#f0b429] text-black font-bold rounded-lg">Create Account</button>
        </div>
        <p className="text-center text-gray-400 text-sm mt-4">Already have an account? <Link href="/auth/login" className="text-[#f0b429]">Sign in</Link></p>
      </div>
    </div>
  );
}
