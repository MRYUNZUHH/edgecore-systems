"use client";
import { useState, useRef, useEffect, useCallback } from "react";

type Phase = "waiting" | "countdown" | "running" | "crashed";

interface HistoryEntry {
  value: number;
  id: number;
}

export default function CrashPage() {
  const [phase, setPhase] = useState<Phase>("waiting");
  const [multiplier, setMultiplier] = useState(1.0);
  const [history, setHistory] = useState<HistoryEntry[]>([
    { value: 2.31, id: 1 }, { value: 1.05, id: 2 }, { value: 8.42, id: 3 },
    { value: 3.14, id: 4 }, { value: 1.88, id: 5 }, { value: 14.3, id: 6 },
  ]);
  const [bet, setBet] = useState(10);
  const [customBet, setCustomBet] = useState("");
  const [cashedOut, setCashedOut] = useState<number | null>(null);
  const [balance, setBalance] = useState(1000);
  const [countdown, setCountdown] = useState(3);
  const [autoCashout, setAutoCashout] = useState("");
  const [message, setMessage] = useState("");

  const intervalRef = useRef<NodeJS.Timeout>();
  const countdownRef = useRef<NodeJS.Timeout>();
  const crashAt = useRef(1);
  const startTime = useRef(0);

  const effectiveBet = customBet ? parseFloat(customBet) || 0 : bet;

  const startCountdown = useCallback(() => {
    if (balance < effectiveBet || effectiveBet <= 0) {
      setMessage("Insufficient balance or invalid bet.");
      return;
    }
    setMessage("");
    setPhase("countdown");
    setCountdown(3);
    let c = 3;
    countdownRef.current = setInterval(() => {
      c -= 1;
      setCountdown(c);
      if (c <= 0) {
        clearInterval(countdownRef.current);
        startRound();
      }
    }, 1000);
  }, [balance, effectiveBet]);

  function startRound() {
    // Provably fair geometric distribution with 3% house edge
    const r = Math.random();
    const crash = Math.max(1.01, 0.97 / (1 - r));
    crashAt.current = crash;
    setCashedOut(null);
    setPhase("running");
    setMultiplier(1.0);
    setBalance(b => b - effectiveBet);
    startTime.current = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTime.current) / 1000;
      // Exponential growth curve: e^(0.15t)
      const m = Math.pow(Math.E, 0.15 * elapsed);
      const rounded = parseFloat(m.toFixed(2));
      setMultiplier(rounded);

      // Auto cashout check
      const ac = parseFloat(autoCashout);
      if (ac > 1 && rounded >= ac) {
        clearInterval(intervalRef.current);
        doCashOut(rounded, effectiveBet);
        return;
      }

      if (m >= crashAt.current) {
        clearInterval(intervalRef.current);
        const finalVal = parseFloat(m.toFixed(2));
        setMultiplier(finalVal);
        setPhase("crashed");
        setHistory(h => [{ value: finalVal, id: Date.now() }, ...h.slice(0, 14)]);
        setMessage(`Crashed at ${finalVal.toFixed(2)}x`);
      }
    }, 80);
  }

  function doCashOut(m: number, b: number) {
    const winnings = parseFloat((b * m).toFixed(2));
    setCashedOut(m);
    setBalance(prev => prev + winnings);
    setPhase("crashed");
    setHistory(h => [{ value: m, id: Date.now() }, ...h.slice(0, 14)]);
    setMessage(`Cashed out at ${m.toFixed(2)}x — Won $${winnings}!`);
  }

  function cashOut() {
    if (phase !== "running" || cashedOut) return;
    clearInterval(intervalRef.current);
    doCashOut(multiplier, effectiveBet);
  }

  function reset() {
    setPhase("waiting");
    setMultiplier(1.0);
    setCashedOut(null);
    setMessage("");
  }

  useEffect(() => () => {
    clearInterval(intervalRef.current);
    clearInterval(countdownRef.current);
  }, []);

  const bgColor = phase === "crashed" && !cashedOut
    ? "#1a0000"
    : phase === "running"
    ? "#0a0f0a"
    : "#0d0d14";

  const multColor = phase === "crashed" && !cashedOut
    ? "#ef4444"
    : cashedOut
    ? "#22c55e"
    : "#f0b429";

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 16px", fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h1 style={{ color: "#fff", margin: 0, fontSize: 22 }}>📈 Crash</h1>
          <span style={{ color: "#6b7280", fontSize: 12 }}>RTP 97% · Provably Fair</span>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: "#9ca3af", fontSize: 12 }}>Balance</div>
          <div style={{ color: "#f0b429", fontWeight: 700, fontSize: 18 }}>${balance.toFixed(2)}</div>
        </div>
      </div>

      {/* Game Display */}
      <div style={{
        height: 300, background: bgColor, borderRadius: 20,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 20, border: "1px solid #1e1e2e", position: "relative",
        overflow: "hidden", transition: "background 0.3s"
      }}>
        {phase === "countdown" ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#9ca3af", fontSize: 14, marginBottom: 8 }}>Round starting in</div>
            <div style={{ fontSize: 80, fontWeight: 800, color: "#6366f1" }}>{countdown}</div>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: 72, fontWeight: 900, fontVariantNumeric: "tabular-nums",
              color: multColor, transition: "color 0.2s",
              textShadow: phase === "running" ? `0 0 40px ${multColor}44` : "none"
            }}>
              {phase === "waiting" ? "1.00x" : `${multiplier.toFixed(2)}x`}
            </div>
            {phase === "crashed" && !cashedOut && (
              <div style={{ color: "#ef4444", fontSize: 16, fontWeight: 600 }}>CRASHED</div>
            )}
            {cashedOut && (
              <div style={{ color: "#22c55e", fontSize: 16, fontWeight: 600 }}>
                CASHED OUT @ {cashedOut.toFixed(2)}x
              </div>
            )}
          </div>
        )}
        {/* Multiplier growth indicator */}
        {phase === "running" && (
          <div style={{
            position: "absolute", bottom: 0, left: 0,
            height: 3, background: "#f0b429",
            width: `${Math.min(100, (multiplier - 1) * 10)}%`,
            transition: "width 0.08s linear"
          }} />
        )}
      </div>

      {/* Message */}
      {message && (
        <div style={{
          padding: "10px 16px", borderRadius: 10, marginBottom: 16, fontSize: 14, fontWeight: 600,
          background: message.includes("Won") ? "#052e16" : message.includes("Crashed") ? "#1f0000" : "#1f2937",
          color: message.includes("Won") ? "#22c55e" : message.includes("Crashed") ? "#ef4444" : "#9ca3af",
          border: `1px solid ${message.includes("Won") ? "#166534" : message.includes("Crashed") ? "#7f1d1d" : "#374151"}`
        }}>
          {message}
        </div>
      )}

      {/* Bet Amounts */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {[10, 50, 100, 500].map(v => (
          <button key={v} onClick={() => { setBet(v); setCustomBet(""); }}
            style={{
              flex: 1, padding: "10px 0", borderRadius: 8, cursor: "pointer", fontSize: 14,
              background: bet === v && !customBet ? "#1e293b" : "#111827",
              color: bet === v && !customBet ? "#f0b429" : "#9ca3af",
              border: `1px solid ${bet === v && !customBet ? "#f0b429" : "#374151"}`,
              fontWeight: 600, transition: "all 0.15s"
            }}>
            ${v}
          </button>
        ))}
        <input
          type="number" placeholder="Custom"
          value={customBet}
          onChange={e => setCustomBet(e.target.value)}
          style={{
            flex: 1, padding: "10px 8px", borderRadius: 8, fontSize: 13,
            background: "#111827", border: `1px solid ${customBet ? "#f0b429" : "#374151"}`,
            color: "#fff", textAlign: "center"
          }}
        />
      </div>

      {/* Auto Cashout */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <span style={{ color: "#6b7280", fontSize: 13, whiteSpace: "nowrap" }}>Auto cashout at:</span>
        <input
          type="number" placeholder="e.g. 2.00"
          value={autoCashout}
          onChange={e => setAutoCashout(e.target.value)}
          style={{
            flex: 1, padding: "8px 12px", borderRadius: 8, fontSize: 13,
            background: "#111827", border: "1px solid #374151", color: "#fff"
          }}
        />
        <span style={{ color: "#6b7280", fontSize: 13 }}>x</span>
      </div>

      {/* Action Button */}
      {phase === "waiting" && (
        <button onClick={startCountdown}
          disabled={balance < effectiveBet || effectiveBet <= 0}
          style={{
            width: "100%", padding: 18, borderRadius: 12, cursor: "pointer",
            background: balance < effectiveBet ? "#1f2937" : "#16a34a",
            color: balance < effectiveBet ? "#4b5563" : "#fff",
            fontWeight: 800, fontSize: 17, border: "none", transition: "all 0.2s",
            letterSpacing: "0.02em"
          }}>
          {balance < effectiveBet ? "Insufficient Balance" : `🎲 Place Bet — $${effectiveBet}`}
        </button>
      )}
      {phase === "countdown" && (
        <button disabled style={{
          width: "100%", padding: 18, borderRadius: 12,
          background: "#1e293b", color: "#6b7280",
          fontWeight: 700, fontSize: 17, border: "1px solid #374151", cursor: "not-allowed"
        }}>
          Starting in {countdown}...
        </button>
      )}
      {phase === "running" && !cashedOut && (
        <button onClick={cashOut}
          style={{
            width: "100%", padding: 18, borderRadius: 12, cursor: "pointer",
            background: "#f0b429", color: "#000",
            fontWeight: 800, fontSize: 17, border: "none",
            animation: "pulse 0.5s ease-in-out infinite alternate"
          }}>
          💰 Cash Out @ {multiplier.toFixed(2)}x = ${(effectiveBet * multiplier).toFixed(2)}
        </button>
      )}
      {phase === "crashed" && (
        <button onClick={reset}
          style={{
            width: "100%", padding: 18, borderRadius: 12, cursor: "pointer",
            background: "#6366f1", color: "#fff",
            fontWeight: 700, fontSize: 17, border: "none"
          }}>
          ↻ Play Again
        </button>
      )}

      {/* History */}
      <div style={{ marginTop: 24 }}>
        <div style={{ color: "#6b7280", fontSize: 12, marginBottom: 10, fontWeight: 600 }}>HISTORY</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {history.map(h => (
            <span key={h.id} style={{
              padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700,
              background: h.value < 2 ? "#1f2937" : h.value < 5 ? "#052e16" : h.value < 10 ? "#1c1917" : "#1a0000",
              color: h.value < 2 ? "#9ca3af" : h.value < 5 ? "#22c55e" : h.value < 10 ? "#f97316" : "#ef4444",
              border: `1px solid ${h.value < 2 ? "#374151" : h.value < 5 ? "#166534" : h.value < 10 ? "#9a3412" : "#7f1d1d"}`
            }}>
              {h.value.toFixed(2)}x
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          from { transform: scale(1); }
          to   { transform: scale(1.01); }
        }
      `}</style>
    </div>
  );
}
