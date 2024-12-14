import solve, { toSeatId } from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("toSeatId", async (t) => {
  await t.step("FBFBBFFRLR", expect(357));
  await t.step("BFFFBBFRRR", expect(567));
  await t.step("FFFBBBFRRR", expect(119));
  await t.step("BBFFBBFRLL", expect(820));

  function expect(expected: unknown) {
    return (t: Deno.TestContext) => {
      assertEquals(toSeatId(t.name), expected);
    };
  }
});

Deno.test("examples", () => {
  const input = `\
FBFBBFFRLR
BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL`;

  assertEquals(solve(input), 820);
});
