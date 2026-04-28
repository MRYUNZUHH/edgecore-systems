'use client';
import { motion } from 'framer-motion';

export default function FAQPage() {
  const faqs = [
    { q: "Is this real gambling?", a: "No, it's a simulation using demo credits." },
    { q: "Can I win real money?", a: "No, all funds are virtual." },
    { q: "How does the house edge work?", a: "The games are programmed to demonstrate how casinos make profit over time." },
    { q: "Why do I keep losing?", a: "The odds are deliberately set against you. That's the house advantage." }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 p-6">
      <div className="max-w-4xl mx-auto glass-panel p-8">
        <h1 className="text-4xl font-black gold-text mb-6">❓ FAQ</h1>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card p-4">
              <h3 className="text-white font-bold">{faq.q}</h3>
              <p className="text-white/70">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
