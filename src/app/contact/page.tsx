"use client";

export default function ContactPage() {
  return (
    <div style={{
      maxWidth: 760, margin: "0 auto", padding: "48px 24px",
      fontFamily: "system-ui, sans-serif", color: "#e5e7eb"
    }}>
      <h1 style={{ color: "#fff", fontSize: 32, marginBottom: 8 }}>Contact Us</h1>
      <p style={{ color: "#6b7280", marginBottom: 40 }}>Our support team is available 24/7.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 48 }}>
        {[
          { icon: "📧", title: "Email Support",   detail: "support@edgecore.gg",  sub: "Response within 2 hours",   href: "mailto:support@edgecore.gg" },
          { icon: "💬", title: "Live Chat",        detail: "Available in-app",     sub: "Login to start chat",       href: "/auth/login" },
          { icon: "⚖️", title: "Legal & Compliance", detail: "legal@edgecore.gg", sub: "KYC & licensing queries",   href: "mailto:legal@edgecore.gg" },
          { icon: "🔒", title: "Privacy / DPO",   detail: "privacy@edgecore.gg",  sub: "Data requests & GDPR",      href: "mailto:privacy@edgecore.gg" },
        ].map(c => (
          <a key={c.title} href={c.href}
            style={{
              display: "block", background: "#111827", border: "1px solid #1f2937",
              borderRadius: 14, padding: "22px 20px", textDecoration: "none",
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>{c.icon}</div>
            <div style={{ color: "#9ca3af", fontSize: 12, marginBottom: 4 }}>{c.title}</div>
            <div style={{ color: "#f0b429", fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{c.detail}</div>
            <div style={{ color: "#4b5563", fontSize: 12 }}>{c.sub}</div>
          </a>
        ))}
      </div>

      <div style={{
        background: "#111827", border: "1px solid #1f2937",
        borderRadius: 14, padding: "28px 28px"
      }}>
        <h2 style={{ color: "#fff", fontSize: 18, margin: "0 0 16px" }}>Before Contacting Support</h2>
        <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.7, margin: "0 0 16px" }}>
          Check our <a href="/faq" style={{ color: "#f0b429" }}>FAQ</a> — most common questions about deposits, withdrawals, bonuses, and account issues are answered there.
        </p>
        <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
          For withdrawal delays, please allow the stated processing time before contacting us. If it has been more than 72 hours, email us with your transaction ID.
        </p>
      </div>
    </div>
  );
}
