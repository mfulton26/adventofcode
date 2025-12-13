import lcm from "@lib/lcm.ts";
import { parsePositions } from "../../positions.ts";

export default function solve(input: string) {
  const moons = parsePositions(input).map((initialPosition) => {
    const initialVelocity = [0, 0, 0];
    const position = [...initialPosition], velocity = [...initialVelocity];
    return ({ initialPosition, initialVelocity, position, velocity });
  });
  const repeats = [0, 0, 0];
  for (let step = 0; repeats.some((r) => !r); step++) {
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
    for (let k = 0; k < repeats.length; k++) {
      if (repeats[k]) continue;
      const aligns = moons.every((moon) =>
        moon.position[k] === moon.initialPosition[k] &&
        moon.velocity[k] === moon.initialVelocity[k]
      );
      if (aligns) repeats[k] = step + 1;
    }
  }
  return repeats.reduce(lcm);
}
