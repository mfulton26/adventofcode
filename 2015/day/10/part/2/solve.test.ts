import { lookAndSay } from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

Deno.test("1", expect("11"));
Deno.test("11", expect("21"));
Deno.test("21", expect("1211"));
Deno.test("1211", expect("111221"));
Deno.test("111221", expect("312211"));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(lookAndSay(t.name), expected);
  };
}
