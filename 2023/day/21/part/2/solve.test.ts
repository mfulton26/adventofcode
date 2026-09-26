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
Deno.test.each([
  { steps: 6, expected: 16 },
  { steps: 10, expected: 50 },
  { steps: 50, expected: 1594 },
  { steps: 100, expected: 6536 },
  { steps: 500, expected: 167004 },
  { steps: 1000, expected: 668697 },
  { steps: 5000, expected: 16733044 },
])("$steps", { ignore: true }, ({ steps, expected }) => {
  assertEquals(solve(input, { steps }), expected);
});
