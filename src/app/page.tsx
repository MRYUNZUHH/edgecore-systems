"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useBalance } from "@/lib/useBalance";
import LiveFeed from "@/components/ui/LiveFeed";
import SportsGrid from "@/components/sports/SportsGrid";

const JACKPOT_KEY = "ec_jackpot";
const BASE_JACKPOT = 847000;

const navLinks = [
  { label: "Casino", href: "/casino" },
  { label: "Sports", href: "/sportsbook" },
  { label: "Promotions", href: "/promotions" },
  { label: "VIP", href: "/vip" },
  { label: "Help", href: "/help" },
];

const featuredGames = [
  { name: "Aviator", emoji: "✈️", href: "/casino/aviator", badge: "Hot", players: "3,241", payout: "100×" },
  { name: "Crash", emoji: "📈", href: "/casino/crash", badge: "Hot", players: "5,102", payout: "∞" },
  { name: "Mines", emoji: "💣", href: "/casino/mines", badge: "Classic", players: "2,450", payout: "Custom" },
  { name: "Plinko", emoji: "🟡", href: "/casino/plinko", badge: "New", players: "1,780", payout: "1000×" },
];

const sportsLinks = ["Soccer", "Basketball", "Tennis", "Esports", "Horse Racing", "Live Bets"];

