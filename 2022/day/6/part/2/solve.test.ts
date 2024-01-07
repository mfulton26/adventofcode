import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("mjqjpqmgbljsphdztnvjfqwrcgsmlb", expect(19));
Deno.test("bvwbjplbgvbhsrlpgdmjqwftvncz", expect(23));
Deno.test("nppdvjthqldpwncqszvftbrmjlhg", expect(23));
Deno.test("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", expect(29));
Deno.test("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", expect(26));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}
