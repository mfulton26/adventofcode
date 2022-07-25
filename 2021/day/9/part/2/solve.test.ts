import solve from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

const input = `2199943210
3987894921
9856789892
8767896789
9899965678`;

Deno.test("example", () => {
  assertEquals(solve(input), 1134);
});
