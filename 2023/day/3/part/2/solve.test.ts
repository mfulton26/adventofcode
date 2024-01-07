import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("example", () => {
  const input = `\
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

  assertEquals(solve(input), 467835);
});
