import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("389125467", expect("67384529"));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}
