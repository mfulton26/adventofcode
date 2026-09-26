import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: '""', expected: 2 - 0 },
  { input: '"abc"', expected: 5 - 3 },
  { input: '"aaa\\"aaa"', expected: 10 - 7 },
  { input: '"\\x27"', expected: 6 - 1 },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input), expected);
});

Deno.test("example", () => {
  const input = `\
""
"abc"
"aaa\\"aaa"
"\\x27"`;

  assertEquals(solve(input), 12);
});
