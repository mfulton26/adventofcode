import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "C200B40A82", expected: 3 },
  { input: "04005AC33890", expected: 54 },
  { input: "880086C3E88112", expected: 7 },
  { input: "CE00C43D881120", expected: 9 },
  { input: "D8005AC2A8F0", expected: 1 },
  { input: "F600BC2D8F", expected: 0 },
  { input: "9C005AC2F8F0", expected: 0 },
  { input: "9C0141080250320F1802104A08", expected: 1 },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input), expected);
});
