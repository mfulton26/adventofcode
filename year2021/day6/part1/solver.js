import { parseAges } from "../agesParser.js";

import sum from "../../../lib/sum.js";

export function solve(input) {
  const timers = Array(9).fill(0);
  for (const age of parseAges(input)) timers[age]++;
  for (let n = 0; n < 80; n++) {
    const resetCount = timers.shift();
    timers[6] += resetCount;
    timers[8] = resetCount;
  }
  return timers[sum]();
}
