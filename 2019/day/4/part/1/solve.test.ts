import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("111111-111111", expect(1));
Deno.test("223450-223450", expect(0));
Deno.test("123789-123789", expect(0));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}
