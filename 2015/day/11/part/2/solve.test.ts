import { isValidPassword } from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("isValidPassword", async (t) => {
  await t.step("hijklmmn", expect(false));
  await t.step("abbceffg", expect(false));
  await t.step("abbcegjk", expect(false));

  function expect(expected: unknown) {
    return (t: Deno.TestContext) => {
      assertEquals(isValidPassword(t.name), expected);
    };
  }
});