const promotions = [
  { title: "Welcome Boost", text: "Claim a 100% match on your first deposit and start with a bigger bankroll." },
  { title: "Weekend Reload", text: "Score free spins, bonus cash and cashback offers every Friday night." },
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

    ctx.strokeStyle = "rgba(255,255,255,0.04)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      ctx.beginPath();
      ctx.moveTo(0, (h / 4) * i);
      ctx.lineTo(w, (h / 4) * i);
      ctx.stroke();
    }

    const pts: [number, number][] = [];
    for (let i = 0; i <= 60; i++) {
      const x = (i / 60) * w;
      const raw = Math.pow(1.1, i * 0.75);
      const y = h - (raw / Math.pow(1.1, 60 * 0.75)) * h * 0.85;
      pts.push([x, y]);
    }

    const fillGrad = ctx.createLinearGradient(0, 0, 0, h);
    fillGrad.addColorStop(0, "rgba(240,180,41,0.18)");
    fillGrad.addColorStop(1, "rgba(240,180,41,0)");
    ctx.beginPath();
    pts.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fillStyle = fillGrad;
    ctx.fill();

    const lineGrad = ctx.createLinearGradient(0, 0, w, 0);
    lineGrad.addColorStop(0, "rgba(240,180,41,0.8)");
    lineGrad.addColorStop(1, "rgba(0,255,136,1)");
    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = "round";
    ctx.beginPath();
    pts.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
    ctx.stroke();

    const [ex, ey] = pts[pts.length - 1];
    ctx.beginPath();
    ctx.arc(ex, ey, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#00ff88";
    ctx.fill();
  }, [mult]);

  const color = mult < 2 ? "#f0b429" : mult < 5 ? "#00ff88" : "#ff4444";

  return (
    <div className="stake-card p-5">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-[#8c95ac]">
        <span>Crash · Live</span>
        <span>Round #28,491</span>
      </div>
      <div className="mt-4 text-center">
        <span className="font-heading text-5xl font-semibold" style={{ color, textShadow: `0 0 24px ${color}45` }}>
          {mult.toFixed(2)}×
        </span>
      </div>
      <div className="mt-4 h-28 rounded-2xl border border-white/5 bg-[#070b12] p-2">
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {[
          { user: "@kwame_w", amount: "$120", result: "+$289" },
          { user: "@stellamk", amount: "$50", result: "waiting…" },
          { user: "@jono_bets", amount: "$200", result: "waiting…" },
        ].map((row) => {
          const isPositive = String(row.result).startsWith("+");
          return (
            <div key={row.user} className="flex items-center justify-between rounded-xl border border-white/5 bg-[#101725] px-3 py-2 text-sm">
              <span className="text-[#8c95ac]">{row.user}</span>
              <span className="text-[#f5f7fb]">{row.amount}</span>
              <span className={isPositive ? "font-semibold text-[#00ff88]" : "text-[#6b7280]"}>{row.result}</span>
            </div>
          );
        })}
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
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#06080f]/85 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f0b429]/30 bg-[#f0b429]/10 text-xl">🎲</div>
              <div>
                <p className="font-heading text-xl font-semibold tracking-[0.2em] text-white">EDGECORE</p>
                <p className="text-[11px] uppercase tracking-[0.3em] text-[#8c95ac]">Casino & Sports</p>
              </div>
            </Link>

            <nav className="hidden items-center gap-6 lg:flex">
              {navLinks.map((link) => (
                <Link key={link.label} href={link.href} className="text-sm text-[#c8d0e0] transition hover:text-[#f0b429]">
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/auth/login" className="hidden rounded-full border border-white/10 px-4 py-2 text-sm text-[#c8d0e0] transition hover:border-[#f0b429]/40 hover:text-[#f0b429] sm:block">
                Login
              </Link>
              <Link href="/auth/signup" className="btn-gold rounded-full px-5 py-2.5 text-sm no-underline">
                Join Now
              </Link>
            </div>
          </div>
        </header>

        <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
          <section className="stake-shell relative overflow-hidden rounded-[32px] p-6 lg:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_32%)]" />
            <div className="absolute left-10 top-10 h-24 w-24 rounded-full bg-[#f0b429]/20 blur-3xl pulse-glow" />
            <div className="absolute right-10 top-32 h-20 w-20 rounded-full bg-[#00ff88]/20 blur-3xl pulse-glow" />
            <div className="absolute bottom-8 left-1/2 h-36 w-36 -translate-x-1/2 rounded-full bg-[#f0b429]/10 blur-3xl" />
            <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="stake-pill">
                  <span className="live-dot" />
                  50,000+ players online now
                </div>
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-[#c8d0e0]">
                  <span className="hero-key-pill inline-flex items-center gap-2 text-[#f0b429] shadow-[0_0_16px_rgba(240,180,41,0.14)]">
                    <span className="h-2 w-2 rounded-full bg-[#00ff88] animate-pulse" />
                    Live now: 50,421 players
                  </span>
                  <span className="hero-key-pill inline-flex items-center gap-2 text-[#c8d0e0]">
                    1,264 bets placed in the last minute
                  </span>
                </div>
                <h1 className="mt-5 font-heading text-4xl font-semibold leading-[0.95] text-white sm:text-5xl lg:text-7xl">
                  Play smarter.<br />
                  <span className="text-[#f0b429]">Win bigger.</span>
                </h1>
                <p className="mt-4 max-w-xl text-lg leading-8 text-[#9da7bb]">
                  {isLoggedIn
                    ? `Welcome back, ${username}. Your next big win is waiting in the casino.`
                    : "Discover premium casino games, live sports, instant payouts, and a polished experience built to feel like the biggest names in online gaming."}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {isLoggedIn ? (
                    <Link href="/casino" className="btn-gold inline-flex items-center gap-2 px-6 py-3 text-sm no-underline shadow-[0_0_40px_rgba(240,180,41,0.2)] animate-pulse">
                      🎮 Play Now
                    </Link>
                  ) : (
                    <Link href="/auth/signup" className="btn-gold inline-flex items-center gap-2 px-6 py-3 text-sm no-underline shadow-[0_0_40px_rgba(240,180,41,0.2)] animate-pulse">
                      🚀 Start Playing
                    </Link>
                  )}
                  <Link href="/casino" className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-[#f5f7fb] transition hover:border-[#f0b429]/40 hover:text-[#f0b429]">
                    Browse Games
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap gap-6">
                  {[
                    { label: "Live Jackpot", value: `$${Math.floor(jackpot / 1000)}K+` },
                    { label: "Active Players", value: "50K+" },
                    { label: "Avg Payout", value: "2.3s" },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="font-heading text-2xl font-semibold text-white">{item.value}</p>
                      <p className="text-xs uppercase tracking-[0.25em] text-[#7a8498]">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <CrashChartMini />
            </div>
          </section>

          <section className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0d131f]/80 px-4 py-4 text-sm text-[#c8d0e0] shadow-[0_18px_60px_rgba(0,0,0,0.22)]">
            <div className="overflow-hidden">
              <div className="flex animate-slide-left gap-10 whitespace-nowrap text-[#f0b429]">
                <span>Live: 53,412 users</span>
                <span>•</span>
                <span>12 games trending</span>
                <span>•</span>
                <span>18 sports markets open</span>
                <span>•</span>
                <span>VIP rewards active</span>
                <span>•</span>
                <span>New casino drops every hour</span>
                <span>•</span>
              </div>
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="stake-card p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#8c95ac]">Live Jackpot</p>
                  <p className="mt-1 font-heading text-4xl font-semibold text-[#f0b429]">${jackpot.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
                </div>
                <Link href="/casino/crash" className="rounded-full border border-[#f0b429]/30 px-4 py-2 text-sm font-semibold text-[#f0b429] transition hover:bg-[#f0b429]/10">
                  Play Now
                </Link>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#8c95ac]">
                The biggest prize pool in the house, updated in real time with every round.
              </p>
            </div>

            <div className="stake-card p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-[#8c95ac]">Latest Wins</p>
              <div className="mt-4 space-y-2">
                {recentWins.map((row) => (
                  <div key={row.user} className="flex items-center justify-between rounded-2xl border border-white/5 bg-[#0d131f] px-3 py-2 text-sm">
                    <span className="text-[#9da7bb]">{row.user}</span>
                    <span className="text-[#f5f7fb]">{row.game}</span>
                    <span className="font-semibold text-[#00ff88]">${row.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-end justify-between">
              <div>
                <h2 className="font-heading text-3xl font-semibold text-white">Featured Games</h2>
                <p className="mt-1 text-sm text-[#8c95ac]">Fast-paced entertainment, fair play, and instant action.</p>
              </div>
              <Link href="/casino" className="text-sm font-semibold text-[#f0b429] transition hover:underline">
                View all
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {featuredGames.map((game) => (
                <Link key={game.name} href={game.href} className="stake-card game-card group overflow-hidden p-4 transition hover:-translate-y-1 hover:border-[#f0b429]/40">
                  <div className="flex items-start justify-between">
                    <div className="text-4xl">{game.emoji}</div>
                    <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8c95ac]">
                      {game.badge}
                    </span>
                  </div>
                  <h3 className="mt-5 font-heading text-2xl font-semibold text-white">{game.name}</h3>
                  <p className="mt-1 text-sm text-[#8c95ac]">{game.players} online</p>
                  <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-3 text-sm">
                    <span className="text-[#8c95ac]">Max payout</span>
                    <span className="font-semibold text-[#f0b429]">{game.payout}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="stake-card p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-2xl font-semibold text-white">Sportsbook</h2>
                <Link href="/sportsbook" className="text-sm font-semibold text-[#f0b429] transition hover:underline">
                  Explore
                </Link>
              </div>
              <div className="mt-4">
                <div className="text-sm text-[#8c95ac] mb-3">Popular markets</div>
                {/* SportsGrid renders compact match rows with odds */}
                <div>
                  {/* @ts-ignore */}
                  <SportsGrid />
                </div>
              </div>
            </div>

            <div className="stake-card p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-2xl font-semibold text-white">Promotions</h2>
                <Link href="/promotions" className="text-sm font-semibold text-[#f0b429] transition hover:underline">
                  View all
                </Link>
              </div>
              <div className="mt-4 space-y-3">
                {promotions.map((promo) => (
                  <div key={promo.title} className="rounded-2xl border border-[#f0b429]/15 bg-[#0d131f] p-4">
                    <p className="font-semibold text-white">{promo.title}</p>
                    <p className="mt-1 text-sm leading-7 text-[#8c95ac]">{promo.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {!isLoggedIn && (
            <section className="stake-card overflow-hidden p-6 lg:p-8">
              <div className="grid items-center gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <div className="stake-pill">Welcome bonus</div>
                  <h2 className="mt-4 font-heading text-3xl font-semibold text-white">
                    Get up to <span className="text-[#f0b429]">$500</span> on your first deposit.
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-[#8c95ac]">
                    Start with a bigger bankroll, unlock exclusive offers, and jump straight into the action.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link href="/auth/signup" className="btn-gold inline-flex items-center px-6 py-3 text-sm no-underline">
                      Claim Bonus
                    </Link>
                    <Link href="/terms" className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-[#dfe4ee] transition hover:border-[#f0b429]/40 hover:text-[#f0b429]">
                      Terms apply
                    </Link>
                  </div>
                </div>
                <div className="rounded-[24px] border border-[#f0b429]/15 bg-[radial-gradient(circle_at_center,rgba(240,180,41,0.08),transparent_70%)] p-6 text-center">
                  <p className="font-heading text-6xl font-semibold text-[#f0b429]">$500</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.3em] text-[#8c95ac]">First Deposit Match</p>
                </div>
              </div>
            </section>
          )}

          <section className="stake-card p-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                { title: "Provably Fair", text: "Every result can be verified in real time." },
                { title: "Instant Payouts", text: "Fast withdrawals and reliable settlement." },
                { title: "24/7 Support", text: "Dedicated help whenever you need it." },
                { title: "Secure Payments", text: "Protected deposits and wallet management." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/5 bg-[#0d131f] p-4">
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-[#8c95ac]">{item.text}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="mx-auto mt-4 max-w-7xl border-t border-white/10 px-4 py-8 text-sm text-[#7a8498] lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 EdgeCore Systems. Premium casino and sportsbook experience.</p>
            <div className="flex gap-4">
              <Link href="/terms" className="transition hover:text-[#f0b429]">Terms</Link>
              <Link href="/privacy" className="transition hover:text-[#f0b429]">Privacy</Link>
              <Link href="/help" className="transition hover:text-[#f0b429]">Support</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
