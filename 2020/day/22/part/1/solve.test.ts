import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`;

  assertEquals(solve(input), 306);
});
