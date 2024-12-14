import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("mjqjpqmgbljsphdztnvjfqwrcgsmlb", expect(7));
Deno.test("bvwbjplbgvbhsrlpgdmjqwftvncz", expect(5));
Deno.test("nppdvjthqldpwncqszvftbrmjlhg", expect(6));
Deno.test("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", expect(10));
Deno.test("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", expect(11));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}
