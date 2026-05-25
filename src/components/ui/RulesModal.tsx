"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RulesModalProps {
  gameKey: string;
  title: string;
  emoji: string;
  rules: string[];
  accentColor?: string;
}

export default function RulesModal({ gameKey, title, emoji, rules, accentColor = "#f0b429" }: RulesModalProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("rules_seen_" + gameKey);
    if (!seen) setShow(true);
  }, [gameKey]);

  const dismiss = () => {
    localStorage.setItem("rules_seen_" + gameKey, "true");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={dismiss}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-lg bg-[#0f1520] border rounded-2xl p-6 shadow-2xl"
            style={{ borderColor: accentColor, boxShadow: "0 0 40px " + accentColor + "20" }}
          >
            <div className="text-center mb-6">
              <span className="text-5xl">{emoji}</span>
              <h2 className="text-2xl font-heading font-bold text-white mt-3">{title} — How to Play</h2>
            </div>
            <ol className="space-y-3 mb-6">
              {rules.map((rule, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-300">
                  <span className="text-[#f0b429] font-bold shrink-0">{i + 1}.</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ol>
            <button
              onClick={dismiss}
              className="w-full py-3 rounded-lg font-bold text-black transition hover:brightness-110"
              style={{ background: accentColor }}
            >
              I Understand – Let&apos;s Play!
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}