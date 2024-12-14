import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("[1,2,3]", expect(6));
Deno.test('{"a":2,"b":4}', expect(6));
Deno.test("[[[3]]]", expect(3));
Deno.test('{"a":{"b":4},"c":-1}', expect(3));
Deno.test('{"a":[-1,1]}', expect(0));
Deno.test('[-1,{"a":1}]', expect(0));
Deno.test("[]", expect(0));
Deno.test("{}", expect(0));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}
