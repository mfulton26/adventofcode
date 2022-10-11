import solve from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

Deno.test(
  "109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99",
  expect("109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99"),
);
Deno.test("1102,34915192,34915192,7,4,7,99,0", expect("1219070632396864"));
Deno.test("104,1125899906842624,99", expect("1125899906842624"));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}
