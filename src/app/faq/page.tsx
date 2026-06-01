"use client";
import { useState } from "react";
import type { Metadata } from "next";

const FAQS = [
  {
    q: "How do I create an account?",
    a: "Click 'Sign Up' on the homepage, enter your email and password, verify your email address, and complete the age verification step. You can start playing within 2 minutes."
  },
  {
    q: "What payment methods are supported?",
    a: "We support M-Pesa, MTN MoMo, Airtel Money, Visa, Mastercard, Bitcoin (BTC), and USDT. More methods are being added regularly."
  },
  {
    q: "How long do withdrawals take?",
    a: "Mobile money withdrawals (M-Pesa, MTN, Airtel) are processed within 15 minutes. Card and crypto withdrawals take 24–72 hours depending on the payment provider."
  },
  {
    q: "What is 'Provably Fair'?",
    a: "Provably Fair means you can independently verify that every game outcome is truly random and not manipulated. Before each round we publish a cryptographic hash of the server seed; after the round you can verify the outcome using the seed verification tool in your account."
  },
  {
    q: "What is the minimum deposit?",
    a: "The minimum deposit is $5 (or equivalent). There is no minimum on how much of your balance you can wager in a single game."
  },
  {
    q: "Are my funds safe?",
    a: "Yes. Player funds are held in segregated accounts separate from operational funds. We are licensed under Curaçao eGaming #8048/JAZ which requires us to maintain solvency and player fund protection."
  },
  {
    q: "How do I set a deposit limit?",
    a: "Go to Account Settings → Responsible Gaming → Deposit Limits. You can set daily, weekly, or monthly caps. Limit decreases apply immediately; increases take 7 days to prevent impulsive decisions."
  },
  {
    q: "My account has been locked — what do I do?",
    a: "Accounts are locked if unusual activity is detected or KYC documents are requested. Contact support@edgecore.gg with your account email and we'll resolve it within 24 hours."
  },
  {
    q: "What countries are restricted?",
    a: "EdgeCore does not accept players from: United States, United Kingdom, Netherlands, France, Spain, Australia, and other jurisdictions where online gambling is prohibited. The full restricted list is in our Terms & Conditions."
  },
  {
    q: "Is there a mobile app?",
    a: "Our site is fully mobile-optimised and works as a Progressive Web App (PWA). On mobile, tap 'Add to Home Screen' in your browser to install it as an app. Native iOS and Android apps are coming soon."
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{
      maxWidth: 760, margin: "0 auto", padding: "48px 24px",
      fontFamily: "system-ui, sans-serif", color: "#e5e7eb"
    }}>
      <h1 style={{ color: "#fff", fontSize: 32, marginBottom: 8 }}>Frequently Asked Questions</h1>
      <p style={{ color: "#6b7280", marginBottom: 40 }}>
        Can't find your answer? Email us at{" "}
        <a href="mailto:support@edgecore.gg" style={{ color: "#f0b429" }}>support@edgecore.gg</a>
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {FAQS.map((faq, i) => (
          <div key={i} style={{
            background: open === i ? "#1a1f2e" : "#111827",
            border: `1px solid ${open === i ? "#2d3748" : "#1f2937"}`,
            borderRadius: 12, overflow: "hidden", transition: "all 0.2s"
          }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: "100%", padding: "18px 20px",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                background: "none", border: "none", cursor: "pointer",
                textAlign: "left", color: "#e5e7eb", fontSize: 15, fontWeight: 600
              }}
            >
              {faq.q}
              <span style={{
                color: "#6b7280", fontSize: 20, flexShrink: 0, marginLeft: 12,
                transform: open === i ? "rotate(45deg)" : "none",
                transition: "transform 0.2s"
              }}>+</span>
            </button>
            {open === i && (
              <div style={{
                padding: "0 20px 20px",
                color: "#9ca3af", fontSize: 14, lineHeight: 1.7
              }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
