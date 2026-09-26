import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "R2, L3", expected: 5 },
  { input: "R2, R2, R2", expected: 2 },
  { input: "R5, L5, R5, R3", expected: 12 },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input), expected);
});
