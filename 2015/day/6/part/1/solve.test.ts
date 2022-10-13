import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("turn on 0,0 through 999,999", expect(1000000));
Deno.test("toggle 0,0 through 999,0", expect(1000));
Deno.test("turn off 499,499 through 500,500", expect(0));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}
