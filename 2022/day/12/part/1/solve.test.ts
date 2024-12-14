import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

  assertEquals(solve(input), 31);
});
