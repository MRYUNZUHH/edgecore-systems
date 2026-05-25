"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number; r: number;
  vx: number; vy: number;
  col: string; alpha: number;
  pulse: number; pulseSpeed: number;
}

interface Suit {
  x: number; y: number;
  sym: string; size: number; alpha: number;
  vx: number; vy: number;
  rot: number; rotSpeed: number;
}

interface LightRay {
  x: number; y: number; len: number;
  angle: number; speed: number;
  col: string; life: number;
}

export default function BackgroundCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let frame = 0;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Dynamic gradient mesh background
    const drawGradientMesh = () => {
      const t = time * 0.0003;
      // Layer 1: Deep purple/blue base
      const g1 = ctx.createRadialGradient(
        canvas.width * 0.3 + Math.sin(t * 0.7) * 100, canvas.height * 0.2 + Math.cos(t * 0.5) * 80,
        0,
        canvas.width * 0.3, canvas.height * 0.2,
        canvas.width * 0.9
      );
      g1.addColorStop(0, 'rgba(139, 92, 246, 0.12)');
      g1.addColorStop(0.5, 'rgba(6, 182, 212, 0.06)');
      g1.addColorStop(1, 'rgba(10, 14, 26, 0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Layer 2: Gold/warm accent
      const g2 = ctx.createRadialGradient(
        canvas.width * 0.7 + Math.cos(t * 0.6) * 120, canvas.height * 0.7 + Math.sin(t * 0.8) * 90,
        0,
        canvas.width * 0.7, canvas.height * 0.7,
        canvas.width * 0.7
      );
      g2.addColorStop(0, 'rgba(245, 158, 11, 0.08)');
      g2.addColorStop(1, 'rgba(10, 14, 26, 0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Layer 3: Cyan accent
      const g3 = ctx.createRadialGradient(
        canvas.width * 0.5 + Math.sin(t * 0.9) * 150, canvas.height * 0.5 + Math.cos(t * 0.7) * 100,
        0,
        canvas.width * 0.5, canvas.height * 0.5,
        canvas.width * 0.8
      );
      g3.addColorStop(0, 'rgba(6, 182, 212, 0.05)');
      g3.addColorStop(1, 'rgba(10, 14, 26, 0)');
      ctx.fillStyle = g3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // Particles
    const particles: Particle[] = Array.from({ length: 90 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 0.3,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      col: ["rgba(139,92,246,", "rgba(6,182,212,", "rgba(245,158,11,", "rgba(245,200,66,"][Math.floor(Math.random() * 4)],
      alpha: Math.random() * 0.5 + 0.08,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.03 + 0.006,
    }));

    // Card suits
    const suits: Suit[] = Array.from({ length: 20 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      sym: ["♠", "♥", "♦", "♣", "⬡", "✦", "◆"][Math.floor(Math.random() * 7)],
      size: Math.random() * 16 + 8,
      alpha: Math.random() * 0.045 + 0.012,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.12,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.006,
    }));

    // Light rays
    const rays: LightRay[] = [];
    const rayInterval = setInterval(() => {
      rays.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        len: Math.random() * 120 + 60,
        angle: (Math.random() - 0.5) * 0.4,
        speed: Math.random() * 3 + 1,
        col: Math.random() < 0.5 ? "rgba(139,92,246," : Math.random() < 0.5 ? "rgba(6,182,212," : "rgba(245,158,11,",
        life: 1,
      });
    }, 600);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time = performance.now();
      frame++;

      // Draw gradient mesh
      drawGradientMesh();

      // Particles
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        p.pulse += p.pulseSpeed;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;
        const a = p.alpha * (0.5 + 0.5 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.col + a + ")";
        ctx.fill();
      }

      // Suit symbols
      for (const s of suits) {
        s.x += s.vx; s.y += s.vy; s.rot += s.rotSpeed;
        if (s.x < -40) s.x = canvas.width + 40;
        if (s.x > canvas.width + 40) s.x = -40;
        if (s.y < -40) s.y = canvas.height + 40;
        if (s.y > canvas.height + 40) s.y = -40;
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rot);
        ctx.font = `${s.size}px serif`;
        ctx.fillStyle = `rgba(139,92,246,${s.alpha})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(s.sym, 0, 0);
        ctx.restore();
      }

      // Light rays
      for (let i = rays.length - 1; i >= 0; i--) {
        const l = rays[i];
        l.x += l.speed * Math.cos(l.angle + Math.PI);
        l.y += l.speed * Math.sin(l.angle);
        l.life -= 0.02;
        if (l.life <= 0) { rays.splice(i, 1); continue; }
        ctx.save();
        ctx.translate(l.x, l.y);
        ctx.rotate(l.angle);
        const grad = ctx.createLinearGradient(0, 0, -l.len, 0);
        grad.addColorStop(0, l.col + (0.6 * l.life) + ")");
        grad.addColorStop(1, l.col + "0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-l.len, 0);
        ctx.stroke();
        ctx.restore();
      }

      // Grid node pulses
      if (frame % 4 === 0 && Math.random() > 0.65) {
        const gx = Math.floor(Math.random() * (canvas.width / 60)) * 60 + 30;
        const gy = Math.floor(Math.random() * (canvas.height / 60)) * 60 + 30;
        const pulse = 0.3 + 0.2 * Math.sin(time * 0.003);
        ctx.beginPath();
        ctx.arc(gx, gy, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${pulse})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(gx, gy, 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${pulse * 0.3})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(rayInterval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100vw", height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}