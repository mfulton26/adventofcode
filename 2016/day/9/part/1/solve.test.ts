import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "ADVENT", expected: 6 },
  { input: "A(1x5)BC", expected: 7 },
  { input: "(3x3)XYZ", expected: 9 },
  { input: "A(2x2)BCD(2x2)EFG", expected: 11 },
  { input: "(6x1)(1x3)A", expected: 6 },
  { input: "X(8x2)(3x3)ABCY", expected: 18 },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input), expected);
});
