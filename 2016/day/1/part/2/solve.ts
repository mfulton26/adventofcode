export default function solve(input: string) {
  let [x, y] = [0, 0];
  let [dx, dy] = [0, 1];
  const visitedIntersections = new Set([`${x},${y}`]);
  followInstructionsLoop:
  for (const instruction of input.split(", ")) {
    switch (instruction.charAt(0)) {
      case "R":
        [dx, dy] = [dy, -dx];
        break;
      case "L":
        [dx, dy] = [-dy, dx];
        break;
    }
    for (let blocks = Number(instruction.substring(1)); blocks; blocks--) {
      [x, y] = [x + dx, y + dy];
      const intersection = `${x},${y}`;
      if (visitedIntersections.has(intersection)) break followInstructionsLoop;
      visitedIntersections.add(intersection);
    }
  }
  return Math.abs(x) + Math.abs(y);
}
