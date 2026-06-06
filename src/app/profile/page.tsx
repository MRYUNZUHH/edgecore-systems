"use client";

import { useState, useEffect } from "react";
import MobileNav from "@/components/layout/MobileNav";

type GameHistoryEntry = {
  game: string;
  amount: number;
  result: "win" | "loss";
  multiplier: number;
  timestamp: string;
};

type Badge = {
  id: string;
  name: string;
  requirement: number;
  unlocked: boolean;
};

type NotifPrefs = {
  emailPromos: boolean;
  winAlerts: boolean;
  depositReminders: boolean;
};

export default function ProfilePage() {
  const [username, setUsername] = useState("");
  const [balance, setBalance] = useState(0);
  const [realBalance, setRealBalance] = useState(0);
  const [totalWagered, setTotalWagered] = useState(0);
  const [avatar, setAvatar] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "avatar" | "settings">("overview");
  const [achievementTab, setAchievementTab] = useState(false);
  const [gameHistory, setGameHistory] = useState<GameHistoryEntry[]>([]);

  const badgesList: Badge[] = [
    { id: "first_bet", name: "First Bet", requirement: 1, unlocked: false },
    { id: "high_roller", name: "High Roller", requirement: 1000, unlocked: false },
    { id: "whale", name: "Whale", requirement: 10000, unlocked: false },
    { id: "legend", name: "Legend", requirement: 50000, unlocked: false },
  ];
  const [badges, setBadges] = useState<Badge[]>(badgesList);
  const [referralCode, setReferralCode] = useState("");
  const [notifPrefs, setNotifPrefs] = useState<NotifPrefs>({
    emailPromos: false,
    winAlerts: false,
    depositReminders: false,
  });

  useEffect(() => {
    const storedUsername = localStorage.getItem("ec_username") || "Player";
    const storedBalance = parseFloat(localStorage.getItem("ec_balance") || "0");
    const storedRealBalance = parseFloat(localStorage.getItem("ec_real_balance") || "0");
    const storedWagered = parseFloat(localStorage.getItem("ec_wager_total") || "0");
    const storedAvatar = localStorage.getItem("ec_avatar") || "";
    setUsername(storedUsername);
    setBalance(storedBalance);
    setRealBalance(storedRealBalance);
    setTotalWagered(storedWagered);
    setAvatar(storedAvatar);

    const historyRaw = localStorage.getItem("ec_game_history");
    if (historyRaw) {
      try {
        const history = JSON.parse(historyRaw);
        setGameHistory(history.slice(0, 10));
      } catch (e) {}
    }

    const storedBadges = localStorage.getItem("ec_badges");
    if (storedBadges) {
      try {
        const saved = JSON.parse(storedBadges);
        setBadges((prev) =>
          prev.map((b) => ({ ...b, unlocked: saved.includes(b.id) }))
        );
      } catch (e) {}
    } else {
      updateBadges(storedWagered);
    }

    setReferralCode(`EDGE_${storedUsername.toUpperCase().replace(/\s/g, "")}`);

    const prefsRaw = localStorage.getItem("ec_notif_prefs");
    if (prefsRaw) {
      try {
        setNotifPrefs(JSON.parse(prefsRaw));
      } catch (e) {}
    }
  }, []);

  const updateBadges = (wagered: number) => {
    const updated = badges.map((badge) => {
      let unlocked = false;
      if (badge.id === "first_bet" && wagered > 0) unlocked = true;
      if (badge.id === "high_roller" && wagered >= 1000) unlocked = true;
      if (badge.id === "whale" && wagered >= 10000) unlocked = true;
      if (badge.id === "legend" && wagered >= 50000) unlocked = true;
      return { ...badge, unlocked };
    });
    setBadges(updated);
    const unlockedIds = updated.filter((b) => b.unlocked).map((b) => b.id);
    localStorage.setItem("ec_badges", JSON.stringify(unlockedIds));
  };

  const toggleNotif = (key: keyof NotifPrefs) => {
    const newPrefs = { ...notifPrefs, [key]: !notifPrefs[key] };
    setNotifPrefs(newPrefs);
    localStorage.setItem("ec_notif_prefs", JSON.stringify(newPrefs));
  };

  const copyReferral = () => {
    navigator.clipboard.writeText(referralCode);
    alert("Referral code copied!");
  };

  const resultColor = (result: string) =>
    result === "win" ? "text-green-400" : "text-red-400";

  return (
    <>
      <div className="min-h-screen bg-[#080b12] text-white font-rajdhani pb-20">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#f0b429] to-amber-600 flex items-center justify-center text-2xl font-bold">
              {avatar ? (
                <img src={avatar} alt="avatar" className="w-full h-full rounded-full object-cover" />
              ) : (
                username.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{username}</h1>
              <div className="flex gap-4 mt-1">
                <span>💰 Demo: ${balance.toFixed(2)}</span>
                <span>💎 Real: ${realBalance.toFixed(2)}</span>
                <span>🎲 Wagered: ${totalWagered.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#1a2235] mb-6">
            <button
              onClick={() => { setActiveTab("overview"); setAchievementTab(false); }}
              className={`px-6 py-2 font-semibold transition ${
                activeTab === "overview" && !achievementTab
                  ? "border-b-2 border-[#f0b429] text-[#f0b429]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => { setActiveTab("overview"); setAchievementTab(true); }}
              className={`px-6 py-2 font-semibold transition ${
                achievementTab && activeTab === "overview"
                  ? "border-b-2 border-[#f0b429] text-[#f0b429]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Achievements
            </button>
            <button
              onClick={() => setActiveTab("avatar")}
              className={`px-6 py-2 font-semibold transition ${
                activeTab === "avatar"
                  ? "border-b-2 border-[#f0b429] text-[#f0b429]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Avatar
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-6 py-2 font-semibold transition ${
                activeTab === "settings"
                  ? "border-b-2 border-[#f0b429] text-[#f0b429]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Settings
            </button>
          </div>

          {/* Game History Tab */}
          {activeTab === "overview" && !achievementTab && (
            <div className="bg-[#0f1520] rounded-xl border border-[#1a2235] p-5">
              <h2 className="text-xl font-bold text-[#f0b429] mb-4">Game History</h2>
              {gameHistory.length === 0 ? (
                <p className="text-gray-400 text-center py-4">No bets placed yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-gray-400 border-b border-[#1a2235]">
                      <tr>
                        <th className="text-left py-2">Game</th>
                        <th className="text-left py-2">Amount</th>
                        <th className="text-left py-2">Result</th>
                        <th className="text-left py-2">Multiplier</th>
                        <th className="text-left py-2">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gameHistory.map((bet, idx) => (
                        <tr key={idx} className="border-b border-[#1a2235] last:border-0">
                          <td className="py-2 capitalize">{bet.game}</td>
                          <td className="py-2">${bet.amount.toFixed(2)}</td>
                          <td className={`py-2 font-semibold ${resultColor(bet.result)}`}>
                            {bet.result.toUpperCase()}
                          </td>
                          <td className="py-2">{bet.multiplier.toFixed(2)}x</td>
                          <td className="py-2 text-gray-400">
                            {new Date(bet.timestamp).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === "overview" && achievementTab && (
            <div className="bg-[#0f1520] rounded-xl border border-[#1a2235] p-5">
              <h2 className="text-xl font-bold text-[#f0b429] mb-4">🏆 Achievements</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`text-center p-4 rounded-lg transition-all ${
                      badge.unlocked
                        ? "bg-gradient-to-br from-[#f0b429]/20 to-amber-700/20 border border-[#f0b429] shadow-glow"
                        : "bg-[#1a2235] opacity-50 grayscale"
                    }`}
                  >
                    <div className="text-4xl mb-2">
                      {badge.id === "first_bet" && "🎲"}
                      {badge.id === "high_roller" && "💰"}
                      {badge.id === "whale" && "🐋"}
                      {badge.id === "legend" && "🏅"}
                    </div>
                    <div className="font-bold">{badge.name}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {badge.unlocked ? "Unlocked" : `Wager $${badge.requirement}+`}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center text-sm text-gray-400">
                Total wagered: ${totalWagered.toFixed(2)}
              </div>
            </div>
          )}

          {/* Avatar Tab */}
          {activeTab === "avatar" && (
            <div className="bg-[#0f1520] rounded-xl border border-[#1a2235] p-5">
              <h2 className="text-xl font-bold text-[#f0b429] mb-4">Customize Avatar</h2>
              <div className="flex flex-wrap gap-4 justify-center">
                {["🦁", "🐉", "🎭", "👑", "⭐", "🔥", "💎", "🎰"].map((emoji, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setAvatar(emoji);
                      localStorage.setItem("ec_avatar", emoji);
                    }}
                    className={`w-16 h-16 text-3xl bg-[#1a2235] rounded-full flex items-center justify-center transition hover:scale-110 ${
                      avatar === emoji ? "ring-2 ring-[#f0b429]" : ""
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              {/* Referral Code */}
              <div className="bg-[#0f1520] rounded-xl border border-[#1a2235] p-5">
                <h2 className="text-xl font-bold text-[#f0b429] mb-4">Referral Code</h2>
                <div className="flex items-center gap-3 flex-wrap">
                  <code className="bg-[#1a2235] px-4 py-2 rounded-lg text-lg font-mono">
                    {referralCode}
                  </code>
                  <button
                    onClick={copyReferral}
                    className="px-4 py-2 bg-[#f0b429] text-black font-bold rounded-lg hover:bg-amber-500 transition"
                  >
                    Copy
                  </button>
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  Share this code with friends – they get a bonus, you earn rewards.
                </p>
              </div>

              {/* Notification Preferences */}
              <div className="bg-[#0f1520] rounded-xl border border-[#1a2235] p-5">
                <h2 className="text-xl font-bold text-[#f0b429] mb-4">Notifications</h2>
                <div className="space-y-3">
                  {[
                    { key: "emailPromos", label: "📧 Email Promos" },
                    { key: "winAlerts", label: "🎯 Win Alerts" },
                    { key: "depositReminders", label: "💸 Deposit Reminders" },
                  ].map((item) => (
                    <label key={item.key} className="flex items-center justify-between">
                      <span>{item.label}</span>
                      <button
                        onClick={() => toggleNotif(item.key as keyof NotifPrefs)}
                        className={`relative w-12 h-6 rounded-full transition ${
                          notifPrefs[item.key as keyof NotifPrefs] ? "bg-[#f0b429]" : "bg-gray-600"
                        }`}
                      >
                        <span
                          className={`absolute top-1 w-4 h-4 rounded-full bg-white transition ${
                            notifPrefs[item.key as keyof NotifPrefs] ? "left-7" : "left-1"
                          }`}
                        />
                      </button>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <MobileNav />
      </div>

      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 0 12px rgba(240, 180, 41, 0.4);
        }
      `}</style>
    </>
  );
}
