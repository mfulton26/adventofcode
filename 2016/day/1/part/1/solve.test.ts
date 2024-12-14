import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("R2, L3", expect(5));
Deno.test("R2, R2, R2", expect(2));
Deno.test("R5, L5, R5, R3", expect(12));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}
