import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
3   4
4   3
2   5
1   3
3   9
3   3`;

  assertEquals(solve(input), 31);
});
