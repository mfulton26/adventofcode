import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("0,3,6", expect(436));
Deno.test("1,3,2", expect(1));
Deno.test("2,1,3", expect(10));
Deno.test("1,2,3", expect(27));
Deno.test("2,3,1", expect(78));
Deno.test("3,2,1", expect(438));
Deno.test("3,1,2", expect(1836));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}
