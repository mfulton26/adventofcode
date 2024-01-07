const firstRegExp = /\d/;
const lastRegExp = /.*(\d)/;

export default function solve(input: string) {
  return input.split("\n")
    .map((line) => {
      const [first] = line.match(firstRegExp)!;
      const [, last] = line.match(lastRegExp)!;
      return Number(`${first}${last}`);
    })
    .reduce((sum, value) => sum += value, 0);
}
