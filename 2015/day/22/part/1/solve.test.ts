import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("Hit Points: 13", expect(173 + 53));
Deno.test("Hit Points: 14", expect(229 + 113 + 73 + 173 + 53));

function expect(expected: number) {
  const player = { hitPoints: 10, manaPoints: 250 };
  return (t: Deno.TestContext) => {
    assertEquals(solve(`${t.name}\nDamage: 8`, { player }), expected);
  };
}
