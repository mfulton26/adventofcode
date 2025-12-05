import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

  assertEquals(solve(input), 14);
});
