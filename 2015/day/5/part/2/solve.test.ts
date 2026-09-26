import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "qjhvhtzxzqqjkmpb", expected: 1 },
  { input: "xxyxx", expected: 1 },
  { input: "uurcxstgmygtbstg", expected: 0 },
  { input: "ieodomkazucvgmuy", expected: 0 },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input), expected);
});
