import md5 from "../../../crypto/md5.js";

/**
 * @param {string} input
 * @param {string} [prefix]
 * @returns {number}
 */
export function solve(input, prefix = "000000") {
  for (let number = 1; ; number++) {
    const hash = md5(`${input}${number}`);
    if (hash.startsWith(prefix)) {
      return number;
    }
  }
}
