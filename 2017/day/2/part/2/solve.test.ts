import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("example", () => {
  const input = `\
5 9 2 8
9 4 7 3
3 8 6 5`;

  assertEquals(solve(input), 9);
});
