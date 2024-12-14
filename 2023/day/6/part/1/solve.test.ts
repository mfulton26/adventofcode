import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
Time:      7  15   30
Distance:  9  40  200`;

  assertEquals(solve(input), 288);
});
