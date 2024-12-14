import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("first example", () => {
  const input = `\
AAAA
BBCD
BBCC
EEEC`;

  assertEquals(solve(input), 140);
});

Deno.test("second example", () => {
  const input = `\
OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`;

  assertEquals(solve(input), 772);
});

Deno.test("larger example", () => {
  const input = `\
RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`;

  assertEquals(solve(input), 1930);
});
