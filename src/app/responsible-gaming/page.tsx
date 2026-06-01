import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Responsible Gaming | EdgeCore",
  description: "EdgeCore responsible gambling tools and resources",
};

export default function ResponsibleGamingPage() {
  return (
    <div style={{
      maxWidth: 780, margin: "0 auto", padding: "48px 24px",
      fontFamily: "system-ui, sans-serif", color: "#e5e7eb", lineHeight: 1.8
    }}>
      <h1 style={{ color: "#fff", fontSize: 32, marginBottom: 8 }}>🛡 Responsible Gaming</h1>
      <p style={{ color: "#9ca3af", marginBottom: 40 }}>
        EdgeCore is committed to providing a safe, fair, and responsible gambling environment.
        Gambling should be fun — if it stops being fun, we have tools to help.
      </p>

      {/* Warning Signs */}
      <div style={{
        background: "#1a0f0f", border: "1px solid #7f1d1d", borderRadius: 12,
        padding: "20px 24px", marginBottom: 40
      }}>
        <h2 style={{ color: "#ef4444", fontSize: 16, margin: "0 0 12px" }}>⚠️ Warning Signs of Problem Gambling</h2>
        <ul style={{ margin: 0, padding: "0 0 0 20px", color: "#fca5a5" }}>
          <li>Spending more than you can afford to lose</li>
          <li>Chasing losses — betting more to win back what you've lost</li>
          <li>Gambling affecting your relationships, work, or finances</li>
          <li>Feeling the need to hide your gambling from others</li>
          <li>Feeling anxious or irritable when not gambling</li>
        </ul>
      </div>

      {/* Tools */}
      <h2 style={{ color: "#f0b429", fontSize: 20, marginBottom: 20 }}>Tools Available on EdgeCore</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 40 }}>
        {[
          { icon: "💰", title: "Deposit Limits", desc: "Set daily, weekly, or monthly caps on how much you can deposit. Changes to increase limits take 7 days to apply." },
          { icon: "📉", title: "Loss Limits", desc: "Cap the total amount you can lose in a period. Set in your wallet settings." },
          { icon: "⏱️", title: "Session Limits", desc: "Receive automatic reminders and auto-logout after a set play duration (30 min to 8 hours)." },
          { icon: "👁️", title: "Reality Checks", desc: "Pop-up notifications showing your net wins/losses and session time at configurable intervals." },
          { icon: "❄️", title: "Cooling-Off", desc: "Take a break from 24 hours to 6 weeks. Immediately blocks access — no way to reverse during the period." },
          { icon: "🚫", title: "Self-Exclusion", desc: "Permanently or for 1–5 years. We will close your account and opt you out of all marketing." },
        ].map(t => (
          <div key={t.title} style={{
            background: "#111827", border: "1px solid #1f2937",
            borderRadius: 12, padding: "18px 20px"
          }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{t.icon}</div>
            <h3 style={{ color: "#fff", fontSize: 15, margin: "0 0 8px" }}>{t.title}</h3>
            <p style={{ color: "#6b7280", fontSize: 13, margin: 0, lineHeight: 1.6 }}>{t.desc}</p>
          </div>
        ))}
      </div>

      {/* How to activate */}
      <div style={{
        background: "#0d1117", border: "1px solid #1f2937", borderRadius: 12,
        padding: "20px 24px", marginBottom: 40
      }}>
        <h3 style={{ color: "#e5e7eb", fontSize: 16, margin: "0 0 10px" }}>How to Activate These Tools</h3>
        <ol style={{ margin: 0, padding: "0 0 0 20px", color: "#9ca3af", lineHeight: 2.2 }}>
          <li>Log in to your EdgeCore account</li>
          <li>Go to <strong style={{ color: "#e5e7eb" }}>Account Settings → Responsible Gaming</strong></li>
          <li>Select the tool you want to enable and confirm</li>
          <li>Or contact support at <a href="mailto:support@edgecore.gg" style={{ color: "#f0b429" }}>support@edgecore.gg</a> for immediate assistance</li>
        </ol>
      </div>

      {/* External Resources */}
      <h2 style={{ color: "#f0b429", fontSize: 20, marginBottom: 16 }}>Get Help — External Resources</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        {[
          { name: "BeGambleAware", url: "https://www.begambleaware.org", desc: "Free advice and support" },
          { name: "Gamblers Anonymous", url: "https://www.gamblersanonymous.org", desc: "Peer support groups" },
          { name: "GamCare", url: "https://www.gamcare.org.uk", desc: "Counselling & helpline" },
          { name: "NCPG", url: "https://www.ncpgambling.org", desc: "National helpline: 1-800-522-4700" },
        ].map(r => (
          <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer"
            style={{
              display: "block", background: "#111827", border: "1px solid #1f2937",
              borderRadius: 10, padding: "14px 16px", textDecoration: "none",
              transition: "border-color 0.2s"
            }}>
            <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>{r.name} ↗</div>
            <div style={{ color: "#6b7280", fontSize: 12, marginTop: 4 }}>{r.desc}</div>
          </a>
        ))}
      </div>

      <p style={{ color: "#4b5563", fontSize: 13, marginTop: 40, borderTop: "1px solid #1f2937", paddingTop: 24 }}>
        EdgeCore operates under Curaçao eGaming License #8048/JAZ. We are committed to preventing underage gambling and supporting players in difficulty. If you have concerns about a minor accessing this site, contact us immediately.
      </p>
    </div>
  );
}
