"use client";
import { useEffect, useRef } from "react";

export default function CasinoBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const colors = ["#EF4444","#3B82F6","#10B981","#F59E0B","#8B5CF6","#EC4899","#06B6D4"];
    const suits = ["♠","♥","♦","♣"];

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      size: 12 + Math.random() * 22,
      sx: (Math.random() - 0.5) * 0.3, sy: (Math.random() - 0.5) * 0.3,
      rot: Math.random() * Math.PI * 2, rs: (Math.random() - 0.5) * 0.008,
      type: Math.floor(Math.random() * 5),
      col: colors[Math.floor(Math.random() * colors.length)],
    }));

    let animId: number;
    const draw = () => {
      // Much more transparent clear — lets grid show through
      ctx.fillStyle = "rgba(10,14,26,0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.sx; p.y += p.sy; p.rot += p.rs;
        if (p.x > canvas.width + p.size) p.x = -p.size;
        if (p.x < -p.size) p.x = canvas.width + p.size;
        if (p.y > canvas.height + p.size) p.y = -p.size;
        if (p.y < -p.size) p.y = canvas.height + p.size;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        // DULLED — much lower alpha
        ctx.globalAlpha = 0.12;
        if (p.type === 0) {
          ctx.fillStyle = p.col; ctx.beginPath(); ctx.arc(0, 0, p.size, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = "#FFF"; ctx.lineWidth = 2; ctx.globalAlpha = 0.06; ctx.stroke();
          ctx.fillStyle = "#FFF"; ctx.beginPath(); ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2); ctx.globalAlpha = 0.04; ctx.fill();
        } else if (p.type === 1) {
          ctx.fillStyle = p.col; ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.strokeStyle = "#FFF"; ctx.lineWidth = 1.5; ctx.globalAlpha = 0.05; ctx.strokeRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else if (p.type === 2) {
          ctx.fillStyle = "#FFF"; ctx.fillRect(-p.size / 2, -p.size / 1.4, p.size, p.size * 1.4);
          ctx.strokeStyle = p.col; ctx.lineWidth = 1.5; ctx.globalAlpha = 0.06; ctx.strokeRect(-p.size / 2, -p.size / 1.4, p.size, p.size * 1.4);
          ctx.fillStyle = p.col; ctx.font = `${p.size * 0.5}px serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.globalAlpha = 0.04; ctx.fillText(suits[Math.floor(Math.random() * 4)], 0, 0);
        } else if (p.type === 3) {
          ctx.fillStyle = "#F59E0B"; ctx.beginPath(); ctx.ellipse(0, 0, p.size, p.size * 0.8, 0, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = "#FCD34D"; ctx.lineWidth = 1.5; ctx.globalAlpha = 0.05; ctx.stroke();
        } else {
          ctx.fillStyle = "#FCD34D";
          for (let i = 0; i < 4; i++) { ctx.save(); ctx.rotate((Math.PI / 2) * i); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(p.size * 0.6, 0); ctx.lineTo(p.size * 0.18, p.size * 0.18); ctx.closePath(); ctx.fill(); ctx.restore(); }
        }
        ctx.restore();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 0, pointerEvents: "none", display: "block" }} />;
}