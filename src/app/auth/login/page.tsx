"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (username.length < 2) { setError("Username too short"); return; }
    localStorage.setItem("edgecore-user", JSON.stringify({ username, balance: 10000, loggedIn: true }));
    router.push("/");
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-white mb-6">Welcome Back</h1>
        {error && <p className="text-red-400 text-sm mb-4 bg-red-400/10 p-3 rounded-lg">{error}</p>}
        <div className="space-y-3">
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username (any)" className="w-full bg-gray-800 border border-gray-700 rounded-lg text-white px-4 py-3" />
          <input type="password" placeholder="Password (any)" className="w-full bg-gray-800 border border-gray-700 rounded-lg text-white px-4 py-3" />
          <button onClick={handleLogin} className="w-full py-3 bg-yellow-500 text-black font-bold rounded-lg">Sign In</button>
        </div>
        <p className="text-center text-gray-500 text-sm mt-4">Demo: any username works</p>
        <p className="text-center text-gray-500 text-xs mt-2">No account? <a href="/auth/signup" className="text-yellow-500">Sign up</a></p>
      </div>
    </div>
  );
}