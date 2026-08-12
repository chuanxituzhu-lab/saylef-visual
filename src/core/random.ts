export interface RandomSource {
  next(): number;
  pick<T>(values: readonly T[]): T;
}

export function createSeededRandom(seed: number): RandomSource {
  let state = seed >>> 0;
  const next = () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return {
    next,
    pick<T>(values: readonly T[]): T {
      if (!values.length) throw new Error("Cannot pick from an empty collection");
      return values[Math.floor(next() * values.length)]!;
    }
  };
}
