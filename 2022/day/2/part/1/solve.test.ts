import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("example", () => {
  const input = `\
A Y
B X
C Z`;

  assertEquals(solve(input), 15);
});
