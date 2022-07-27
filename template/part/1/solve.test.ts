import solve from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

Deno.test("example", () => {
  const input = ``;

  assertEquals(solve(input), undefined);
});

Deno.test("one_line_input_1", expect(undefined));
Deno.test("one_line_input_2", expect(undefined));
Deno.test("one_line_input_3", expect(undefined));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}
