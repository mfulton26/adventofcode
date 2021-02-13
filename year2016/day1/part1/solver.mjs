export function solve(input) {
  let x = 0;
  let y = 0;
  let dx = 0;
  let dy = 1;
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
    x += dx * blocks;
    y += dy * blocks;
  }
  return Math.abs(x) + Math.abs(y);
}
