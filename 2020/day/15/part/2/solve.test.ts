import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("0,3,6", expect(175594));
Deno.test("1,3,2", expect(2578));
Deno.test("2,1,3", expect(3544142));
Deno.test("1,2,3", expect(261214));
Deno.test("2,3,1", expect(6895259));
Deno.test("3,2,1", expect(18));
Deno.test("3,1,2", expect(362));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}
