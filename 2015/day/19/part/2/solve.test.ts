import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { molecule: "HOH", expected: 3 },
  { molecule: "HOHOHO", expected: 6 },
])("$molecule", ({ molecule, expected }) => {
  const input = `\
e => H
e => O
H => HO
H => OH
O => HH

${molecule}`;

  assertEquals(solve(input), expected);
});
