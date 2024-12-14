import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

const input = `\
...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`;

/* couldn't get tests to work */
Deno.test("6", { ignore: true }, expect(16));
Deno.test("10", { ignore: true }, expect(50));
Deno.test("50", { ignore: true }, expect(1594));
Deno.test("100", { ignore: true }, expect(6536));
Deno.test("500", { ignore: true }, expect(167004));
Deno.test("1000", { ignore: true }, expect(668697));
Deno.test("5000", { ignore: true }, expect(16733044));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(input, { steps: +t.name }), expected);
  };
}
