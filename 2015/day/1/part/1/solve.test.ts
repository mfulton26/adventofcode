import solve from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

for (
  const { input, expected } of [
    { input: "(())", expected: 0 },
    { input: "()()", expected: 0 },
    { input: "(((", expected: 3 },
    { input: "(()(()(", expected: 3 },
    { input: "))(((((", expected: 3 },
    { input: "())", expected: -1 },
    { input: "))(", expected: -1 },
    { input: ")))", expected: -3 },
    { input: ")())())", expected: -3 },
  ]
) {
  Deno.test(input, () => {
    assertEquals(solve(input), expected);
  });
}
