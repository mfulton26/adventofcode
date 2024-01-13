function digitize(text: string) {
  return digitize.map.get(text) ?? text;
}
digitize.map = new Map(
  ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
    .map((word, index) => [word, `${index + 1}`]),
);

const regExp = (() => {
  const groupPattern = `(\\d|${[...digitize.map.keys()].join("|")})`;
  return new RegExp(`.*?(?=${groupPattern})(?=.*${groupPattern})`);
})();

export default function solve(input: string) {
  return input.split("\n")
    .map((line) => line.match(regExp)!.slice(1).map(digitize).join(""))
    .reduce((sum, value) => sum += +value, 0);
}
