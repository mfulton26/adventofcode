export function solve(input) {
  const instructions = input
    .split("\n")
    .map((line) => [line[0], Number(line.substring(1))]);
  let [x, y, dx, dy] = [0, 0, 1, 0];
  for (const [action, value] of instructions) {
    switch (action) {
      case "N":
        [x, y] = [x, y + value];
        break;
      case "S":
        [x, y] = [x, y - value];
        break;
      case "E":
        [x, y] = [x + value, y];
        break;
      case "W":
        [x, y] = [x - value, y];
        break;
      case "L":
        for (let degrees = value; degrees > 0; degrees -= 90) {
          [dx, dy] = [-dy, dx];
        }
        break;
      case "R":
        for (let degrees = value; degrees > 0; degrees -= 90) {
          [dx, dy] = [dy, -dx];
        }
        break;
      case "F":
        [x, y] = [x + dx * value, y + dy * value];
        break;
    }
  }
  return Math.abs(x) + Math.abs(y);
}
