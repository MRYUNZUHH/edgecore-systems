"use client";
import { useState, useEffect } from "react";

export default function AgeGate({ children }: { children: React.ReactNode }) {
  const [verified, setVerified] = useState<boolean | null>(null);

  useEffect(() => {
    const v = localStorage.getItem("age_verified");
    setVerified(v === "true");
  }, []);

  if (verified === null) return null;
  if (verified) return <>{children}</>;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "system-ui, sans-serif"
    }}>
      <div style={{
        background: "#111827", border: "1px solid #2d2d3d", borderRadius: 20,
        padding: "52px 44px", maxWidth: 420, width: "90%", textAlign: "center",
        boxShadow: "0 25px 60px rgba(0,0,0,0.6)"
      }}>
        <div style={{ fontSize: 56, marginBottom: 20 }}>🔞</div>
        <h1 style={{ color: "#fff", fontSize: 26, margin: "0 0 10px", fontWeight: 700 }}>
          Age Verification
        </h1>
        <p style={{ color: "#9ca3af", fontSize: 14, margin: "0 0 36px", lineHeight: 1.7 }}>
          EdgeCore is an 18+ platform. By entering you confirm you are of legal gambling age in your jurisdiction and agree to our Terms & Conditions.
        </p>
        <button
          onClick={() => {
            localStorage.setItem("age_verified", "true");
            setVerified(true);
          }}
          style={{
            width: "100%", padding: "15px 0", background: "#f0b429",
            color: "#000", fontWeight: 700, fontSize: 16, border: "none",
            borderRadius: 10, cursor: "pointer", marginBottom: 12,
            transition: "opacity 0.2s"
          }}
          onMouseOver={e => (e.currentTarget.style.opacity = "0.9")}
          onMouseOut={e => (e.currentTarget.style.opacity = "1")}
        >
          ✅ I am 18 or older — Enter
        </button>
        <button
          onClick={() => (window.location.href = "https://www.google.com")}
          style={{
            width: "100%", padding: "15px 0", background: "transparent",
            color: "#6b7280", fontSize: 14, border: "1px solid #374151",
            borderRadius: 10, cursor: "pointer"
          }}
        >
          I am under 18 — Exit
        </button>
        <p style={{ color: "#4b5563", fontSize: 11, marginTop: 20 }}>
          Licensed under Curaçao eGaming #8048/JAZ · Gamble Responsibly
        </p>
      </div>
    </div>
  );
}
