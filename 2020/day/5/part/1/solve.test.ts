import solve, { toSeatId } from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "FBFBBFFRLR", expected: 357 },
  { input: "BFFFBBFRRR", expected: 567 },
  { input: "FFFBBBFRRR", expected: 119 },
  { input: "BBFFBBFRLL", expected: 820 },
])("toSeatId $input", ({ input, expected }) => {
  assertEquals(toSeatId(input), expected);
});

Deno.test("examples", () => {
  const input = `\
FBFBBFFRLR
BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL`;

  assertEquals(solve(input), 820);
});
