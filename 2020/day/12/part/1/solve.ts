export default function solve(input: string) {
  const instructions = input
    .split("\n")
    .map((line) => [line[0], Number(line.substring(1))] as const);
  let [x, y, dx, dy] = [0, 0, 1, 0];
  for (const [action, value] of instructions) {
    switch (action) {
      case "N":
        y += value;
        break;
      case "S":
        y -= value;
        break;
      case "E":
        x += value;
        break;
      case "W":
        x -= value;
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
