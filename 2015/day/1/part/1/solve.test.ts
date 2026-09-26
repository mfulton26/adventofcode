import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "(())", expected: 0 },
  { input: "()()", expected: 0 },
  { input: "(((", expected: 3 },
  { input: "(()(()(", expected: 3 },
  { input: "))(((((", expected: 3 },
  { input: "())", expected: -1 },
  { input: "))(", expected: -1 },
  { input: ")))", expected: -3 },
  { input: ")())())", expected: -3 },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input), expected);
});
