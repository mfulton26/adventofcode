import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "2x3x4", expected: 34 },
  { input: "1x1x10", expected: 14 },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input), expected);
});
