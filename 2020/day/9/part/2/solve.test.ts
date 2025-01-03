import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;

  assertEquals(solve(input, { "preambleLength": 5 }), 62);
});
