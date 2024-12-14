import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("HASH", expect(52));
Deno.test("rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7", expect(1320));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}
