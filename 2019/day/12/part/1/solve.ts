import { parsePositions } from "../../positions.ts";

export default function solve(input: string, { steps = 1_000 } = {}): number {
  const moons = parsePositions(input).map((position) => {
    const velocity = [0, 0, 0];
    return { position, velocity };
  });
  for (let step = 0; step < steps; step++) {
    for (let i = 0; i < moons.length; i++) {
      for (let j = i + 1; j < moons.length; j++) {
        for (let k = 0; k < 3; k++) {
          const change = Math.sign(moons[j].position[k] - moons[i].position[k]);
          moons[i].velocity[k] += change;
          moons[j].velocity[k] -= change;
        }
      }
    }
    for (let i = 0; i < moons.length; i++) {
      for (let k = 0; k < 3; k++) {
        moons[i].position[k] += moons[i].velocity[k];
      }
    }
  }
  return moons.reduce((total, { position, velocity }) => {
    const potential = position.reduce((sum, p) => sum + Math.abs(p), 0);
    const kinetic = velocity.reduce((sum, v) => sum + Math.abs(v), 0);
    return total + potential * kinetic;
  }, 0);
}
