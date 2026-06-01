"use client";
import { useEffect, useState } from "react";

export default function JackpotCounter({ base = 847000 }: { base?: number }) {
  const [value, setValue] = useState(base);

  useEffect(() => {
    // Grow fast at first (animation catch-up), then settle to realistic rate
    const interval = setInterval(() => {
      setValue(v => v + Math.floor(Math.random() * 47 + 3));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <span style={{ fontVariantNumeric: "tabular-nums" }}>
      ${value.toLocaleString()}
    </span>
  );
}
