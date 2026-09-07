import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
Disc #1 has 5 positions; at time=0, it is at position 4.
Disc #2 has 2 positions; at time=0, it is at position 1.`;

  assertEquals(solve(input), 5);
});
