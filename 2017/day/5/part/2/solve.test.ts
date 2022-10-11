import solve from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

Deno.test("example", () => {
  const input = `\
0
3
0
1
-3`;

  assertEquals(solve(input), 10);
});
