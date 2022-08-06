import solve from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

Deno.test(">", expect(2));
Deno.test("^>v<", expect(4));
Deno.test("^v^v^v^v^v", expect(2));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}
