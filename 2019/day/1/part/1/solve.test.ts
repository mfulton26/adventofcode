import solve from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

Deno.test("12", expect(2));
Deno.test("14", expect(2));
Deno.test("1969", expect(654));
Deno.test("100756", expect(33583));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}
