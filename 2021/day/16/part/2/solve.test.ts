import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("C200B40A82", expect(3));
Deno.test("04005AC33890", expect(54));
Deno.test("880086C3E88112", expect(7));
Deno.test("CE00C43D881120", expect(9));
Deno.test("D8005AC2A8F0", expect(1));
Deno.test("F600BC2D8F", expect(0));
Deno.test("9C005AC2F8F0", expect(0));
Deno.test("9C0141080250320F1802104A08", expect(1));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}
