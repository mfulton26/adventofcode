import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("D2FE28", expect(0b110));
Deno.test("38006F45291200", expect(0b001 + 0b110 + 0b010));
Deno.test("EE00D40C823060", expect(0b111 + 0b010 + 0b100 + 0b001));
Deno.test("8A004A801A8002F478", expect(16));
Deno.test("620080001611562C8802118E34", expect(12));
Deno.test("C0015000016115A2E0802F182340", expect(23));
Deno.test("A0016C880162017C3686B18A3D4780", expect(31));

function expect(expected: unknown) {
  return (t: Deno.TestContext) => {
    assertEquals(solve(t.name), expected);
  };
}
