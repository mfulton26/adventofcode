const isNiceRegExp = /^(?=(?:.*[aeiou].*){3,})(?=.*(.)\1)(?!.*(?:ab|cd|pq|xy).*).*$/gm;

export function solve(input) {
  return count(input.matchAll(isNiceRegExp));
}

function count(iterable) {
  let count = 0;
  for (const _ of iterable) {
    count++;
  }
  return count;
}
