import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("qjhvhtzxzqqjkmpb", expect(1));
Deno.test("xxyxx", expect(1));
Deno.test("uurcxstgmygtbstg", expect(0));
Deno.test("ieodomkazucvgmuy", expect(0));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}
