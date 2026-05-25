"use client";
import { useEffect, useRef } from "react";

export default function BackgroundCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let frame = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      col: ["rgba(245,200,66,", "rgba(77,159,255,", "rgba(168,85,247,"][Math.floor(Math.random() * 3)],
      alpha: Math.random() * 0.45 + 0.1,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.025 + 0.008,
    }));

    const suits = Array.from({ length: 16 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      sym: ["♠", "♥", "♦", "♣", "⬡", "✦"][Math.floor(Math.random() * 6)],
      size: Math.random() * 14 + 7,
      alpha: Math.random() * 0.04 + 0.015,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.1,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.005,
    }));

    const lines: { x: number; y: number; len: number; angle: number; speed: number; col: string; life: number }[] = [];

    const spawnInterval = setInterval(() => {
      lines.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        len: Math.random() * 100 + 50,
        angle: (Math.random() - 0.5) * 0.3,
        speed: Math.random() * 2.5 + 1,
        col: Math.random() < 0.65 ? "rgba(245,200,66," : "rgba(77,159,255,",
        life: 1,
      });
    }, 550);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        p.pulse += p.pulseSpeed;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        const a = p.alpha * (0.55 + 0.45 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.col + a + ")";
        ctx.fill();
      }

      for (const s of suits) {
        s.x += s.vx; s.y += s.vy; s.rot += s.rotSpeed;
        if (s.x < -30) s.x = canvas.width + 30;
        if (s.x > canvas.width + 30) s.x = -30;
        if (s.y < -30) s.y = canvas.height + 30;
        if (s.y > canvas.height + 30) s.y = -30;
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rot);
        ctx.font = `${s.size}px serif`;
        ctx.fillStyle = `rgba(245,200,66,${s.alpha})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(s.sym, 0, 0);
        ctx.restore();
      }

      for (let i = lines.length - 1; i >= 0; i--) {
        const l = lines[i];
        l.x += l.speed * Math.cos(l.angle + Math.PI);
        l.y += l.speed * Math.sin(l.angle);
        l.life -= 0.018;
        if (l.life <= 0) { lines.splice(i, 1); continue; }
        ctx.save();
        ctx.translate(l.x, l.y);
        ctx.rotate(l.angle);
        const grad = ctx.createLinearGradient(0, 0, -l.len, 0);
        grad.addColorStop(0, l.col + (0.55 * l.life) + ")");
        grad.addColorStop(1, l.col + "0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-l.len, 0);
        ctx.stroke();
        ctx.restore();
      }

      if (frame % 3 === 0 && Math.random() > 0.7) {
        const gx = Math.floor(Math.random() * (canvas.width / 60)) * 60 + 30;
        const gy = Math.floor(Math.random() * (canvas.height / 60)) * 60 + 30;
        ctx.beginPath();
        ctx.arc(gx, gy, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(245,200,66,0.3)";
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(spawnInterval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 0, pointerEvents: "none", display: "block" }}
    />
  );
}