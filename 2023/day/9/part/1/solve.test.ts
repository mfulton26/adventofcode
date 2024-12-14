import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

  assertEquals(solve(input), 114);
});
