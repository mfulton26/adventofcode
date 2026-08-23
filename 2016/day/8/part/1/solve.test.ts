import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
rect 3x2
rotate column x=1 by 1
rotate row y=0 by 4
rotate column x=1 by 1`;

  assertEquals(solve(input, { width: 7, height: 3 }), 6);
});
