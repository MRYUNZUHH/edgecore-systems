"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useBalance } from "@/lib/useBalance";
import LiveFeed from "@/components/ui/LiveFeed";
import MobileNav from "@/components/layout/MobileNav";

const JACKPOT_KEY = "ec_jackpot";
const BASE_JACKPOT = 847000;

const games = [
  { n: "Aviator", e: "✈️", h: "/casino/aviator", hot: true, players: "3,241", maxWin: "100×", color: "rgba(255,107,53,0.15)" },
  { n: "Crash", e: "📈", h: "/casino/crash", hot: true, players: "5,102", maxWin: "∞", color: "rgba(0,255,136,0.1)" },
  { n: "Mines", e: "💣", h: "/casino/mines", players: "2,450", maxWin: "Custom", color: "rgba(255,68,68,0.1)" },
  { n: "Plinko", e: "🟡", h: "/casino/plinko", isNew: true, players: "1,780", maxWin: "1000×", color: "rgba(240,180,41,0.1)" },
  { n: "Dice", e: "🎲", h: "/casino/dice", players: "890", maxWin: "9900×", color: "rgba(79,142,247,0.1)" },
  { n: "Roulette", e: "🎡", h: "/casino/roulette", players: "1,340", maxWin: "35×", color: "rgba(124,58,237,0.1)" },
];

const recentWins = [
  { user: "Kwame W.", game: "Aviator", amount: 4200, mult: "34.2×" },
  { user: "Amina F.", game: "Crash", amount: 1850, mult: "8.3×" },
  { user: "Dev P.", game: "Mines", amount: 920, mult: "5.1×" },
  { user: "Nia O.", game: "Plinko", amount: 3300, mult: "66×" },
];

