import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("example", () => {
  const input = `\
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

  assertEquals(solve(input), 198);
});
