import { decryptName } from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("decryptName", async (t) => {
  await t.step("qzmt-zixmtkozy-ivhz", () => {
    assertEquals(
      decryptName({ encryptedName: "qzmt-zixmtkozy-ivhz", sectorId: 343 }),
      "very encrypted name",
    );
  });
});
