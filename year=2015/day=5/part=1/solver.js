const isNiceRegExp = /^(?=(?:.*[aeiou].*){3,})(?=.*(.)\1)(?!.*(?:ab|cd|pq|xy).*).*$/gm;

/**
 * @param {string} input
 * @returns {number}
 */
export function solve(input) {
  let count = 0;
  for (const _ of input.matchAll(isNiceRegExp)) {
    count++;
  }
  return count;
}
