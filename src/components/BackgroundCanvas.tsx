"use client";
import { useEffect, useRef } from "react";

export default function BackgroundCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let frame = 0;
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      col: ["rgba(245,200,66,", "rgba(77,159,255,", "rgba(168,85,247,"][Math.floor(Math.random() * 3)],
      a: Math.random() * 0.4 + 0.1,
      pulse: Math.random() * Math.PI * 2,
      ps: Math.random() * 0.02 + 0.008,
    }));

    const suits = Array.from({ length: 14 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      sym: ["♠", "♥", "♦", "♣", "⬡"][Math.floor(Math.random() * 5)],
      size: Math.random() * 13 + 7,
      a: Math.random() * 0.035 + 0.012,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.08,
      rot: Math.random() * Math.PI * 2,
      vrot: (Math.random() - 0.5) * 0.004,
    }));

    const lines: any[] = [];
    const spawnInterval = setInterval(() => {
      lines.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        len: Math.random() * 90 + 40,
        angle: Math.random() * 0.3 - 0.15,
        speed: Math.random() * 2 + 0.8,
        col: Math.random() < 0.65 ? "rgba(245,200,66," : "rgba(77,159,255,",
        life: 1,
      });
    }, 700);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      for (const p of particles) {
        p.x += p.vx; p.y += p.vy; p.pulse += p.ps;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        const a = p.a * (0.6 + 0.4 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.col + a + ")";
        ctx.fill();
      }

      for (const s of suits) {
        s.x += s.vx; s.y += s.vy; s.rot += s.vrot;
        if (s.x < -20) s.x = canvas.width + 20;
        if (s.x > canvas.width + 20) s.x = -20;
        if (s.y < -20) s.y = canvas.height + 20;
        if (s.y > canvas.height + 20) s.y = -20;
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rot);
        ctx.font = `${s.size}px serif`;
        ctx.fillStyle = `rgba(245,200,66,${s.a})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(s.sym, 0, 0);
        ctx.restore();
      }

      for (let i = lines.length - 1; i >= 0; i--) {
        const l = lines[i];
        l.x += l.speed * Math.cos(l.angle + Math.PI);
        l.y += l.speed * Math.sin(l.angle);
        l.life -= 0.016;
        if (l.life <= 0) { lines.splice(i, 1); continue; }
        ctx.save();
        ctx.translate(l.x, l.y);
        ctx.rotate(l.angle);
        const grad = ctx.createLinearGradient(0, 0, -l.len, 0);
        grad.addColorStop(0, l.col + (0.5 * l.life) + ")");
        grad.addColorStop(1, l.col + "0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-l.len, 0);
        ctx.stroke();
        ctx.restore();
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
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 1 }}
    />
  );
}