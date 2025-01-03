import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("R8, R4, R4, R8", expect(4));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}
