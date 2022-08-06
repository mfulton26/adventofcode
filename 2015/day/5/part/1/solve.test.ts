import solve from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

Deno.test("ugknbfddgicrmopn", expect(1));
Deno.test("aaa", expect(1));
Deno.test("jchzalrnumimnmhp", expect(0));
Deno.test("haegwjzuvuyypxyu", expect(0));
Deno.test("dvszwmarrgswjxmb", expect(0));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}
