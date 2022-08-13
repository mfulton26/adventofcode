import md5 from "helpers/md5.ts";

export default function solve(input: string, prefix = "0".repeat(6)) {
  for (let number = 1;; number++) {
    const hash = md5(`${input}${number}`);
    if (hash.startsWith(prefix)) return number;
  }
}
