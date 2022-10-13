import { isValid } from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("isValid", async (t) => {
  await t.step("aa bb cc dd ee", expect(true));
  await t.step("aa bb cc dd aa", expect(false));
  await t.step("aa bb cc dd aaa", expect(true));

  function expect(expected: unknown) {
    return (t: Deno.TestContext) => {
      assertEquals(isValid(t.name), expected);
    };
  }
});
