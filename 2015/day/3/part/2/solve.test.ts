import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("^v", expect(3));
Deno.test("^>v<", expect(3));
Deno.test("^v^v^v^v^v", expect(11));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}
