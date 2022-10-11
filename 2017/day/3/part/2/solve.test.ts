import solve from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

Deno.test("1", expect(2));
Deno.test("2", expect(4));
Deno.test("3", expect(4));
Deno.test("4", expect(5));
Deno.test("5", expect(10));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}
