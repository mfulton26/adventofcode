import solve from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

Deno.test("1 + 2 * 3 + 4 * 5 + 6", expect(231));
Deno.test("2 * 3 + (4 * 5)", expect(46));
Deno.test("5 + (8 * 3 + 9 + 3 * 4 * 3)", expect(1445));
Deno.test("5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))", expect(669060));
Deno.test("((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2", expect(23340));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}
