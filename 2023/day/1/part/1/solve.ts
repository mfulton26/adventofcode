const regExp = /.*?(?=(\d))(?=.*(\d))/;

export default function solve(input: string) {
  return input.split("\n")
    .map((line) => line.match(regExp)!.slice(1).join(""))
    .reduce((sum, value) => sum += +value, 0);
}
