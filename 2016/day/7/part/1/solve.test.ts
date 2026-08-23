import { supportsTls } from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { ip: "abba[mnop]qrst", expected: true },
  { ip: "abcd[bddb]xyyx", expected: false },
  { ip: "aaaa[qwer]tyui", expected: false },
  { ip: "ioxxoj[asdfgh]zxcvbn", expected: true },
])("supportsTls($ip)", ({ ip, expected }) => {
  assertEquals(supportsTls(ip), expected);
});
