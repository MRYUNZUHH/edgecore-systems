"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = () => {
    if (username.length < 3) { setError("Username too short"); return; }
    if (!email.includes("@")) { setError("Invalid email"); return; }
    localStorage.setItem("edgecore-user", JSON.stringify({ username, email, balance: 10000, loggedIn: true }));
    router.push("/");
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-white mb-6">Create Account</h1>
        {error && <p className="text-red-400 text-sm mb-4 bg-red-400/10 p-3 rounded-lg">{error}</p>}
        <div className="space-y-3">
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username (3+ chars)" className="w-full bg-gray-800 border border-gray-700 rounded-lg text-white px-4 py-3" />
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" className="w-full bg-gray-800 border border-gray-700 rounded-lg text-white px-4 py-3" />
          <input type="password" placeholder="Password" className="w-full bg-gray-800 border border-gray-700 rounded-lg text-white px-4 py-3" />
          <button onClick={handleSignup} className="w-full py-3 bg-yellow-500 text-black font-bold rounded-lg">Create Account</button>
        </div>
        <p className="text-center text-gray-500 text-sm mt-4">Already have an account? <a href="/auth/login" className="text-yellow-500">Sign in</a></p>
      </div>
    </div>
  );
}