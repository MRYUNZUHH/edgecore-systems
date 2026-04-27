// src/lib/engine/rng.ts
import seedrandom from 'seedrandom';

export class RNG {
  private rng: seedrandom.PRNG;
  public seed: number;

  constructor(seed?: number) {
    this.seed = seed || Date.now();
    this.rng = seedrandom(this.seed.toString());
  }

  next(): number {
    return this.rng();
  }

  nextRange(min: number, max: number): number {
    return min + this.rng() * (max - min);
  }

  nextInt(min: number, max: number): number {
    return Math.floor(this.nextRange(min, max + 1));
  }

  nextGaussian(): number {
    let u = 0, v = 0;
    while (u === 0) u = this.rng();
    while (v === 0) v = this.rng();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  }
}
