import solve from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

Deno.test("+1, -2, +3, +1", expect(2));
Deno.test("+1, -1", expect(0));
Deno.test("+3, +3, +4, -2, -4", expect(10));
Deno.test("-6, +3, +8, +5, -6", expect(5));
Deno.test("+7, +7, -2, -7, -4", expect(14));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name.replaceAll(", ", "\n")), expected);
  };
}
