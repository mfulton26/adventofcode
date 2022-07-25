import solve from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

for (
  const { input, expected } of [
    { input: ")", expected: 1 },
    { input: "()())", expected: 5 },
  ]
) {
  Deno.test(input, () => {
    assertEquals(solve(input), expected);
  });
}
