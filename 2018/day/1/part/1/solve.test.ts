import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("+1, -2, +3, +1", expect(3));
Deno.test("+1, +1, +1", expect(3));
Deno.test("+1, +1, -2", expect(0));
Deno.test("-1, -2, -3", expect(-6));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name.replaceAll(", ", "\n")), expected);
  };
}
