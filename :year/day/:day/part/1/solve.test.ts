import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("one_line_input_1", expect(undefined));
Deno.test("one_line_input_N", expect(undefined));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}

Deno.test("example", () => {
  const input = ``;

  assertEquals(solve(input), undefined);
});
