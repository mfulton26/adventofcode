import { supportsSsl } from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { ip: "aba[bab]xyz", expected: true },
  { ip: "xyx[xyx]xyx", expected: false },
  { ip: "aaa[kek]eke", expected: true },
  { ip: "zazbz[bzb]cdb", expected: true },
])("supportsSsl($ip)", ({ ip, expected }) => {
  assertEquals(supportsSsl(ip), expected);
});
