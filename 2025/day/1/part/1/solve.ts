import mod from "@lib/mod.ts";
import { parseRotations } from "../../rotations.ts";

export default function solve(input: string) {
  const rotations = parseRotations(input);
  let dial = 50;
  let count = 0;
  for (const rotation of rotations) {
    dial = mod(dial + rotation, 100);
    if (dial === 0) count++;
  }
  return count;
}
