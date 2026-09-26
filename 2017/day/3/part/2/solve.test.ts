import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "1", expected: 2 },
  { input: "2", expected: 4 },
  { input: "3", expected: 4 },
  { input: "4", expected: 5 },
  { input: "5", expected: 10 },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input), expected);
});
