import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example 1", () => {
  const input = `\
.#..#
.....
#####
....#
...##`;

  assertEquals(solve(input), 8);
});

Deno.test("example 2", () => {
  const input = `\
......#.#.
#..#.#....
..#######.
.#.#.###..
.#..#.....
..#....#.#
#..#....#.
.##.#..###
##...#..#.
.#....####`;

  assertEquals(solve(input), 33);
});

Deno.test("example 3", () => {
  const input = `\
#.#...#.#.
.###....#.
.#....#...
##.#.#.#.#
....#.#.#.
.##..###.#
..#...##..
..##....##
......#...
.####.###.`;

  assertEquals(solve(input), 35);
});

Deno.test("example 4", () => {
  const input = `\
.#..#..###
####.###.#
....###.#.
..###.##.#
##.##.#.#.
....###..#
..#.#..#.#
#..#.#.###
.##...##.#
.....#.#..`;

  assertEquals(solve(input), 41);
});

Deno.test("example 5", () => {
  const input = `\
.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##`;

  assertEquals(solve(input), 210);
});
