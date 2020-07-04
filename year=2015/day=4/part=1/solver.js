import md5 from "../../../crypto/md5.js";

export function solve(/** @type {string} */ input) {
  for (let number = 1; ; number++) {
    const hash = md5(`${input}${number}`);
    if (hash.startsWith("00000")) {
      return number;
    }
  }
}
