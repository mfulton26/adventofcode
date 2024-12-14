import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("123456789012", expect(1));

function expect(expected: unknown) {
  const options = { "size": { "width": 3, "height": 2 } };
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name, options), expected);
  };
}
