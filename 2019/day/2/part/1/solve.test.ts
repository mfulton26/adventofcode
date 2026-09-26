import solve, { runProgram } from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "1,9,10,3,2,3,11,0,99,30,40,50", expected: 3500 },
  { input: "1,0,0,0,99", expected: 2 },
  { input: "2,3,0,3,99", expected: 2 },
  { input: "2,4,4,5,99,0", expected: 2 },
  { input: "1,1,1,4,99,5,6,0,99", expected: 30 },
])("$input", ({ input, expected }) => {
  const options = { memoryReplacements: [] };
  assertEquals(solve(input, options), expected);
});

const programCases: { input: string; expected: number[] }[] = [
  {
    input: "1,9,10,3,2,3,11,0,99,30,40,50",
    expected: [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50],
  },
  { input: "1,0,0,0,99", expected: [2, 0, 0, 0, 99] },
  { input: "2,3,0,3,99", expected: [2, 3, 0, 6, 99] },
  { input: "2,4,4,5,99,0", expected: [2, 4, 4, 5, 99, 9801] },
  { input: "1,1,1,4,99,5,6,0,99", expected: [30, 1, 1, 4, 2, 5, 6, 0, 99] },
];

Deno.test.each(programCases)("runProgram $input", ({ input, expected }) => {
  assertEquals(runProgram(input.split(",").map(Number)), expected);
});
