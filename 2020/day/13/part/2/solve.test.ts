import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("7,13,x,x,59,x,31,19", expect(1068781));
Deno.test("17,x,13,19", expect(3417));
Deno.test("67,7,59,61", expect(754018));
Deno.test("67,x,7,59,61", expect(779210));
Deno.test("67,7,x,59,61", expect(1261476));
Deno.test("1789,37,47,1889", expect(1202161486));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(`939\n${t.name}`), expected);
  };
}
