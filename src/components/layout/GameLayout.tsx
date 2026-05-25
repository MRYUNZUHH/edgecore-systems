"use client";
import Link from "next/link";
import { useBalance } from "@/hooks/useBalance";

interface GameLayoutProps {
  title: string;
  rtp?: number;
  children: React.ReactNode;
}

export default function GameLayout({ title, rtp, children }: GameLayoutProps) {
  const { balance } = useBalance();

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/casino" className="text-[#f0b429] hover:text-yellow-400 text-sm font-bold flex items-center gap-1 no-underline">
            ← Back to Lobby
          </Link>
          <div className="flex items-center gap-3">
            {rtp && <span className="text-xs text-gray-500 bg-[#12121a] px-2 py-1 rounded">RTP {rtp}%</span>}
            <span className="text-[#00ff88] font-bold">${balance.toFixed(2)}</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-[#f0b429] mb-6">{title}</h1>
        {children}
      </div>
    </div>
  );
}