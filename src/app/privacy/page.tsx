import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | EdgeCore",
  description: "EdgeCore Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div style={{
      maxWidth: 780, margin: "0 auto", padding: "48px 24px",
      fontFamily: "system-ui, sans-serif", color: "#e5e7eb", lineHeight: 1.8
    }}>
      <h1 style={{ color: "#fff", fontSize: 32, marginBottom: 4 }}>Privacy Policy</h1>
      <p style={{ color: "#6b7280", marginBottom: 40 }}>Last updated: June 2026</p>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ color: "#f0b429", fontSize: 18, borderBottom: "1px solid #1f2937", paddingBottom: 10 }}>1. Data We Collect</h2>
        <p>We collect: name, email address, date of birth, government ID (for KYC), payment details, IP address, device info, and gameplay history. We do not sell your data to third parties.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ color: "#f0b429", fontSize: 18, borderBottom: "1px solid #1f2937", paddingBottom: 10 }}>2. How We Use Your Data</h2>
        <ul>
          <li>Account management and identity verification</li>
          <li>Processing deposits and withdrawals</li>
          <li>Fraud prevention and AML compliance</li>
          <li>Responsible gambling monitoring</li>
          <li>Customer support and communications</li>
          <li>Legal compliance with Curaçao licensing requirements</li>
        </ul>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ color: "#f0b429", fontSize: 18, borderBottom: "1px solid #1f2937", paddingBottom: 10 }}>3. Data Retention</h2>
        <p>We retain personal data for a minimum of 5 years after account closure, as required by our gaming license and AML obligations. You may request deletion of non-essential data by contacting our DPO.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ color: "#f0b429", fontSize: 18, borderBottom: "1px solid #1f2937", paddingBottom: 10 }}>4. Cookies</h2>
        <p>We use essential cookies (session management), analytics cookies (Vercel Analytics), and optional preference cookies. You may manage cookie preferences via the cookie banner or your browser settings.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ color: "#f0b429", fontSize: 18, borderBottom: "1px solid #1f2937", paddingBottom: 10 }}>5. Your Rights</h2>
        <p>You have the right to access, correct, port, and in some cases delete your personal data. To exercise these rights contact: <a href="mailto:privacy@edgecore.gg" style={{ color: "#f0b429" }}>privacy@edgecore.gg</a>. We respond within 30 days.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ color: "#f0b429", fontSize: 18, borderBottom: "1px solid #1f2937", paddingBottom: 10 }}>6. Third-Party Services</h2>
        <p>We use payment processors (Stripe, M-Pesa, Flutterwave), identity verification providers, and cloud infrastructure (Vercel, Supabase). Each provider has their own privacy policy. We only share the minimum data necessary.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ color: "#f0b429", fontSize: 18, borderBottom: "1px solid #1f2937", paddingBottom: 10 }}>7. Contact</h2>
        <p>Data Protection Officer: <a href="mailto:privacy@edgecore.gg" style={{ color: "#f0b429" }}>privacy@edgecore.gg</a></p>
      </section>
    </div>
  );
}
