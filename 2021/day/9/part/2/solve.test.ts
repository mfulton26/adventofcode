import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
2199943210
3987894921
9856789892
8767896789
9899965678`;

  assertEquals(solve(input), 1134);
});
