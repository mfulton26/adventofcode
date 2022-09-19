import { calculateHitsToWin } from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

Deno.test("calculateHitsToWin", () => {
  assertEquals(
    calculateHitsToWin(
      { "hitPoints": 8, "damage": 5, "armor": 5 },
      { "hitPoints": 12, "damage": 7, "armor": 2 },
    ),
    4,
  );
});
