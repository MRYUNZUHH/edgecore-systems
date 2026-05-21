"use client";
import { useGameStore } from "@/store/game-store";
import { useRouter } from "next/navigation";
export default function AdminPage() {
  const { user } = useGameStore();
  const router = useRouter();
  if (!user || user.role !== "admin") { router.push("/"); return null; }
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-heading font-bold gold-text">🔧 Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-5"><h3 className="text-sm text-gray-400">Total Users</h3><p className="text-2xl font-bold">1,248</p></div>
        <div className="glass-card p-5"><h3 className="text-sm text-gray-400">Active Sessions</h3><p className="text-2xl font-bold">87</p></div>
        <div className="glass-card p-5"><h3 className="text-sm text-gray-400">System RTP</h3><p className="text-2xl font-bold text-neon-400">94.2%</p></div>
        <div className="glass-card p-5"><h3 className="text-sm text-gray-400">Total Bets</h3><p className="text-2xl font-bold">34,590</p></div>
        <div className="glass-card p-5"><h3 className="text-sm text-gray-400">Net Profit</h3><p className="text-2xl font-bold text-neon-400">+$128,450</p></div>
        <div className="glass-card p-5"><h3 className="text-sm text-gray-400">Risk Alerts</h3><p className="text-2xl font-bold text-rose-500">3</p></div>
      </div>
    </div>
  );
}