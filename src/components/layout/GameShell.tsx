"use client";
import Link from "next/link";
import { useBalance } from "@/lib/useBalance";

interface GameShellProps { title: string; rtp: number; children: React.ReactNode; history?: React.ReactNode; }
export default function GameShell({ title, rtp, children, history }: GameShellProps) {
  const { balance, isLoggedIn } = useBalance();
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-5xl mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <Link href="/casino" className="text-[#f0b429] hover:text-yellow-400 text-sm font-bold no-underline">← Back</Link>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 bg-[#13131f] px-2 py-1 rounded">RTP {rtp}%</span>
            <span className="text-[#00ff88] font-bold">${balance.toFixed(2)}</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-[#f0b429] mb-6">{title}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">{children}</div>
          {history && <div className="bg-[#13131f] rounded-xl p-4"><h3 className="text-sm font-bold text-gray-400 mb-3">History</h3><div className="space-y-1">{history}</div></div>}
        </div>
      </div>
    </div>
  );
}