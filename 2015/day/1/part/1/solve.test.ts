import solve from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

Deno.test("(())", expect(0));
Deno.test("()()", expect(0));
Deno.test("(((", expect(3));
Deno.test("(()(()(", expect(3));
Deno.test("))(((((", expect(3));
Deno.test("())", expect(-1));
Deno.test("))(", expect(-1));
Deno.test(")))", expect(-3));
Deno.test(")())())", expect(-3));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}
