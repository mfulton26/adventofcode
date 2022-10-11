import solve from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

Deno.test("112233-112233", expect(1));
Deno.test("123444-123444", expect(0));
Deno.test("111122-111122", expect(1));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}
