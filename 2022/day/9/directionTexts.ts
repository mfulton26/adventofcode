export function directionTextToCoordinateVector(directionText: string) {
  switch (directionText) {
    case "U":
      return { x: 0, y: 1 };
    case "D":
      return { x: 0, y: -1 };
    case "L":
      return { x: -1, y: 0 };
    case "R":
      return { x: 1, y: 0 };
    default:
      throw new SyntaxError(`unexpected direction text: ${directionText}`);
  }
}
