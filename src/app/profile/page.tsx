"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import MobileNav from "@/components/layout/MobileNav";

export default function ProfilePage() {
  const { user, isLoggedIn, updateAvatar, updateProfile, logout, DEFAULT_AVATARS } = useAuth();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ username: user?.username || "", email: user?.email || "", phone: user?.phone || "" });

  if (!isLoggedIn) { router.push("/auth/login"); return null; }

  const handleSave = () => {
    updateProfile(form);
    setEditing(false);
  };

  return (
    <div className="pb-20 lg:pb-0">
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <h1 className="text-3xl font-heading font-bold text-gold">👤 My Profile</h1>

        {/* Avatar Section */}
        <div className="card p-6 text-center">
          <div className="text-6xl mb-4">{user?.avatar}</div>
          <h2 className="text-xl font-heading font-bold text-white">{user?.username}</h2>
          <p className="text-muted text-sm mt-1">{user?.email || "No email set"} · {user?.phone || "No phone set"}</p>
          
          <div className="mt-4">
            <p className="text-xs text-muted mb-2">Choose your avatar</p>
            <div className="flex flex-wrap justify-center gap-2">
              {DEFAULT_AVATARS.map(a => (
                <button key={a} onClick={() => updateAvatar(a)}
                  className={`text-3xl p-2 rounded-xl transition ${user?.avatar === a ? "bg-gold/20 ring-2 ring-gold" : "hover:bg-white/10"}`}>
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="card p-6 space-y-4">
          <h3 className="text-lg font-heading font-bold text-white">Account Details</h3>
          {editing ? (
            <>
              <div>
                <label className="text-xs text-muted">Username</label>
                <input value={form.username} onChange={e => setForm({...form, username: e.target.value})} className="input-field mt-1" />
              </div>
              <div>
                <label className="text-xs text-muted">Email</label>
                <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="input-field mt-1" />
              </div>
              <div>
                <label className="text-xs text-muted">Phone</label>
                <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="input-field mt-1" />
              </div>
              <div className="flex gap-3">
                <button onClick={handleSave} className="btn-gold flex-1 py-2">Save Changes</button>
                <button onClick={() => setEditing(false)} className="flex-1 py-2 border border-[var(--border)] text-muted rounded-lg">Cancel</button>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between py-2 border-b border-[var(--border)]"><span className="text-muted text-sm">Username</span><span className="text-white text-sm">{user?.username}</span></div>
              <div className="flex justify-between py-2 border-b border-[var(--border)]"><span className="text-muted text-sm">Email</span><span className="text-white text-sm">{user?.email || "—"}</span></div>
              <div className="flex justify-between py-2 border-b border-[var(--border)]"><span className="text-muted text-sm">Phone</span><span className="text-white text-sm">{user?.phone || "—"}</span></div>
              <button onClick={() => setEditing(true)} className="btn-gold w-full py-2 mt-2">Edit Profile</button>
            </>
          )}
        </div>

        {/* Account Stats */}
        <div className="card p-6 space-y-3">
          <h3 className="text-lg font-heading font-bold text-white">Account</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[var(--bg3)] rounded-xl p-4 text-center">
              <p className="text-xs text-muted">Demo Balance</p>
              <p className="text-xl font-heading font-bold text-blue-400">${user?.balance?.toLocaleString() || 0}</p>
            </div>
            <div className="bg-[var(--bg3)] rounded-xl p-4 text-center">
              <p className="text-xs text-muted">Real Balance</p>
              <p className="text-xl font-heading font-bold text-gold">${user?.realBalance?.toLocaleString() || 0}</p>
            </div>
          </div>
          <button onClick={logout} className="w-full py-2 border border-red-500/30 text-red-400 rounded-lg font-bold text-sm hover:bg-red-500/10 transition">Logout</button>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}