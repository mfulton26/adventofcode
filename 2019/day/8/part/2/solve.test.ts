import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test(
  "0222112222120000",
  expect(`\
01
10`),
);

function expect(expected: unknown) {
  const options = { "size": { "width": 2, "height": 2 } };
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name, options), expected);
  };
}
