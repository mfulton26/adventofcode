import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("example", () => {
  const input = `\
1
2
-3
3
-2
0
4`;

  assertEquals(solve(input), 3);
});
