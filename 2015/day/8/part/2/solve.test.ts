import solve from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

Deno.test('""', expect(6 - 2));
Deno.test('"abc"', expect(9 - 5));
Deno.test('"aaa\\"aaa"', expect(16 - 10));
Deno.test('"\\x27"', expect(11 - 6));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}

Deno.test("example", () => {
  const input = `""
"abc"
"aaa\\"aaa"
"\\x27"`;

  assertEquals(solve(input), 19);
});
