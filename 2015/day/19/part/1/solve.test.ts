import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { molecule: "HOH", expected: 4 },
  { molecule: "HOHOHO", expected: 7 },
  { molecule: "H2O", expected: 3 },
])("$molecule", ({ molecule, expected }) => {
  const input = `\
H => HO
H => OH
O => HH

${molecule}
`;

  assertEquals(solve(input), expected);
});
