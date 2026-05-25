"use client";
import { useState, useEffect } from "react";
import MobileNav from "@/components/layout/MobileNav";

const horses = [
  {n:"Thunder Bolt",o:2.4},{n:"Silver Arrow",o:3.8},{n:"Dark Knight",o:5.5},
  {n:"Golden Flash",o:7.0},{n:"Storm Rider",o:4.2},{n:"Lucky Star",o:9.0},
  {n:"Wild Fire",o:6.5},{n:"Midnight Run",o:8.0},
];

export default function Page() {
  const [countdown, setCountdown] = useState(180);
  const [racing, setRacing] = useState(false);
  const [results, setResults] = useState<number[]>([]);

  useEffect(() => {
    if (countdown <= 0 && !racing) {
      setRacing(true);
      const positions = horses.map(() => 0);
      const i = setInterval(() => {
        let done = true;
        horses.forEach((_, j) => {
          if (positions[j] < 100) {
            positions[j] += Math.random() * 5 + 1;
            done = false;
          }
        });
        setResults([...positions]);
        if (done) {
          clearInterval(i);
          setTimeout(() => {
            setCountdown(180);
            setRacing(false);
            setResults([]);
          }, 5000);
        }
      }, 200);
      return () => clearInterval(i);
    }
    const t = setInterval(() => setCountdown(p => Math.max(0, p - 1)), 1000);
    return () => clearInterval(t);
  }, [countdown, racing]);

  return (
    <div className="pb-20 lg:pb-0">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-heading font-bold text-[#f0b429] mb-6">🐎 Virtual Sports</h1>
        <div className="bg-[#0f1520] border border-[#ffffff0f] rounded-xl p-6 mb-6">
          <div className="flex justify-between mb-4">
            <span className="text-white font-bold">Virtual Horse Racing</span>
            <span className="text-[#f0b429] font-bold">
              {racing ? "RACING!" : "Next race in " + Math.floor(countdown / 60) + ":" + (countdown % 60).toString().padStart(2, "0")}
            </span>
          </div>
          <div className="space-y-2">
            {horses.map((h, i) => (
              <div key={h.n} className="flex items-center gap-3">
                <span className="text-gray-400 text-xs w-24">{h.n}</span>
                <span className="text-[#f0b429] text-xs w-10">{h.o}x</span>
                <div className="flex-1 bg-[#0a0a0f] rounded-full h-6 relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-[#f0b429] rounded-full transition-all duration-200"
                    style={{ width: (results[i] || 0) + "%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}