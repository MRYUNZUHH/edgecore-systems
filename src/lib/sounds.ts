let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) ctx = new AudioCtx();
    } catch { return null; }
  }
  return ctx;
}

function tone(freq: number, duration: number, type: OscillatorType = "sine", vol = 0.1) {
  const c = getCtx();
  if (!c) return;
  try {
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, c.currentTime);
    g.gain.setValueAtTime(vol, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
    o.connect(g); g.connect(c.destination);
    o.start(c.currentTime); o.stop(c.currentTime + duration);
  } catch {}
}

export function playClick() { tone(800, 0.05, "square", 0.05); }
export function playCoin() { tone(880, 0.1, "sine", 0.08); setTimeout(() => tone(1100, 0.1, "sine", 0.08), 80); setTimeout(() => tone(1320, 0.15, "sine", 0.08), 160); }
export function playCrash() { tone(200, 0.4, "sawtooth", 0.12); setTimeout(() => tone(100, 0.3, "sawtooth", 0.1), 200); }
export function playExplosion() { tone(60, 0.3, "square", 0.15); tone(40, 0.5, "sawtooth", 0.1); }
export function playWin() { tone(523, 0.1, "sine", 0.08); setTimeout(() => tone(659, 0.1, "sine", 0.08), 100); setTimeout(() => tone(784, 0.2, "sine", 0.08), 200); }
export function playDiceRoll() { for (let i = 0; i < 8; i++) setTimeout(() => tone(200 + Math.random() * 400, 0.03, "triangle", 0.04), i * 60); }
export function playBallTick() { tone(1200, 0.02, "sine", 0.03); }