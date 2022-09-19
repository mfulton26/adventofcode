import solve from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

Deno.test("HOH", expect(4));
Deno.test("HOHOHO", expect(7));
Deno.test("H2O", expect(3));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    const input = `\
H => HO
H => OH
O => HH

${t.name}`;

    assertEquals(solve(input), expected);
  };
}
