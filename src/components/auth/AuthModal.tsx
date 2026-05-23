"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/game-store";
import { FiUser, FiLock, FiX } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, demoLogin } = useStore();

  const handleSubmit = () => {
    if (username.length < 3) { setError("Username too short"); return; }
    const result = login(username, password);
    if (result.success) onClose();
    else setError(result.error || "Failed");
  };

  const handleDemo = () => { demoLogin(); onClose(); };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={onClose}>
          <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
            className="w-full max-w-md bg-[#0D0F1A] border border-[#E6B84F]/20 rounded-2xl p-6 shadow-2xl"
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">{mode === "login" ? "Sign In" : "Create Account"}</h2>
              <button onClick={onClose} className="text-white/40 hover:text-white"><FiX className="w-5 h-5" /></button>
            </div>
            
            {error && <p className="text-red-400 text-sm mb-4 bg-red-400/10 p-2 rounded-lg">{error}</p>}
            
            {/* Demo Login */}
            <button onClick={handleDemo}
              className="w-full py-3 mb-4 bg-gradient-to-r from-[#E6B84F] to-yellow-500 text-black font-bold rounded-xl hover:shadow-lg transition">
              🎰 Demo Login (Instant $10,000 Play)
            </button>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-white/40">OR</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            
            {/* Google OAuth */}
            <button className="w-full py-3 mb-4 bg-white/5 border border-white/10 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition">
              <FcGoogle className="w-5 h-5" /> Continue with Google
            </button>
            
            {/* Email/Password */}
            <div className="space-y-3">
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-white/30" />
                <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#E6B84F]" />
              </div>
              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-white/30" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#E6B84F]" />
              </div>
              <button onClick={handleSubmit}
                className="w-full py-3 bg-[#E6B84F] text-black font-bold rounded-xl hover:bg-yellow-500 transition">
                {mode === "login" ? "Sign In" : "Create Account"}
              </button>
            </div>
            
            <p className="text-center text-white/40 text-sm mt-4">
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => setMode(mode === "login" ? "register" : "login")} className="text-[#E6B84F] font-bold">
                {mode === "login" ? "Register" : "Sign In"}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}