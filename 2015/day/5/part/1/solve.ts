const regexp =
  /^(?=(?:.*[aeiou].*){3,})(?=.*(.)\1)(?!.*(?:ab|cd|pq|xy).*).*$/gm;

export default function solve(input: string) {
  let count = 0;
  for (const _ of input.matchAll(regexp)) count++;
  return count;
}
