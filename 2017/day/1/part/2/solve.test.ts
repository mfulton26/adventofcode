import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("1212", expect(6));
Deno.test("1221", expect(0));
Deno.test("123425", expect(4));
Deno.test("123123", expect(12));
Deno.test("12131415", expect(4));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}
