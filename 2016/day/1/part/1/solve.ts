export default function solve(input: string) {
  let [x, y] = [0, 0];
  let [dx, dy] = [0, 1];
  for (const instruction of input.split(", ")) {
    switch (instruction.charAt(0)) {
      case "R":
        [dx, dy] = [dy, -dx];
        break;
      case "L":
        [dx, dy] = [-dy, dx];
        break;
    }
    const blocks = Number(instruction.substring(1));
    [x, y] = [x + dx * blocks, y + dy * blocks];
  }
  return Math.abs(x) + Math.abs(y);
}
