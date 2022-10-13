import { lookAndSay } from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("lookAndSay", async (t) => {
  await t.step("1", expect("11"));
  await t.step("11", expect("21"));
  await t.step("21", expect("1211"));
  await t.step("1211", expect("111221"));
  await t.step("111221", expect("312211"));

  function expect(expected: unknown) {
    return (t: Deno.TestContext) => {
      assertEquals(lookAndSay(t.name), expected);
    };
  }
});
