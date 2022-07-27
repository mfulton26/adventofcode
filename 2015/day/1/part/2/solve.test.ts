import solve from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

Deno.test(")", expect(1));
Deno.test("()())", expect(5));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}
