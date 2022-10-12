export default function solve(input: string) {
  const instructions = input
    .split("\n")
    .map((line) => [line[0], Number(line.substring(1))] as const);
  let [x, y, wx, wy] = [0, 0, 10, 1];
  for (const [action, value] of instructions) {
    switch (action) {
      case "N":
        wy += value;
        break;
      case "S":
        wy -= value;
        break;
      case "E":
        wx += value;
        break;
      case "W":
        wx -= value;
        break;
      case "L":
        for (let degrees = value; degrees > 0; degrees -= 90) {
          [wx, wy] = [-wy, wx];
        }
        break;
      case "R":
        for (let degrees = value; degrees > 0; degrees -= 90) {
          [wx, wy] = [wy, -wx];
        }
        break;
      case "F":
        [x, y] = [x + wx * value, y + wy * value];
        break;
    }
  }
  return Math.abs(x) + Math.abs(y);
}
