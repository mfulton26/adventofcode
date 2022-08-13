import solve from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

Deno.test('""', expect(2 - 0));
Deno.test('"abc"', expect(5 - 3));
Deno.test('"aaa\\"aaa"', expect(10 - 7));
Deno.test('"\\x27"', expect(6 - 1));

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

  assertEquals(solve(input), 12);
});
