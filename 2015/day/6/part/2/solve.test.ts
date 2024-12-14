import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("turn on 0,0 through 0,0", expect(1));
Deno.test("toggle 0,0 through 999,999", expect(2000000));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}
