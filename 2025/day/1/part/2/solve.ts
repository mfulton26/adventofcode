import mod from "@lib/mod.ts";
import { parseRotations } from "../../rotations.ts";

export default function solve(input: string) {
  const rotations = parseRotations(input);
  let dial = 50;
  let count = 0;
  for (const rotation of rotations) {
    count += rotation < 0
      ? Math.floor(((100 - dial) % 100 - rotation) / 100)
      : Math.floor((dial + rotation) / 100);
    dial = mod(dial + rotation, 100);
  }
  return count;
}
