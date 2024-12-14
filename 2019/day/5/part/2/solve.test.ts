import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("3,9,8,9,10,9,4,9,99,-1,8", expect(0));
Deno.test("3,9,7,9,10,9,4,9,99,-1,8", expect(1));
Deno.test("3,3,1108,-1,8,3,4,3,99", expect(0));
Deno.test("3,3,1107,-1,8,3,4,3,99", expect(1));
Deno.test("3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9", expect(1));
Deno.test("3,3,1105,-1,9,1101,0,0,12,4,12,99,1", expect(1));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}
