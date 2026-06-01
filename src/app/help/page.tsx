import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help Center | EdgeCore",
};

const CATEGORIES = [
  {
    icon: "🔐", title: "Account & Security",
    links: ["How to create an account", "Changing your password", "Two-factor authentication (2FA)", "Account verification (KYC)", "Closing your account"]
  },
  {
    icon: "💰", title: "Deposits & Withdrawals",
    links: ["Supported payment methods", "How to deposit funds", "How to withdraw funds", "Withdrawal processing times", "Deposit not received"]
  },
  {
    icon: "🎮", title: "Games",
    links: ["How Crash works", "How Mines works", "Understanding Provably Fair", "Game RTPs explained", "Reporting a game issue"]
  },
  {
    icon: "🎁", title: "Bonuses & Promotions",
    links: ["Welcome bonus terms", "Wagering requirements explained", "VIP program overview", "Referral program", "Expired bonus"]
  },
  {
    icon: "🛡", title: "Responsible Gaming",
    links: ["Setting deposit limits", "Taking a cooling-off period", "Self-exclusion", "Gambling addiction resources", "Protecting a minor"]
  },
  {
    icon: "⚖️", title: "Legal & Compliance",
    links: ["Our gaming license", "Restricted countries", "AML policy", "Privacy & data requests", "Dispute resolution"]
  },
];

export default function HelpPage() {
  return (
    <div style={{
      maxWidth: 900, margin: "0 auto", padding: "48px 24px",
      fontFamily: "system-ui, sans-serif", color: "#e5e7eb"
    }}>
      <h1 style={{ color: "#fff", fontSize: 32, marginBottom: 8 }}>Help Center</h1>
      <p style={{ color: "#6b7280", marginBottom: 16 }}>What can we help you with?</p>

      <div style={{
        background: "#111827", border: "1px solid #1f2937", borderRadius: 12,
        padding: "14px 18px", display: "flex", alignItems: "center",
        gap: 12, marginBottom: 40
      }}>
        <span style={{ fontSize: 18 }}>🔍</span>
        <input
          type="text" placeholder="Search help articles..."
          style={{
            flex: 1, background: "none", border: "none", outline: "none",
            color: "#e5e7eb", fontSize: 15
          }}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: 48 }}>
        {CATEGORIES.map(cat => (
          <div key={cat.title} style={{
            background: "#111827", border: "1px solid #1f2937",
            borderRadius: 14, padding: "20px 22px"
          }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{cat.icon}</div>
            <h2 style={{ color: "#fff", fontSize: 15, margin: "0 0 14px", fontWeight: 600 }}>{cat.title}</h2>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
              {cat.links.map(link => (
                <li key={link}>
                  <a href="/faq" style={{ color: "#6b7280", fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ color: "#374151" }}>→</span> {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{
        background: "#0d111a", border: "1px solid #1f2937", borderRadius: 14,
        padding: "28px", textAlign: "center"
      }}>
        <h3 style={{ color: "#fff", fontSize: 18, margin: "0 0 10px" }}>Still need help?</h3>
        <p style={{ color: "#6b7280", fontSize: 14, margin: "0 0 20px" }}>Our support team responds within 2 hours, 24/7.</p>
        <a href="/contact" style={{
          display: "inline-block", padding: "12px 32px", background: "#f0b429",
          color: "#000", fontWeight: 700, fontSize: 14, borderRadius: 8, textDecoration: "none"
        }}>
          Contact Support
        </a>
      </div>
    </div>
  );
}
