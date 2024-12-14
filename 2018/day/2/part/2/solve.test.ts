import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
abcde
fghij
klmno
pqrst
fguij
axcye
wvxyz `;

  assertEquals(solve(input), "fgij");
});
