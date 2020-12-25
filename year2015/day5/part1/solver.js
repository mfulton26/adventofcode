const isNiceRegExp = /^(?=(?:.*[aeiou].*){3,})(?=.*(.)\1)(?!.*(?:ab|cd|pq|xy).*).*$/gm;

export function solve(input) {
  return Array.from(input.matchAll(isNiceRegExp)).length;
}
