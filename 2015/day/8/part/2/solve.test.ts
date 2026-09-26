import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: '""', expected: 6 - 2 },
  { input: '"abc"', expected: 9 - 5 },
  { input: '"aaa\\"aaa"', expected: 16 - 10 },
  { input: '"\\x27"', expected: 11 - 6 },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input), expected);
});

Deno.test("example", () => {
  const input = `\
""
"abc"
"aaa\\"aaa"
"\\x27"`;

  assertEquals(solve(input), 19);
});
