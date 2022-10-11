import { isValid } from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

Deno.test("isValid", async (t) => {
  await t.step("abcde fghij", expect(true));
  await t.step("abcde xyz ecdab", expect(false));
  await t.step("a ab abc abd abf abj", expect(true));
  await t.step("iiii oiii ooii oooi oooo", expect(true));
  await t.step("oiii ioii iioi iiio", expect(false));

  function expect(expected: unknown) {
    return (t: Deno.TestContext) => {
      assertEquals(isValid(t.name), expected);
    };
  }
});
