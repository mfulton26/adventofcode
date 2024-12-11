import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("example", () => {
  const input = `\
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

  assertEquals(solve(input), 36);
});
