"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Props {
  title: string;
  rtp?: number;
  children: React.ReactNode;
  history?: React.ReactNode;
}

export default function GameShell({ title, rtp, children, history }: Props) {
  const [balance, setBalance] = useState(10000);

  useEffect(() => {
    const update = () => {
      const mode = localStorage.getItem("ec_mode") || "demo";
      const key = mode === "real" ? "ec_real_balance" : "ec_balance";
      setBalance(parseFloat(localStorage.getItem(key) || (mode === "real" ? "0" : "10000")));
    };
    update();
    const interval = setInterval(update, 500);
    window.addEventListener("storage", update);
    return () => { clearInterval(interval); window.removeEventListener("storage", update); };
  }, []);

  return (
    <div className="pb-20 lg:pb-0">
      <div className="max-w-5xl mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <Link href="/casino" className="text-[#f0b429] hover:text-yellow-400 text-sm font-bold no-underline">← Back</Link>
          <div className="flex items-center gap-3">
            <span className="text-[#00ff88] font-bold">${balance.toFixed(2)}</span>
          </div>
        </div>
        <h1 className="text-2xl font-heading font-bold text-[#f0b429] mb-6">{title}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">{children}</div>
          {history && (
            <div className="bg-[#0f1520] border border-[#ffffff0f] rounded-xl p-4">
              <h3 className="text-sm font-bold text-gray-400 mb-3">History</h3>
              <div className="flex flex-wrap gap-1.5 max-h-60 overflow-y-auto">{history}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}