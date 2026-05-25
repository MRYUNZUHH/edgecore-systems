"use client";
import { useEffect, useRef } from "react";

export default function BackgroundCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    let animId: number;
    let time = 0;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const drawGradientMesh = () => {
      const t = time * 0.0002;
      // Layer 1: Very faint purple
      const g1 = ctx.createRadialGradient(canvas.width * 0.3 + Math.sin(t * 0.5) * 80, canvas.height * 0.2 + Math.cos(t * 0.4) * 60, 0, canvas.width * 0.3, canvas.height * 0.2, canvas.width * 0.8);
      g1.addColorStop(0, 'rgba(139, 92, 246, 0.04)');
      g1.addColorStop(1, 'rgba(10, 14, 26, 0)');
      ctx.fillStyle = g1; ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Layer 2: Faint gold
      const g2 = ctx.createRadialGradient(canvas.width * 0.7 + Math.cos(t * 0.6) * 100, canvas.height * 0.7 + Math.sin(t * 0.5) * 70, 0, canvas.width * 0.7, canvas.height * 0.7, canvas.width * 0.6);
      g2.addColorStop(0, 'rgba(245, 158, 11, 0.03)');
      g2.addColorStop(1, 'rgba(10, 14, 26, 0)');
      ctx.fillStyle = g2; ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // Very few subtle particles
    const particles = Array.from({ length: 25 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2,
      col: ["rgba(245,200,66,","rgba(77,159,255,"][Math.floor(Math.random() * 2)],
      alpha: Math.random() * 0.2 + 0.03,
      pulse: Math.random() * Math.PI * 2, ps: Math.random() * 0.015 + 0.004,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time = performance.now();
      drawGradientMesh();

      for (const p of particles) {
        p.x += p.vx; p.y += p.vy; p.pulse += p.ps;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        const a = p.alpha * (0.5 + 0.5 * Math.sin(p.pulse));
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.col + a + ")"; ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 0, pointerEvents: "none", display: "block" }} />;
}