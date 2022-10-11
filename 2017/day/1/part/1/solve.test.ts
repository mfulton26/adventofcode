import solve from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

Deno.test("1122", expect(3));
Deno.test("1111", expect(4));
Deno.test("1234", expect(0));
Deno.test("91212129", expect(9));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}
