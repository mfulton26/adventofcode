import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

  assertEquals(solve(input), 6440);
});
