export function solve(input) {
  let x = 0;
  let y = 0;
  let dx = 0;
  let dy = 1;
  const visitedIntersections = new Set([`${x},${y}`]);
  followInstructionsLoop: for (const instruction of input.split(", ")) {
    switch (instruction.charAt(0)) {
      case "R":
        [dx, dy] = [dy, -dx];
        break;
      case "L":
        [dx, dy] = [-dy, dx];
        break;
    }
    let blocks = Number(instruction.substring(1));
    for (; blocks; blocks--) {
      x += dx;
      y += dy;
      const intersection = `${x},${y}`;
      if (visitedIntersections.has(intersection)) {
        break followInstructionsLoop;
      }
      visitedIntersections.add(intersection);
    }
  }
  return Math.abs(x) + Math.abs(y);
}