function CrashChartMini() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mult, setMult] = useState(1.0);
  const multRef = useRef(1.0);

  useEffect(() => {
    let raf: number;
    let lastTime = 0;
    const animate = (ts: number) => {
      if (ts - lastTime > 120) {
        multRef.current += 0.025 + multRef.current * 0.015;
        if (multRef.current > 12 + Math.random() * 8) multRef.current = 1.0;
        setMult(multRef.current);
        lastTime = ts;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    ctx.clearRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = "rgba(255,255,255,0.04)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      ctx.beginPath();
      ctx.moveTo(0, (h / 4) * i);
      ctx.lineTo(w, (h / 4) * i);
      ctx.stroke();
    }

    // Build curve points
    const pts: [number, number][] = [];
    for (let i = 0; i <= 60; i++) {
      const x = (i / 60) * w;
      const raw = Math.pow(1.1, i * 0.75);
      const y = h - (raw / Math.pow(1.1, 60 * 0.75)) * h * 0.85;
      pts.push([x, y]);
    }

    // Fill
    const fillGrad = ctx.createLinearGradient(0, 0, 0, h);
    fillGrad.addColorStop(0, "rgba(0,255,136,0.18)");
    fillGrad.addColorStop(1, "rgba(0,255,136,0)");
    ctx.beginPath();
    pts.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fillStyle = fillGrad;
    ctx.fill();

    // Line
    const lineGrad = ctx.createLinearGradient(0, 0, w, 0);
    lineGrad.addColorStop(0, "rgba(240,180,41,0.8)");
    lineGrad.addColorStop(1, "rgba(0,255,136,1)");
    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = "round";
    ctx.beginPath();
    pts.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
    ctx.stroke();

    // Dot at end
    const [ex, ey] = pts[pts.length - 1];
    ctx.beginPath();
    ctx.arc(ex, ey, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#00ff88";
    ctx.fill();
  }, [mult]);

  const color = mult < 2 ? "#f0b429" : mult < 5 ? "#00ff88" : "#ff4444";

  return (
    <div className="bg-[#0f1520] border border-[#ffffff0f] rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-gray-500 tracking-widest uppercase">📈 Crash · Live</span>
        <span className="text-xs text-gray-600">Round #28,491</span>
      </div>
      <div className="text-center">
        <span className="font-heading text-5xl font-bold transition-all" style={{ color, textShadow: `0 0 30px ${color}55` }}>
          {mult.toFixed(2)}×
        </span>
      </div>
      <div className="h-28 relative">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="flex flex-col gap-1.5">
        {[
          { u: "@kwame_w", a: "$120", p: "+$289", win: true },
          { u: "@stellamk", a: "$50", p: "waiting…", win: false },
          { u: "@jono_bets", a: "$200", p: "waiting…", win: false },
        ].map((row) => (
          <div key={row.u} className="flex justify-between items-center px-3 py-2 rounded-lg bg-[#1a2235] text-xs">
            <span className="text-gray-500">{row.u}</span>
            <span className="text-gray-300 font-medium">{row.a}</span>
            <span className={row.win ? "text-[#00ff88] font-bold" : "text-gray-600 italic"}>{row.p}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const { isLoggedIn, username } = useBalance();
  const [jackpot, setJackpot] = useState(BASE_JACKPOT);
  const [winIdx, setWinIdx] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem(JACKPOT_KEY);
    if (stored) setJackpot(parseFloat(stored));
    else localStorage.setItem(JACKPOT_KEY, BASE_JACKPOT.toString());

    const jp = setInterval(() => {
      setJackpot((prev) => {
        const next = prev + Math.random() * 80 + 20;
        localStorage.setItem(JACKPOT_KEY, next.toString());
        return next;
      });
    }, 2000);
    return () => clearInterval(jp);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setWinIdx((i) => (i + 1) % recentWins.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <LiveFeed />
      <div className="pb-20 lg:pb-0">

        {/* ── HERO ─────────────────────────────────── */}
        <section
          className="relative px-4 py-14 lg:py-20 overflow-hidden"
          style={{ background: "radial-gradient(ellipse at 60% 0%, rgba(240,180,41,0.07) 0%, transparent 55%), radial-gradient(ellipse at 10% 80%, rgba(0,255,136,0.04) 0%, transparent 50%)" }}
        >
          {/* decorative grid */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "48px 48px"
          }} />

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left */}
            <div className="space-y-7">
              {/* Live badge */}
              <div className="inline-flex items-center gap-2 bg-[#0f1520] border border-[#00ff88]/20 rounded-full px-4 py-1.5">
                <span className="live-dot" />
                <span className="text-xs font-bold text-[#00ff88] tracking-widest uppercase">50,000+ Players Online Now</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-heading font-bold leading-[0.95] tracking-tight">
                Play Smarter,<br />
                <span className="text-[#f0b429]" style={{ textShadow: "0 0 60px rgba(240,180,41,0.3)" }}>Win Bigger.</span>
              </h1>

              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                {isLoggedIn
                  ? `Welcome back, ${username}! Your games are waiting.`
                  : "Provably fair crash games, live casino & sports predictions. Instant payouts. Zero nonsense."}
              </p>

              <div className="flex flex-wrap gap-3">
                {isLoggedIn ? (
                  <Link href="/casino" className="inline-flex items-center gap-2 bg-[#f0b429] text-black font-bold px-8 py-4 rounded-xl text-base no-underline hover:bg-[#d4981f] transition shadow-[0_0_30px_rgba(240,180,41,0.35)] hover:shadow-[0_0_50px_rgba(240,180,41,0.5)]">
                    🎮 Play Now
                  </Link>
                ) : (
                  <Link href="/auth/signup" className="inline-flex items-center gap-2 bg-[#f0b429] text-black font-bold px-8 py-4 rounded-xl text-base no-underline hover:bg-[#d4981f] transition shadow-[0_0_30px_rgba(240,180,41,0.35)] hover:shadow-[0_0_50px_rgba(240,180,41,0.5)]">
                    🚀 Start Playing Free
                  </Link>
                )}
                <Link href="/casino" className="inline-flex items-center gap-2 border border-[#f0b429]/30 text-[#f0b429] font-bold px-8 py-4 rounded-xl text-base no-underline hover:border-[#f0b429]/70 hover:bg-[#f0b429]/5 transition">
                  Browse Games →
                </Link>
              </div>

              {/* Stats row */}
              <div className="flex gap-8 pt-2">
                {[
                  { label: "Live Jackpot", value: `$${Math.floor(jackpot / 1000)}K+` },
                  { label: "Active Players", value: "50K+" },
                  { label: "Avg Payout", value: "2.3s" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-heading text-2xl font-bold text-white">{s.value}</p>
                    <p className="text-xs text-gray-500 tracking-wider uppercase mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Crash preview */}
            <CrashChartMini />
          </div>
        </section>

        {/* ── JACKPOT BANNER ──────────────────────── */}
        <section className="px-4 max-w-7xl mx-auto mb-8">
          <div className="relative overflow-hidden rounded-2xl border border-[#f0b429]/20 bg-gradient-to-r from-[#0f1520] via-[#1a1000] to-[#0f1520] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="absolute inset-0 pointer-events-none" style={{
              background: "radial-gradient(ellipse at 50% 50%, rgba(240,180,41,0.06) 0%, transparent 70%)"
            }} />
            <div className="relative flex items-center gap-4">
              <div className="text-4xl">🔥</div>
              <div>
                <p className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-0.5">Live Jackpot — Never Resets</p>
                <p className="font-heading text-4xl font-bold text-[#f0b429]" style={{ textShadow: "0 0 40px rgba(240,180,41,0.4)" }}>
                  ${jackpot.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>
            <div className="relative flex items-center gap-3">
              {/* rotating recent win */}
              <div className="hidden sm:block text-right">
                <p className="text-xs text-gray-500 mb-0.5">Latest Win</p>
                <p className="text-sm text-white font-bold">{recentWins[winIdx].user}</p>
                <p className="text-xs text-gray-400">{recentWins[winIdx].game} · <span className="text-[#00ff88] font-bold">${recentWins[winIdx].amount.toLocaleString()}</span> @ {recentWins[winIdx].mult}</p>
              </div>
              <Link href="/casino/crash" className="whitespace-nowrap bg-[#f0b429] text-black font-bold px-6 py-3 rounded-xl text-sm no-underline hover:bg-[#d4981f] transition shadow-[0_0_24px_rgba(240,180,41,0.35)]">
                Play Crash →
              </Link>
            </div>
          </div>
        </section>

        {/* ── GAMES GRID ──────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 mb-10">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="font-heading text-3xl font-bold text-white">Featured Games</h2>
              <p className="text-gray-500 text-sm mt-0.5">Provably fair · Instant wins · Low house edge</p>
            </div>
            <Link href="/casino" className="text-[#f0b429] text-sm font-bold hover:underline no-underline hidden sm:block">
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {games.map((g) => (
              <Link
                key={g.n}
                href={g.h}
                className="group relative bg-[#0f1520] border border-[#ffffff0f] rounded-xl p-4 text-center no-underline hover:border-[#f0b429]/50 transition-all hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(240,180,41,0.1)] overflow-hidden"
              >
                {/* colored glow bg */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: g.color }} />

                {g.hot && <span className="absolute top-2 right-2 bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded font-bold tracking-wider uppercase">HOT</span>}
                {g.isNew && <span className="absolute top-2 right-2 bg-[#7c3aed] text-white text-[9px] px-1.5 py-0.5 rounded font-bold tracking-wider uppercase">NEW</span>}

                <div className="text-4xl mb-3 relative z-10">{g.e}</div>
                <h3 className="text-white font-bold text-sm mb-1 relative z-10">{g.n}</h3>
                <p className="text-gray-600 text-[10px] relative z-10">
                  <span className="text-[#00ff88]">●</span> {g.players}
                </p>
                <p className="text-gray-600 text-[10px] relative z-10">Max {g.maxWin}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── WELCOME BONUS ────────────────────────── */}
        {!isLoggedIn && (
          <section className="max-w-7xl mx-auto px-4 mb-10">
            <div className="relative overflow-hidden rounded-2xl border border-[#f0b429]/20 bg-[#0f1520] p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="absolute inset-0 pointer-events-none" style={{
                background: "radial-gradient(ellipse at 20% 50%, rgba(240,180,41,0.05) 0%, transparent 60%)"
              }} />
              <div className="relative">
                <span className="inline-block bg-[#f0b429]/10 border border-[#f0b429]/30 text-[#f0b429] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded mb-4">
                  🎁 Welcome Bonus
                </span>
                <h2 className="font-heading text-4xl font-bold text-white mb-2">
                  Get Up To <span className="text-[#f0b429]">$500</span><br />On Your First Deposit
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  100% match bonus · Credited instantly · No wagering tricks
                </p>
                <div className="flex gap-3">
                  <Link href="/auth/signup" className="bg-[#f0b429] text-black font-bold px-6 py-3 rounded-xl text-sm no-underline hover:bg-[#d4981f] transition shadow-[0_0_24px_rgba(240,180,41,0.3)]">
                    Claim Bonus
                  </Link>
                  <Link href="/terms" className="border border-[#ffffff0f] text-gray-500 px-4 py-3 rounded-xl text-sm no-underline hover:text-white transition">
                    Terms apply
                  </Link>
                </div>
              </div>
              <div className="relative text-center sm:text-right">
                <p className="font-heading text-8xl font-bold text-[#f0b429]/20 leading-none select-none">$500</p>
                <p className="text-gray-500 text-xs -mt-2">First Deposit Match</p>
              </div>
            </div>
          </section>
        )}

        {/* ── TRUST STRIP ──────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: "🔒", title: "Provably Fair", sub: "Every result verifiable on-chain" },
              { icon: "⚡", title: "Instant Payouts", sub: "Avg. 2.3s withdrawal time" },
              { icon: "🛡️", title: "Licensed & Regulated", sub: "Curaçao eGaming #8048/JAZ" },
              { icon: "🎧", title: "24/7 Support", sub: "Live chat always available" },
            ].map((f) => (
              <div key={f.title} className="bg-[#0f1520] border border-[#ffffff0f] rounded-xl p-4">
                <div className="text-2xl mb-2">{f.icon}</div>
                <p className="text-white font-bold text-sm mb-0.5">{f.title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{f.sub}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
      <MobileNav />
    </>
  );
}
