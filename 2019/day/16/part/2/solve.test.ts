import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "03036732577212944063491565474664", expected: "84462026" },
  { input: "02935109699940807407585447034323", expected: "78725270" },
  { input: "03081770884921959731165446850517", expected: "53553731" },
])(
  "$input after 100 to starts with $expected",
  ({ input, expected }) => {
    assertEquals(solve(input), expected);
  },
);
