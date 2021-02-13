import md5 from "../../../crypto/md5.mjs";

export function solve(input, prefix = "00000") {
  for (let number = 1; ; number++) {
    const hash = md5(`${input}${number}`);
    if (hash.startsWith(prefix)) {
      return number;
    }
  }
}
