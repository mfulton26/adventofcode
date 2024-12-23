import { assertEquals } from "@std/assert";
import { generateSecrets } from "./secrets.ts";

Deno.test("example", () => {
  assertEquals(generateSecrets(123, { limit: 10 }), [
    15887950,
    16495136,
    527345,
    704524,
    1553684,
    12683156,
    11100544,
    12249484,
    7753432,
    5908254,
  ]);
});
