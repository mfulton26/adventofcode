import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

// Deno.test("one_line_input_1", expect(undefined));
// Deno.test("one_line_input_N", expect(undefined));

// function expect(expected: unknown) {
//   return (t: Deno.TestContext) => {
//     assertEquals(solve(t.name), expected);
//   };
// }

Deno.test("example", () => {
  const input = `\
1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122`;

  assertEquals(solve(input), "2=-1=0");
});
