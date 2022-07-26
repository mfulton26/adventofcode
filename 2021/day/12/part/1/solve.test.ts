import solve from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

Deno.test("example 1", () => {
  const input = `\
start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

  assertEquals(solve(input), 10);
});

Deno.test("example 2", () => {
  const input = `\
dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`;

  assertEquals(solve(input), 19);
});

Deno.test("example 3", () => {
  const input = `\
fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`;

  assertEquals(solve(input), 226);
});
