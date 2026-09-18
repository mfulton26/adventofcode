import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
5-8
0-2
4-7`;

  assertEquals(solve(input), 3);
});
