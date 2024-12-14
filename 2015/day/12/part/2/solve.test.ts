import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("[1,2,3]", expect(6));
Deno.test('[1,{"c":"red","b":2},3]', expect(4));
Deno.test('{"d":"red","e":[1,2,3,4],"f":5}', expect(0));
Deno.test('[1,"red",5]', expect(6));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}
