import CoordinateVector from "./CoordinateVector.ts";

export function directionTextToCoordinateVector(directionText: string) {
  switch (directionText) {
    case "U":
      return CoordinateVector({ x: 0, y: 1 });
    case "D":
      return CoordinateVector({ x: 0, y: -1 });
    case "L":
      return CoordinateVector({ x: -1, y: 0 });
    case "R":
      return CoordinateVector({ x: 1, y: 0 });
    default:
      throw new SyntaxError(`unexpected direction text: ${directionText}`);
  }
}
