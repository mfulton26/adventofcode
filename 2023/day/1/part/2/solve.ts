const digitWords = Object.freeze([
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
]);

function digitTextToNumber(text: string) {
  const index = digitWords.indexOf(text);
  if (index === -1) return Number(text);
  return index + 1;
}

const firstRegExp = new RegExp(`\\d|${digitWords.join("|")}`);
const lastRegExp = new RegExp(`.*(\\d|${digitWords.join("|")})`);

export default function solve(input: string) {
  return input.split("\n")
    .map((line) => {
      const [first] = line.match(firstRegExp)!;
      const [, last] = line.match(lastRegExp)!;
      return Number(`${digitTextToNumber(first)}${digitTextToNumber(last)}`);
    })
    .reduce((sum, value) => sum += value, 0);
}
