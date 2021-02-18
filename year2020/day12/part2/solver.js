export function solve(input) {
  const instructions = input
    .split("\n")
    .map((line) => [line[0], Number(line.substring(1))]);
  let [x, y, wx, wy] = [0, 0, 10, 1];
  for (const [action, value] of instructions) {
    switch (action) {
      case "N":
        [wx, wy] = [wx, wy + value];
        break;
      case "S":
        [wx, wy] = [wx, wy - value];
        break;
      case "E":
        [wx, wy] = [wx + value, wy];
        break;
      case "W":
        [wx, wy] = [wx - value, wy];
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
