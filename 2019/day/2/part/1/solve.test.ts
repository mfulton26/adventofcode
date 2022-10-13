import solve, { runProgram } from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("1,9,10,3,2,3,11,0,99,30,40,50", expect(3500));
Deno.test("1,0,0,0,99", expect(2));
Deno.test("2,3,0,3,99", expect(2));
Deno.test("2,4,4,5,99,0", expect(2));
Deno.test("1,1,1,4,99,5,6,0,99", expect(30));

function expect(expected: unknown) {
  const options = { memoryReplacements: [] };
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name, options), expected);
  };
}

Deno.test("runProgram", async (t) => {
  await t.step(
    "1,9,10,3,2,3,11,0,99,30,40,50",
    expect([3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]),
  );
  await t.step("1,0,0,0,99", expect([2, 0, 0, 0, 99]));
  await t.step("2,3,0,3,99", expect([2, 3, 0, 6, 99]));
  await t.step("2,4,4,5,99,0", expect([2, 4, 4, 5, 99, 9801]));
  await t.step("1,1,1,4,99,5,6,0,99", expect([30, 1, 1, 4, 2, 5, 6, 0, 99]));

  function expect(expected: unknown) {
    return (t: Deno.TestContext) => {
      assertEquals(runProgram(t.name.split(",").map(Number)), expected);
    };
  }
});
