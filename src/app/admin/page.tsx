"use client";
import { useGameStore } from "@/store/game-store";
import { useRouter } from "next/navigation";
export default function AdminPage() {
  const { user } = useGameStore();
  const router = useRouter();
  if (!user || user.role !== "admin") { router.push("/"); return null; }
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold gold-text">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-4"><h3 className="text-white">Total Users</h3><p className="text-2xl">1,248</p></div>
        <div className="glass-card p-4"><h3 className="text-white">Total Bets</h3><p className="text-2xl">34,590</p></div>
        <div className="glass-card p-4"><h3 className="text-white">System RTP</h3><p className="text-2xl text-neon-400">94.2%</p></div>
        <div className="glass-card p-4"><h3 className="text-white">Active Sessions</h3><p className="text-2xl">87</p></div>
      </div>
    </div>
  );
}