import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "Hit Points: 13", expected: 173 + 53 },
  { input: "Hit Points: 14", expected: 229 + 113 + 73 + 173 + 53 },
])("$input", ({ input, expected }) => {
  const player = { hitPoints: 10, manaPoints: 250 };
  assertEquals(solve(`${input}\nDamage: 8`, { player }), expected);
});
