"use client";
export default function AdminPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      <h1 className="text-3xl font-heading font-bold text-[#f5c842]">🔧 Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-5">
          <p className="text-sm text-[#5a6a85]">Total Users</p>
          <p className="text-2xl font-bold text-white">1,248</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-[#5a6a85]">Active Sessions</p>
          <p className="text-2xl font-bold text-white">87</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-[#5a6a85]">Total Bets</p>
          <p className="text-2xl font-bold text-white">34,590</p>
        </div>
      </div>
    </div>
  );
}
