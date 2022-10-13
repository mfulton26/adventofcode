import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("1", expect(0));
Deno.test("12", expect(3));
Deno.test("23", expect(2));
Deno.test("1024", expect(31));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}
