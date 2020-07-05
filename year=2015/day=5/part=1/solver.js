const isNiceRegExp = /^(?=(?:.*[aeiou].*){3,})(?=.*(.)\1)(?!.*(?:ab|cd|pq|xy).*).*$/;

export function solve(/** @type {string} */ input) {
  let count = 0;
  for (const string of input.split("\n")) {
    if (isNiceRegExp.test(string)) {
      count++;
    }
  }
  return count;
}
