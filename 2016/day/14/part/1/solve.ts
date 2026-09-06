import md5 from "@lib/md5.ts";

export default function solve(input: string) {
  let keyCount = 0;
  for (let index = 0;; index++) {
    const hash = md5(`${input}${index}`);
    const char = /(.)\1\1/.exec(hash)?.[1];
    if (!char) continue;
    const quintuplet = char.repeat(5);
    for (let offset = 1; offset <= 1_000; offset++) {
      const hash = md5(`${input}${index + offset}`);
      if (!hash.includes(quintuplet)) continue;
      keyCount++;
      if (keyCount === 64) return index;
    }
  }
}
