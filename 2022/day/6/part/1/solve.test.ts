import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "mjqjpqmgbljsphdztnvjfqwrcgsmlb", expected: 7 },
  { input: "bvwbjplbgvbhsrlpgdmjqwftvncz", expected: 5 },
  { input: "nppdvjthqldpwncqszvftbrmjlhg", expected: 6 },
  { input: "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", expected: 10 },
  { input: "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", expected: 11 },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input), expected);
});
