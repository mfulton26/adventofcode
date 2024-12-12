import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("first example", () => {
  const input = `\
AAAA
BBCD
BBCC
EEEC`;

  assertEquals(solve(input), 80);
});

Deno.test("second example", () => {
  const input = `\
OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`;

  assertEquals(solve(input), 436);
});

Deno.test("E-shaped region example", () => {
  const input = `\
EEEEE
EXXXX
EEEEE
EXXXX
EEEEE`;

  assertEquals(solve(input), 236);
});

Deno.test("nested example", () => {
  const input = `\
AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA`;

  assertEquals(solve(input), 368);
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

  assertEquals(solve(input), 1206);
});
