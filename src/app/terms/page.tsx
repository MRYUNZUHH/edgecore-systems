import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | EdgeCore",
  description: "EdgeCore Terms and Conditions of Service",
};

export default function TermsPage() {
  return (
    <div style={{
      maxWidth: 780, margin: "0 auto", padding: "48px 24px",
      fontFamily: "system-ui, sans-serif", color: "#e5e7eb", lineHeight: 1.8
    }}>
      <h1 style={{ color: "#fff", fontSize: 32, marginBottom: 4 }}>Terms & Conditions</h1>
      <p style={{ color: "#6b7280", marginBottom: 40 }}>Last updated: June 2026 · EdgeCore Gaming Ltd.</p>

      <section style={{ marginBottom: 36 }}>
        <h2 style={{ color: "#f0b429", fontSize: 18, borderBottom: "1px solid #1f2937", paddingBottom: 10 }}>1. Eligibility</h2>
        <p>You must be at least 18 years of age (or the legal age of majority in your jurisdiction, whichever is higher) to register and use EdgeCore. It is your responsibility to determine whether online gambling is legal in your jurisdiction. EdgeCore does not accept players from restricted territories.</p>
        <p>By creating an account you confirm that: (a) you are of legal age; (b) online gambling is legal in your jurisdiction; (c) the funds used are not derived from illegal activity; (d) you are not a politically exposed person (PEP).</p>
      </section>

      <section style={{ marginBottom: 36 }}>
        <h2 style={{ color: "#f0b429", fontSize: 18, borderBottom: "1px solid #1f2937", paddingBottom: 10 }}>2. Account Registration</h2>
        <p>One account per person, household, IP address, device, and payment method. Duplicate accounts will be closed and any balances forfeited. You are responsible for all activity on your account and must keep your credentials confidential. EdgeCore is not liable for unauthorized access due to credential sharing.</p>
        <p>EdgeCore reserves the right to request identity verification (KYC) documents at any time. Failure to provide documents within 14 days may result in account suspension.</p>
      </section>

      <section style={{ marginBottom: 36 }}>
        <h2 style={{ color: "#f0b429", fontSize: 18, borderBottom: "1px solid #1f2937", paddingBottom: 10 }}>3. Deposits & Withdrawals</h2>
        <p>Minimum deposit: $5. Minimum withdrawal: $10. Withdrawals are processed within 24–72 hours subject to KYC verification. We reserve the right to perform enhanced due diligence on withdrawals over $2,000. No fees are charged by EdgeCore on standard withdrawals; your payment provider may charge their own fees.</p>
        <p>Deposits are available for wagering only. Unplayed deposits may be withdrawn at any time without restriction. Bonus funds are subject to separate wagering requirements as stated at the time of the bonus offer.</p>
      </section>

      <section style={{ marginBottom: 36 }}>
        <h2 style={{ color: "#f0b429", fontSize: 18, borderBottom: "1px solid #1f2937", paddingBottom: 10 }}>4. Fairness & Provably Fair</h2>
        <p>All EdgeCore Originals games use a provably fair algorithm. Each round generates a server seed hash (published before the round) and a client seed (chosen by you). The outcome is derived from combining these seeds using SHA-256. You may verify any round using the seed verification tool in your account history.</p>
        <p>Third-party games are provided by licensed RNG-certified providers and are independently audited. EdgeCore holds no influence over the outcomes of third-party games.</p>
      </section>

      <section style={{ marginBottom: 36 }}>
        <h2 style={{ color: "#f0b429", fontSize: 18, borderBottom: "1px solid #1f2937", paddingBottom: 10 }}>5. Bonuses & Promotions</h2>
        <p>Bonus terms including wagering requirements, game restrictions, maximum bet limits, and expiry dates are stated on the individual promotion pages. EdgeCore reserves the right to modify or withdraw any promotion at any time. Bonus abuse including multi-accounting, arbitrage betting, or use of exploits will result in bonus cancellation and possible account closure.</p>
      </section>

      <section style={{ marginBottom: 36 }}>
        <h2 style={{ color: "#f0b429", fontSize: 18, borderBottom: "1px solid #1f2937", paddingBottom: 10 }}>6. Responsible Gambling</h2>
        <p>EdgeCore is committed to responsible gambling. Tools including deposit limits, loss limits, session time limits, reality checks, and self-exclusion are available in your account settings. Self-exclusion requests are processed within 24 hours and are binding for the selected period. If you are experiencing gambling-related harm, please contact <a href="https://www.begambleaware.org" style={{ color: "#f0b429" }}>BeGambleAware</a> or our support team.</p>
      </section>

      <section style={{ marginBottom: 36 }}>
        <h2 style={{ color: "#f0b429", fontSize: 18, borderBottom: "1px solid #1f2937", paddingBottom: 10 }}>7. Intellectual Property</h2>
        <p>All content on EdgeCore including software, design, trademarks, and game assets are the property of EdgeCore Gaming Ltd. or its licensors. You may not reproduce, distribute, or create derivative works without prior written consent.</p>
      </section>

      <section style={{ marginBottom: 36 }}>
        <h2 style={{ color: "#f0b429", fontSize: 18, borderBottom: "1px solid #1f2937", paddingBottom: 10 }}>8. Limitation of Liability</h2>
        <p>EdgeCore is not liable for any loss of profits, indirect, incidental, or consequential damages arising from use of the platform. Our total liability shall not exceed the net deposits made by you in the 30 days preceding the claim.</p>
      </section>

      <section style={{ marginBottom: 36 }}>
        <h2 style={{ color: "#f0b429", fontSize: 18, borderBottom: "1px solid #1f2937", paddingBottom: 10 }}>9. Governing Law & Disputes</h2>
        <p>EdgeCore operates under Curaçao eGaming License #8048/JAZ issued by Antillephone N.V. These terms are governed by the laws of Curaçao. All disputes shall be submitted to the jurisdiction of the Curaçao courts. For player disputes, please contact our support team first; unresolved disputes may be escalated to the licensing authority.</p>
      </section>

      <section style={{ marginBottom: 36 }}>
        <h2 style={{ color: "#f0b429", fontSize: 18, borderBottom: "1px solid #1f2937", paddingBottom: 10 }}>10. Contact</h2>
        <p>EdgeCore Gaming Ltd.<br />
        Email: <a href="mailto:legal@edgecore.gg" style={{ color: "#f0b429" }}>legal@edgecore.gg</a><br />
        Support: <a href="mailto:support@edgecore.gg" style={{ color: "#f0b429" }}>support@edgecore.gg</a></p>
      </section>
    </div>
  );
}
