import subsets from "@lib/subsets.ts";
import { parseManual } from "../../manuals.ts";

export default function solve(input: string) {
  const manual = parseManual(input);
  let sum = 0;
  for (const { lights, buttons } of manual) {
    const lightsMask = Array.from(lights, (c, i) => (c === "#" ? 1 << i : 0))
      .reduce((mask, bit) => mask | bit, 0);
    const buttonMasks = buttons.map((indices) =>
      indices.reduce((mask, i) => mask | (1 << i), 0)
    );
    let minPresses = Infinity;
    for (const presses of subsets(new Set(buttonMasks))) {
      if (presses.size >= minPresses) continue;
      let pressMask = 0;
      for (const mask of presses) pressMask ^= mask;
      if (pressMask === lightsMask) minPresses = presses.size;
    }
    sum += minPresses;
  }
  return sum;
}
