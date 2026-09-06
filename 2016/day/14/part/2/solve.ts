import md5 from "@lib/md5.ts";

function stretchedMd5(s: string, cache: Map<string, string>) {
  return cache.getOrInsertComputed(s, () => {
    let hash = md5(s);
    for (let n = 0; n < 2_016; n++) hash = md5(hash);
    return hash;
  });
}

export default function solve(input: string) {
  const cache = new Map<string, string>();
  let keyCount = 0;
  for (let index = 0;; index++) {
    const hash = stretchedMd5(`${input}${index}`, cache);
    const char = /(.)\1\1/.exec(hash)?.[1];
    if (!char) continue;
    const quintuplet = char.repeat(5);
    for (let offset = 1; offset <= 1_000; offset++) {
      const hash = stretchedMd5(`${input}${index + offset}`, cache);
      if (!hash.includes(quintuplet)) continue;
      keyCount++;
      if (keyCount === 64) return index;
    }
  }
}
