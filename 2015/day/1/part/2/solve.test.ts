import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: ")", expected: 1 },
  { input: "()())", expected: 5 },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input), expected);
});
