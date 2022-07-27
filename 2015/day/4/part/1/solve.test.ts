import solve from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

Deno.test("abcdef", expect(609043));
Deno.test("pqrstuv", expect(1048970));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}
