import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;

  assertEquals(solve(input), 50);
});
