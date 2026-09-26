import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "mjqjpqmgbljsphdztnvjfqwrcgsmlb", expected: 19 },
  { input: "bvwbjplbgvbhsrlpgdmjqwftvncz", expected: 23 },
  { input: "nppdvjthqldpwncqszvftbrmjlhg", expected: 23 },
  { input: "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", expected: 29 },
  { input: "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", expected: 26 },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input), expected);
});
