import solve from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

Deno.test("HOH", expect(3));
Deno.test("HOHOHO", expect(6));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    const input = `\
e => H
e => O
H => HO
H => OH
O => HH

${t.name}`;

    assertEquals(solve(input), expected);
  };
}
