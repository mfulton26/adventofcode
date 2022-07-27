import { Md5 } from "std/hash/md5.ts";

export default function solve(input: string, prefix = "0".repeat(6)) {
  for (let number = 1;; number++) {
    const hash = new Md5().update(`${input}${number}`).toString();
    if (hash.startsWith(prefix)) return number;
  }
}
