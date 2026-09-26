import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "D2FE28", expected: 0b110 },
  { input: "38006F45291200", expected: 0b001 + 0b110 + 0b010 },
  { input: "EE00D40C823060", expected: 0b111 + 0b010 + 0b100 + 0b001 },
  { input: "8A004A801A8002F478", expected: 16 },
  { input: "620080001611562C8802118E34", expected: 12 },
  { input: "C0015000016115A2E0802F182340", expected: 23 },
  { input: "A0016C880162017C3686B18A3D4780", expected: 31 },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input), expected);
});
