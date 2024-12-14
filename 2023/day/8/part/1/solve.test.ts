import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example RL", () => {
  const input = `\
RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

  assertEquals(solve(input), 2);
});

Deno.test("example LLR", () => {
  const input = `\
LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

  assertEquals(solve(input), 6);
});
