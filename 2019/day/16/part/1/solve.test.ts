import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "12345678", phases: 1, expected: "48226158" },
  { input: "12345678", phases: 2, expected: "34040438" },
  { input: "12345678", phases: 3, expected: "03415518" },
  { input: "12345678", phases: 4, expected: "01029498" },
])(
  "$input after $phases to match $expected",
  ({ input, phases, expected }) => {
    assertEquals(solve(input, { phases }), expected);
  },
);

Deno.test.each([
  { input: "80871224585914546619083218645595", expected: "24176176" },
  { input: "19617804207202209144916044189917", expected: "73745418" },
  { input: "69317163492948606335995924319873", expected: "52432133" },
])(
  "$input after 100 to starts with $expected",
  ({ input, expected }) => {
    assertEquals(solve(input), expected);
  },
);
