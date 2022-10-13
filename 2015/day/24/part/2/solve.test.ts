import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("example", () => {
  const input = `\
1
2
3
4
5
7
8
9
10
11`;

  assertEquals(solve(input), 11 * 4);
});
