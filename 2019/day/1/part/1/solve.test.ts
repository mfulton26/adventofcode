import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "12", expected: 2 },
  { input: "14", expected: 2 },
  { input: "1969", expected: 654 },
  { input: "100756", expected: 33583 },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input), expected);
});
